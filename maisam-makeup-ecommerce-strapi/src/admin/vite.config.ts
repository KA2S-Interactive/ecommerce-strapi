import { mergeConfig, type UserConfig } from 'vite';

export default (config: UserConfig) => {
  // Important: always return the modified config
  // Force port 5175 for zain project to avoid conflicts
  const vitePort = 5175;
  
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
