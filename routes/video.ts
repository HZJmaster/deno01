import { apiKey } from "../config/key.ts";
import { Router, sendRequest, kv } from "../dep.ts";

const router = new Router();

router.get("/video", async (ctx) => {
  try {
    const response = await sendRequest<string>(
      "https://m1-a1.cloud.nnpp.vip:2223/api/v/"
    );
    ctx.response.body = JSON.parse(response);
  } catch {
    ctx.response.status = 500;
    ctx.response.body = { message: "Failed to get data" };
  }
});

router.get("/video/search_prompt", async (ctx) => {
  const queryParams = ctx.request.url.searchParams;
  const key = queryParams.get("k");
  if (key) {
    try {
      const response = await sendRequest<string>(
        "https://m1-a1.cloud.nnpp.vip:2223/api/search_prompt?k=" + key
      );
      ctx.response.body = JSON.parse(response);
    } catch {
      ctx.response.status = 500;
      ctx.response.body = { message: "Failed to get data" };
    }
  } else {
    ctx.response.body = { message: "No key parameter provided" };
  }
});

router.get("/video/list", async (ctx) => {
  const entries = kv.list({ prefix: ["todayVideo"] });
  const resultArray = [];
  for await (const entry of entries) {
    resultArray.push({ type: entry.key[1], data: entry.value });
  }
  ctx.response.body = resultArray;
});

router.get("/video/type", async (ctx) => {
  const type = ctx.request.url.searchParams.get("type");
  if (type) {
    const data = await kv.get(["todayVideo", type]);
    ctx.response.body = {
      data: data.value,
    };
  } else {
    ctx.response.body = {
      msg: "type不存在",
    };
  }
});

router.post("/video/search", async (ctx) => {
  try {
    const body = ctx.request.body;
    const formData = await body.formData();
    try {
      const response = await sendRequest<string>(
        `https://m1-a1.cloud.nnpp.vip:2223/api/v?z=${apiKey}&jx=` +
          formData.get("key") +
          `&s1ig=11403&g=`
      );
      ctx.response.body = JSON.parse(response);
    } catch {
      ctx.response.status = 500;
      ctx.response.body = { message: "Failed to get data" };
    }
  } catch (error) {
    console.error("Error while reading request body:", error);
    ctx.response.status = 400;
    ctx.response.body = { message: "Failed to read request body" };
  }
});

export default router;
