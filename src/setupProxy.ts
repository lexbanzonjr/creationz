// src/setupProxy.ts
import { createProxyMiddleware, RequestHandler } from "http-proxy-middleware";
import { Application } from "express";

module.exports = function (app: Application) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://www.balldontlie.io",
      changeOrigin: true,
    }) as RequestHandler
  );
};
