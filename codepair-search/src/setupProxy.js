// src/setupProxy.js
const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/search',
    proxy({
      target: 'https://8702-103-226-169-56.ngrok-free.app',
      changeOrigin: true,
      pathRewrite: {
        '^/search': '/search', // Optionally rewrite the path
      },
    })
  );
};