import { ResponseHandler, Router, kv } from "../dep.ts";

const router = new Router();

router.delete("/admin/del", async (ctx) => {
  const obj = await ctx.request.body.json();
  await kv.delete([obj.table, obj.index]);
  ctx.response.body = ResponseHandler.successRes(
    [obj.table, obj.index],
    "删除成功"
  );
});

export default router;
