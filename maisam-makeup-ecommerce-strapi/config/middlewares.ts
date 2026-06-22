export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      // Limits for the parsed body. Bump well above your largest image.
      formLimit: '50mb', // multipart form data
      jsonLimit: '50mb',
      textLimit: '50mb',
      formidable: {
        maxFileSize: 50 * 1024 * 1024, // 50 MB per uploaded file
      },
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
