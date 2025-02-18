import { Router, kv } from "../dep.ts";
import { ulid } from "jsr:@std/ulid";
import { userType } from "../types/userType.ts";

const router = new Router();

// 用户注册
router.post("/users/register", async (ctx) => {
  const obj = await ctx.request.body.json();

  // 检查用户是否已存在
  const user = await kv.get(["users", obj.username + ""]);
  if (user.value) {
    ctx.response.status = 400;
    ctx.response.body = { message: "User already exists" };
    return;
  }

  // 创建用户
  await kv.set(["users", obj.username + ""], {
    userId: ulid(),
    password: obj.password + "",
  });

  ctx.response.status = 201;
  ctx.response.body = { message: "User registered successfully" };
});

router.post("/users/login", async (ctx) => {
  const obj = await ctx.request.body.json();

  // 检查用户是否存在
  const user = await kv.get<userType>(["users", obj.username + ""]);
  if (!user.value || user.value.password !== obj.password + "") {
    ctx.response.status = 400;
    ctx.response.body = { message: "Invalid username or password" };
    return;
  }
  user.value.password = "******";
  await kv.set(["sessions", user.value.userId], user.value, {
    expireIn: 3600 * 1000,
  });
  ctx.response.status = 201;
  ctx.response.body = {
    data: user.value,
    message: "User registered successfully",
  };
});

export default router;
