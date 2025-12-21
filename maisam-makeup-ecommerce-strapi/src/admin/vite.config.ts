import { mergeConfig, type UserConfig } from 'vite';

export default (config: UserConfig) => {
  // Important: always return the modified config
  const vitePort = parseInt(process.env.VITE_PORT || '5174', 10);
  
  return mergeConfig(config, {
    server: {
      port: vitePort,
      strictPort: false, // Allow fallback to next available port if configured port is taken
      host: '0.0.0.0',
      hmr: {
        port: vitePort,
      },
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  });
};
