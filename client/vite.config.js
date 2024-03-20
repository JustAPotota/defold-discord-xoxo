// vite.config.js
export default {
  // config options
  root: "build/js-web/XOXO/",
  assetsInclude: "**/*.wasm",
  build: {
    outDir: "../../dist"
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
    hmr: {
      clientPort: 443,
    },
  },
}
