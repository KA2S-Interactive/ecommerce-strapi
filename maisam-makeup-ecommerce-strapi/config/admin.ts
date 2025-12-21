export default ({ env }) => ({
vite: {
    server: {
      port: env.int('STRAPI_ADMIN_DEV_PORT', 5175),
    },
  },
      	auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
  watchIgnoreFiles: [
    '**/config/sync-data-structure.json',
    '**/config/schema.json',
    '**/config/strapi-server.json',
  ],
});
