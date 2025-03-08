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

router.get("/test", async (ctx) => {
  await kv.delete(["todayVideo", "动漫"]);
  await kv.delete(["todayVideo", "电影"]);
  await kv.delete(["todayVideo", "电视剧"]);
  await kv.delete(["todayVideo", "综艺"]);
  await kv.delete(["sessions", "01JNRK2MFZ89AH0WV9P2H1B6RQ"]);
  await kv.delete(["sessions", "01JNRK73C2VDGAD7W4KSZM9TJP"]);
  await kv.delete(["users", "gg"]);
  await kv.delete(["users", "gga"]);
  await kv.delete(["users", "gga1"]);
  await kv.delete(["users", "ggt"]);
  await kv.delete(["users", "nhao"]);
  await kv.delete(["users", "nhao1"]);
  await kv.delete(["users", "tfd"]);
  await kv.delete(["users", "yhf"]);
  await kv.delete(["users", "yug"]);
  await kv.delete(["users", "人工费"]);
  ctx.response.body = ResponseHandler.successRes(null, "删除成功");
});

export default router;
