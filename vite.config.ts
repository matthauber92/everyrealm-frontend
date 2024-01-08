import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    target: "esnext"
  },
  resolve: {
    alias: {
      "~": path.resolve("./src")
    }
  },
  server: {
    open: true,
    port: 3000
  }
})
