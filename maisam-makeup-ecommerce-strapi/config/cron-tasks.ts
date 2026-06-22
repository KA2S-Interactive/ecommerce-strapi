/**
 * config/cron-tasks.ts
 *
 * Refreshes Facebook + Instagram-Login tokens before they expire so the app keeps
 * posting without reconnecting (~60-day tokens).
 *
 * IMPORTANT: Strapi compiles `config/` and `src/` to `dist/` separately, so a
 * config file must NOT import from `../src/...` (it won't resolve at runtime).
 * The crypto helper is therefore inlined here. If you also have
 * `src/utils/token-crypto.ts` for use inside `src/`, that's fine — just keep this
 * file self-contained.
 *
 * Enable in config/server.ts:
 *   import cronTasks from './cron-tasks';
 *   cron: { enabled: true, tasks: cronTasks }
 *
 * Env: TOKEN_ENC_KEY, FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, GRAPH_VERSION (optional)
 */
import crypto from 'crypto';

const GRAPH_VERSION = process.env.GRAPH_VERSION || 'v21.0';
const FB_GRAPH = `https://graph.facebook.com/${GRAPH_VERSION}`;
const IG_GRAPH = 'https://graph.instagram.com';
const UID = 'api::social-connection.social-connection';

// ---- inlined AES-256-GCM crypto (no cross-dir import) ----
function getKey(): Buffer {
  const b64 = process.env.TOKEN_ENC_KEY;
  if (!b64) throw new Error('TOKEN_ENC_KEY is not set');
  const key = Buffer.from(b64, 'base64');
  if (key.length !== 32) throw new Error('TOKEN_ENC_KEY must decode to 32 bytes');
  return key;
}
function isEncrypted(v: unknown): boolean {
  return typeof v === 'string' && v.split('.').length === 3;
}
function enc(plain: string | null | undefined): string | null | undefined {
  if (plain == null || plain === '') return plain;
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', getKey(), iv);
  const out = Buffer.concat([cipher.update(String(plain), 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString('base64')}.${tag.toString('base64')}.${out.toString('base64')}`;
}
function dec(blob: string | null | undefined): string | null | undefined {
  if (!isEncrypted(blob)) return blob;
  const [iv, tag, data] = (blob as string).split('.').map((s) => Buffer.from(s, 'base64'));
  const decipher = crypto.createDecipheriv('aes-256-gcm', getKey(), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(data), decipher.final()]).toString('utf8');
}
// ----------------------------------------------------------

async function getJson(url: string): Promise<any> {
  const res = await fetch(url);
  const data: any = await res.json();
  if (!res.ok) throw new Error(data?.error?.message || `HTTP ${res.status}`);
  return data;
}

async function refreshFacebook(strapi: any, row: any): Promise<void> {
  const currentUserToken = dec(row.userToken);
  if (!currentUserToken) throw new Error('no userToken to refresh');

  const params = new URLSearchParams({
    grant_type: 'fb_exchange_token',
    client_id: process.env.FACEBOOK_APP_ID || '',
    client_secret: process.env.FACEBOOK_APP_SECRET || '',
    fb_exchange_token: currentUserToken,
  });
  const tokenRes = await getJson(`${FB_GRAPH}/oauth/access_token?${params}`);
  const newUserToken = tokenRes.access_token;
  const expiresIn = Number(tokenRes.expires_in) || 60 * 24 * 60 * 60;

  const pagesRes = await getJson(
    `${FB_GRAPH}/me/accounts?fields=id,name,access_token,instagram_business_account&access_token=${encodeURIComponent(
      newUserToken,
    )}`,
  );
  const pages = (pagesRes.data || []).map((p: any) => ({
    id: p.id,
    name: p.name,
    access_token: enc(p.access_token),
    instagramId: p.instagram_business_account?.id || null,
  }));

  await strapi.entityService.update(UID, row.id, {
    data: {
      userToken: enc(newUserToken),
      pages,
      tokenExpiresAt: new Date(Date.now() + expiresIn * 1000),
      needsReconnect: false,
    },
  });
}

async function refreshInstagram(strapi: any, row: any): Promise<void> {
  const current = dec(row.igUserToken);
  if (!current) throw new Error('no igUserToken to refresh');

  const data = await getJson(
    `${IG_GRAPH}/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(
      current,
    )}`,
  );
  const expiresIn = Number(data.expires_in) || 60 * 24 * 60 * 60;

  await strapi.entityService.update(UID, row.id, {
    data: {
      igUserToken: enc(data.access_token),
      tokenExpiresAt: new Date(Date.now() + expiresIn * 1000),
      needsReconnect: false,
    },
  });
}

async function refreshDueTokens(strapi: any): Promise<void> {
  const soon = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const rows = await strapi.entityService.findMany(UID, {
    filters: { tokenExpiresAt: { $lt: soon } },
    fields: ['id', 'provider', 'userToken', 'igUserToken', 'tokenExpiresAt'],
    limit: 200,
  });

  strapi.log.info(`[token-refresh] ${rows.length} connection(s) due`);

  for (const row of rows) {
    try {
      if (row.provider === 'instagram') {
        await refreshInstagram(strapi, row);
      } else {
        await refreshFacebook(strapi, row);
      }
      strapi.log.info(`[token-refresh] refreshed connection ${row.id}`);
    } catch (e: any) {
      strapi.log.warn(`[token-refresh] failed for ${row.id}: ${e.message}`);
      try {
        await strapi.entityService.update(UID, row.id, { data: { needsReconnect: true } });
      } catch {
        /* ignore */
      }
    }
  }
}

export default {
  /** Daily at 03:00 server time. */
  refreshMetaTokens: {
    task: async ({ strapi }: { strapi: any }) => {
      await refreshDueTokens(strapi);
    },
    options: { rule: '0 3 * * *' },
  },
};

