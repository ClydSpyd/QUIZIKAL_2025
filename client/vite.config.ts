// vite.config.ts
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig(({ mode }) => {
  // This will load .env, .env.local, .env.[mode], and .env.[mode].local
  // For a plain .env file (without a mode suffix), it will still load .env and .env.local.
  const env = loadEnv(mode, process.cwd(), '');

  if (!env.VITE_SERVER_URL) {
    throw new Error('VITE_SERVER_URL is not defined in your .env file');
  }

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: `${env.VITE_SERVER_URL}/api`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/'),
        assets: path.resolve(__dirname, './src/assets/'),
        styles: path.resolve(__dirname, './src/styles/'),
        components: path.resolve(__dirname, './src/components/'),
      },
    },
  };
});
