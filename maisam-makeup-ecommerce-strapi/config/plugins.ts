/**
 * config/plugins.ts
 *
 * Sets the Upload plugin's file size limit. Merge with any existing plugin config.
 */
export default ({ env }) => ({
  upload: {
    config: {
      sizeLimit: 50 * 1024 * 1024, // 50 MB
    },
  },
});

