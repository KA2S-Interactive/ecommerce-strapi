import type { Core } from '@strapi/strapi';
import {
  decryptToken,
  encryptToken,
  maybeDecryptToken,
  maybeEncryptToken,
} from '../utils/token-crypto';

type SocialConnectionRow = {
  documentId: string;
  provider?: 'facebook' | 'instagram';
  userToken?: string | null;
  igUserToken?: string | null;
  pages?: Array<{
    id?: string;
    name?: string;
    access_token?: string;
    instagramId?: string | null;
  }> | null;
};

type MetaTokenResponse = {
  access_token?: string;
  expires_in?: number;
  error?: { message?: string };
};

type FacebookPage = {
  id: string;
  name: string;
  access_token: string;
  instagram_business_account?: { id: string };
};

const GRAPH_VERSION = 'v21.0';
const MS_PER_DAY = 86_400_000;

const fetchJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  const body = (await response.json()) as T;

  if (!response.ok) {
    const message =
      (body as MetaTokenResponse).error?.message ??
      `Meta API request failed (${response.status})`;
    throw new Error(message);
  }

  return body;
};

const expiresAtFromSeconds = (expiresIn?: number) => {
  const seconds = expiresIn && expiresIn > 0 ? expiresIn : 60 * 24 * 60 * 60;
  return new Date(Date.now() + seconds * 1000).toISOString();
};

const refreshFacebookConnection = async (row: SocialConnectionRow) => {
  const appId =
    process.env.FACEBOOK_APP_ID ?? process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
  const appSecret = process.env.FACEBOOK_APP_SECRET;

  if (!appId || !appSecret) {
    throw new Error('FACEBOOK_APP_ID and FACEBOOK_APP_SECRET are required');
  }

  const currentToken = maybeDecryptToken(row.userToken);
  if (!currentToken) {
    throw new Error('Missing Facebook user token');
  }

  const exchanged = await fetchJson<MetaTokenResponse>(
    `https://graph.facebook.com/${GRAPH_VERSION}/oauth/access_token?` +
      new URLSearchParams({
        grant_type: 'fb_exchange_token',
        client_id: appId,
        client_secret: appSecret,
        fb_exchange_token: currentToken,
      })
  );

  const newUserToken = exchanged.access_token;
  if (!newUserToken) {
    throw new Error('Facebook token exchange returned no access_token');
  }

  const accounts = await fetchJson<{ data?: FacebookPage[] }>(
    `https://graph.facebook.com/${GRAPH_VERSION}/me/accounts?` +
      new URLSearchParams({
        access_token: newUserToken,
        fields: 'id,name,access_token,instagram_business_account',
      })
  );

  const pages = (accounts.data ?? []).map((page) => ({
    id: page.id,
    name: page.name,
    access_token: encryptToken(page.access_token),
    instagramId: page.instagram_business_account?.id ?? null,
  }));

  return {
    userToken: encryptToken(newUserToken),
    pages,
    tokenExpiresAt: expiresAtFromSeconds(exchanged.expires_in),
  };
};

const refreshInstagramConnection = async (row: SocialConnectionRow) => {
  const currentToken = maybeDecryptToken(row.igUserToken);
  if (!currentToken) {
    throw new Error('Missing Instagram user token');
  }

  const refreshed = await fetchJson<MetaTokenResponse>(
    'https://graph.instagram.com/refresh_access_token?' +
      new URLSearchParams({
        grant_type: 'ig_refresh_token',
        access_token: currentToken,
      })
  );

  const newToken = refreshed.access_token;
  if (!newToken) {
    throw new Error('Instagram token refresh returned no access_token');
  }

  return {
    igUserToken: encryptToken(newToken),
    tokenExpiresAt: expiresAtFromSeconds(refreshed.expires_in),
  };
};

export const refreshExpiringMetaTokens = async (strapi: Core.Strapi) => {
  if (!process.env.TOKEN_ENC_KEY) {
    strapi.log.warn(
      '[meta-token-refresh] TOKEN_ENC_KEY not set — skipping refresh'
    );
    return;
  }

  const soon = new Date(Date.now() + 7 * MS_PER_DAY).toISOString();
  const rows = (await strapi
    .documents('api::social-connection.social-connection')
    .findMany({
      filters: {
        tokenExpiresAt: { $lt: soon },
      },
      limit: 100,
    })) as SocialConnectionRow[];

  for (const row of rows) {
    try {
      const updateData =
        row.provider === 'instagram'
          ? await refreshInstagramConnection(row)
          : await refreshFacebookConnection(row);

      await strapi
        .documents('api::social-connection.social-connection')
        .update({
          documentId: row.documentId,
          data: updateData,
        });

      strapi.log.info(
        `[meta-token-refresh] Refreshed ${row.provider ?? 'facebook'} connection ${row.documentId}`
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      strapi.log.warn(
        `[meta-token-refresh] Refresh failed for ${row.documentId}: ${message}`
      );
    }
  }
};

export const encryptSocialConnectionPayload = (data: {
  userToken?: string | null;
  igUserToken?: string | null;
  pages?: SocialConnectionRow['pages'];
}) => {
  const next = { ...data };

  if (next.userToken) {
    next.userToken = maybeEncryptToken(next.userToken);
  }

  if (next.igUserToken) {
    next.igUserToken = maybeEncryptToken(next.igUserToken);
  }

  if (Array.isArray(next.pages)) {
    next.pages = next.pages.map((page) => ({
      ...page,
      access_token: page.access_token
        ? maybeEncryptToken(page.access_token)
        : page.access_token,
    }));
  }

  return next;
};

export const decryptSocialConnectionRow = (row: SocialConnectionRow) => ({
  ...row,
  userToken: row.userToken ? maybeDecryptToken(row.userToken) : row.userToken,
  igUserToken: row.igUserToken
    ? maybeDecryptToken(row.igUserToken)
    : row.igUserToken,
  pages: Array.isArray(row.pages)
    ? row.pages.map((page) => ({
        ...page,
        access_token: page.access_token
          ? maybeDecryptToken(page.access_token)
          : page.access_token,
      }))
    : row.pages,
});

// Re-export for callers that need explicit round-trip helpers.
export { decryptToken, encryptToken };
