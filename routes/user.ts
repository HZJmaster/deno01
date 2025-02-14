import { Router, kv } from "../dep.ts";

const router = new Router();

router.get("/users", async (context) => {
  const result = await kv.get(["user", "alice"]);
  context.response.body = result;
});

router.post("/users", async (context) => {
  const result = await kv.set(["user", "alice"], { name: "Alice", age: 25 });
  context.response.body = result;
});

export default router;
