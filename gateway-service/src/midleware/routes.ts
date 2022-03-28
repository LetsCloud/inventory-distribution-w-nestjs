export const ROUTES = [
  {
    url: '/api/reservation',
    auth: true,
    creditCheck: true,
    proxy: {
      target: 'http://reservation:3091',
      xfwd: true,
      changeOrigin: true,
      pathRewrite: {
        [`^/api`]: '',
      },
    },
  },
];
