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

router.get("/users/list", async (context) => {
  const entries = kv.list({ prefix: ["todayVideo"] });
  const resultArray = [];
  for await (const entry of entries) {
    resultArray.push({ type: entry.key[1], data: entry.value });
  }
  console.log(resultArray);
  context.response.body = resultArray;
});

router.get("/users/type", async (context) => {
  const type = context.request.url.searchParams.get("type");
  if (type) {
    const data = await kv.get(["todayVideo", type]);
    console.log(data.value);
    context.response.body = {
      data: data.value,
    };
  } else {
    context.response.body = {
      msg: "type不存在",
    };
  }
});

export default router;
