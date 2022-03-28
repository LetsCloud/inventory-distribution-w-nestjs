import { createProxyMiddleware } from 'http-proxy-middleware';

export const setupProxies = (app, routes) => {
  routes.forEach((r) => {
    console.log('setupProxies->target=', r.proxy.target);
    app.use(r.url, createProxyMiddleware(r.proxy));
  });
};
