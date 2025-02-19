import {
  create,
  verify,
  Header,
  Payload,
} from "https://deno.land/x/djwt@v2.4/mod.ts";
import { Context, ResponseHandler } from "../dep.ts";

const key = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-256" },
  true,
  ["sign", "verify"]
);

export async function generateToken(userName: string) {
  // 假设验证成功
  const payload: Payload = {
    iss: "your-issuer",
    exp: Date.now() + 60 * 60 * 1000, // 1 hour expiration
    userName,
  };

  const header: Header = {
    alg: "HS256",
    typ: "JWT",
  };

  return await create(header, payload, key);
}

export async function verifyToken(ctx: Context) {
  const token = ctx.request.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    ctx.response.status = 401;
    ctx.response.body = ResponseHandler.failRes("token缺失");
    return;
  }

  try {
    const payload = await verify(token, key);
    return payload;
  } catch {
    ctx.response.status = 401;
    ctx.response.body = ResponseHandler.failRes("token无效");
  }
}
