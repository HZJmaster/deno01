import { Router, kv, ResponseHandler, generateToken } from "../dep.ts";
import { ulid } from "jsr:@std/ulid";
import { userType } from "../types/userType.ts";

const router = new Router();

// 用户注册
router.post("/users/register", async (ctx) => {
  const obj = await ctx.request.body.json();

  // 检查用户是否已存在
  const user = await kv.get(["users", obj.username + ""]);
  if (user.value) {
    ctx.response.body = ResponseHandler.failRes("用户已存在");
    return;
  }

  // 创建用户
  await kv.set(["users", obj.username + ""], {
    userId: ulid(),
    userName: obj.username + "",
    password: obj.password + "",
    deviceId: obj.deviceId + "",
  });

  ctx.response.status = 201;
  ctx.response.body = ResponseHandler.successRes(null, "注册成功");
});

router.post("/users/login", async (ctx) => {
  const obj = await ctx.request.body.json();

  const user = await kv.get<userType>(["users", obj.username + ""]);
  if (!user.value || user.value.password !== obj.password + "") {
    ctx.response.body = ResponseHandler.failRes("无效的用户名和密码");
    return;
  }
  if (user.value.deviceId !== obj.deviceId + "") {
    ctx.response.body = ResponseHandler.failRes("账户与绑定设备不同");
    return;
  }

  user.value.password = "******";
  const token = await generateToken(obj.username + "");
  user.value.token = token;
  ctx.response.status = 201;
  ctx.response.body = ResponseHandler.successRes(user.value, "登录成功");
});

router.post("/users/resetps", async (ctx) => {
  const obj = await ctx.request.body.json();

  const user = await kv.get<userType>(["users", obj.username + ""]);
  if (!user.value || user.value.password !== obj.password + "") {
    ctx.response.body = ResponseHandler.failRes("无效的用户名和密码");
    return;
  }
  if (user.value.password !== obj.password) {
    ctx.response.body = ResponseHandler.failRes("无效的旧密码");
    return;
  }
  if (user.value.deviceId !== obj.deviceId + "") {
    ctx.response.body = ResponseHandler.failRes("账户与绑定设备不同");
    return;
  }
  await kv.set(["users", obj.username + ""], {
    ...user.value,
    password: obj.newPassword,
  });
  ctx.response.status = 201;
  ctx.response.body = ResponseHandler.successRes(null, "更新成功");
});

export default router;
