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
          requiredVersion: '18.3.1',
          singleton: true,
        },
        'react-dom': {
          requiredVersion: '18.3.1',
          singleton: true,
        },
        antd: {
          requiredVersion: '5.21.6',
          singleton: true,
        },
      },
    }),
    react(),
  ],
  build: {
    target: 'esnext'
  }
})
