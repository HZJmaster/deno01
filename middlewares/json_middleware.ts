import { Context, type Middleware } from "../dep.ts";

export const jsonMiddleware: Middleware = async (
  ctx: Context,
  next: () => Promise<unknown>
) => {
  await next(); // 先执行后续的中间件或路由处理器

  // 如果响应体是对象或数组，则将其序列化为 JSON
  if (typeof ctx.response.body === "object") {
    ctx.response.headers.set("Content-Type", "application/json");
    ctx.response.body = JSON.stringify(ctx.response.body);
  }
};
