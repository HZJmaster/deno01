import { ResponseHandler, Router, kv } from "../dep.ts";
import { expireType } from "../types/expireType.ts";
import { userType } from "../types/userType.ts";

const router = new Router();

router.post("/expire/name", async (ctx) => {
  const obj = await ctx.request.body.json();
  const user = await kv.get<userType>(["users", obj.username + ""]);
  if (!user.value) {
    ctx.response.body = ResponseHandler.successRes(obj.username, "用户不存在");
    return;
  }
  const exist = await kv.get<expireType>(["sessions", user.value.userId]);
  if (exist.value) {
    await kv.set(["sessions", user.value.userId], {
      ...obj,
      expireTime: exist.value.expireTime + obj.expire,
    });
  } else {
    await kv.set(["sessions", user.value.userId], {
      ...obj,
      expireTime: Date.now() + obj.expire,
    });
  }
  ctx.response.status = 201;
  ctx.response.body = ResponseHandler.successRes(null, "更新成功");
});

router.get("/expire/id", async (ctx) => {
  const queryParams = ctx.request.url.searchParams;
  const id = queryParams.get("id");
  const data = await kv.get<expireType>(["sessions", id + ""]);
  if (data.value?.expireTime && Date.now() < data.value.expireTime) {
    ctx.response.status = 201;
    ctx.response.body = ResponseHandler.successRes(data.value, "查询成功");
    return;
  }
  await kv.delete(["sessions", id + ""]);
  ctx.response.body = ResponseHandler.successRes(null, "查询失败");
});

export default router;
