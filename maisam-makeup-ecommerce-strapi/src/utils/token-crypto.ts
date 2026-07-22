/**
 * src/utils/token-crypto.ts
 *
 * AES-256-GCM helpers for encrypting Meta (Facebook/Instagram) tokens at rest.
 * The wire format matches config/cron-tasks.ts exactly — `iv.tag.data`, each
 * part base64 — so tokens written by either side round-trip cleanly.
 *
 * Env: TOKEN_ENC_KEY must be a base64 string that decodes to 32 bytes.
 */
import crypto from 'crypto';

function getKey(): Buffer {
  const b64 = process.env.TOKEN_ENC_KEY;
  if (!b64) throw new Error('TOKEN_ENC_KEY is not set');
  const key = Buffer.from(b64, 'base64');
  if (key.length !== 32) throw new Error('TOKEN_ENC_KEY must decode to 32 bytes');
  return key;
}

/** True when `v` looks like our `iv.tag.data` ciphertext envelope. */
export function isEncrypted(v: unknown): boolean {
  return typeof v === 'string' && v.split('.').length === 3;
}

/** Encrypt a plaintext token. Throws if TOKEN_ENC_KEY is missing/invalid. */
export function encryptToken(plain: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', getKey(), iv);
  const out = Buffer.concat([cipher.update(String(plain), 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString('base64')}.${tag.toString('base64')}.${out.toString('base64')}`;
}

/** Decrypt a ciphertext produced by encryptToken. */
export function decryptToken(blob: string): string {
  const [iv, tag, data] = blob.split('.').map((s) => Buffer.from(s, 'base64'));
  const decipher = crypto.createDecipheriv('aes-256-gcm', getKey(), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(data), decipher.final()]).toString('utf8');
}

/** Encrypt only if the value isn't already an envelope; pass null/empty through. */
export function maybeEncryptToken(
  value: string | null | undefined,
): string | null | undefined {
  if (value == null || value === '' || isEncrypted(value)) return value;
  return encryptToken(value);
}

/** Decrypt only if the value is an envelope; otherwise return it unchanged. */
export function maybeDecryptToken(
  value: string | null | undefined,
): string | null | undefined {
  if (!isEncrypted(value)) return value;
  return decryptToken(value as string);
}

/** Short aliases used by config/cron-tasks.ts style call sites. */
export const enc = maybeEncryptToken;
export const dec = maybeDecryptToken;
