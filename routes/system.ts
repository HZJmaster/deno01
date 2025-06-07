import { ResponseHandler, Router, kv } from "../dep.ts";

const router = new Router();

router.post("/system/status", async (ctx) => {
  const obj = await ctx.request.body.json();

  await kv.set(["system", "status"], {
    status: obj.status,
  });

  ctx.response.status = 201;
  ctx.response.body = ResponseHandler.successRes(null, "更新成功");
});

router.post("/system/sourceApi", async (ctx) => {
  const obj = await ctx.request.body.json();

  await kv.set(["system", "sourceApi"], {
    status: obj.sourceApi,
  });

  ctx.response.status = 201;
  ctx.response.body = ResponseHandler.successRes(null, "资源地址更新成功");
});

router.post("/system/searchApi", async (ctx) => {
  const obj = await ctx.request.body.json();

  await kv.set(["system", "searchApi"], {
    status: obj.searchApi,
  });

  ctx.response.status = 201;
  ctx.response.body = ResponseHandler.successRes(null, "搜索地址更新成功");
});

router.get("/system/status", async (ctx) => {
  const data = await kv.get(["system", "status"]);
  ctx.response.status = 201;
  ctx.response.body = ResponseHandler.successRes(data.value, "查询成功");
});

export default router;
