// pm2 ecosystem for the Strapi backend (admin.kd-technology.com).
// Runs the built app in production `start` mode (NOT `develop`) to keep memory
// low on the shared 1.9GB droplet. Rebuild with `npm run build` before (re)start
// whenever src/ or config/ change.
module.exports = {
  apps: [{
    name: 'strapi-app',
    // Use the project's local Strapi CLI so the version matches node_modules.
    script: 'node_modules/@strapi/strapi/bin/strapi.js',
    args: 'start',
    interpreter: '/root/.nvm/versions/node/v20.5.0/bin/node',
    cwd: '/root/ecommerce-strapi/maisam-makeup-ecommerce-strapi',
    exec_mode: 'fork',
    instances: 1,
    autorestart: true,
    watch: false,
    // Cap V8 heap below available RAM so Strapi GCs instead of OOM-killing,
    // and leaves room for n8n + Postgres on the same box.
    max_memory_restart: '700M',
    env: {
      NODE_ENV: 'production',
      NODE_OPTIONS: '--max-old-space-size=640',
    },
    error_file: '/root/.pm2/logs/strapi-app-error.log',
    out_file: '/root/.pm2/logs/strapi-app-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    merge_logs: true,
    min_uptime: '30s',
    restart_delay: 3000,
    max_restarts: 10,
  }],
};
