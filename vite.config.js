import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    federation({
      name: "d42RemoteApp",
      manifest: true,
      filename: "remoteEntry.js",
      exposes: {
        "./d42RemoteApp": "./src/remote-entry.js",
      },
      shared: {
        react: {
          requiredVersion: '16.14.0',
          singleton: true,
        },
        'react-dom': {
          requiredVersion: '16.14.0',
          singleton: true,
        },
        antd: {
          requiredVersion: '5.22.4',
          singleton: true,
        },
      },
    }),
    react(),
  ],
  build: {
    target: 'esnext'
  },
  base: "https://react-remote-app.pages.dev",
  server: {
    port: 5173,
    cors: true,
    strictPort: true,
    host: 'localhost.freshservice-dev.com'
  },
})
