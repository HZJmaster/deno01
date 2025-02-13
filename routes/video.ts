import { apiKey } from "../config/key.ts";
import { Router, sendRequest, kv } from "../dep.ts";

const router = new Router();

router.get("/video", async (context) => {
  try {
    const response = await sendRequest<string>(
      "https://m1-a1.cloud.nnpp.vip:2223/api/v/"
    );
    context.response.body = JSON.parse(response);
  } catch {
    context.response.status = 500;
    context.response.body = { message: "Failed to get data" };
  }
});

router.get("/video/search_prompt", async (context) => {
  const queryParams = context.request.url.searchParams;
  const key = queryParams.get("k");
  if (key) {
    try {
      const response = await sendRequest<string>(
        "https://m1-a1.cloud.nnpp.vip:2223/api/search_prompt?k=" + key
      );
      context.response.body = JSON.parse(response);
    } catch {
      context.response.status = 500;
      context.response.body = { message: "Failed to get data" };
    }
  } else {
    context.response.body = { message: "No key parameter provided" };
  }
});

router.get("/video/list", async (context) => {
  const entries = kv.list({ prefix: ["todayVideo"] });
  const resultArray = [];
  for await (const entry of entries) {
    resultArray.push({ type: entry.key[1], data: entry.value });
  }
  context.response.body = resultArray;
});

router.get("/video/type", async (context) => {
  const type = context.request.url.searchParams.get("type");
  if (type) {
    const data = await kv.get(["todayVideo", type]);
    context.response.body = {
      data: data.value,
    };
  } else {
    context.response.body = {
      msg: "type不存在",
    };
  }
});

router.post("/video/search", async (context) => {
  try {
    const body = context.request.body;
    const formData = await body.formData();
    try {
      const response = await sendRequest<string>(
        `https://m1-a1.cloud.nnpp.vip:2223/api/v?z=${apiKey}&jx=` +
          formData.get("key") +
          `&s1ig=11403&g=`
      );
      context.response.body = JSON.parse(response);
    } catch {
      context.response.status = 500;
      context.response.body = { message: "Failed to get data" };
    }
  } catch (error) {
    console.error("Error while reading request body:", error);
    context.response.status = 400;
    context.response.body = { message: "Failed to read request body" };
  }
});

export default router;
