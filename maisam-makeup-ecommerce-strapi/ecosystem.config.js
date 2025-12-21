module.exports = {
  apps: [
    {
      name: 'strapi-app-zain',
      cwd: '/root/ecommerce-strapi-zain/maisam-makeup-ecommerce-strapi',
      script: 'npm',
      args: ['run', 'develop'],
      env: {
        VITE_PORT: '5175',
        NODE_ENV: 'development',
      },
    },
    {
      name: 'strapi-app',
      cwd: '/root/ecommerce-strapi/maisam-makeup-ecommerce-strapi',
      script: 'npm',
      args: ['run', 'develop'],
      env: {
        VITE_PORT: '5174',
        NODE_ENV: 'development',
      },
    },
  ],
};
