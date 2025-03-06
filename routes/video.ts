import { apiKey } from "../config/key.ts";
import { $o, $d } from "../config/key.ts";
import { Router, sendRequest } from "../dep.ts";

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

router.get("/video/imgload", async (ctx) => {
  const queryParams = ctx.request.url.searchParams;
  const imgUrl = queryParams.get("url");
  try {
    if (!imgUrl) {
      throw new Error();
    }
    const response = await fetch(imgUrl, {
      method: "GET",
      headers: {
        Referer: "https://mei.vving.vip/",
      },
    });
    const contentType = response.headers.get("content-type") || "image/webp";
    ctx.response.headers.set("content-type", contentType);
    const body = await response.arrayBuffer();
    ctx.response.body = new Uint8Array(body);
  } catch {
    ctx.response.status = 500;
    ctx.response.body = { message: "Failed to get data" };
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

router.get("/video/source", async (ctx) => {
  try {
    const response = await fetch("https://a1.cloud.nnpp.vip:2223/b/nY7v3", {
      method: "POST",
      body: $o(
        JSON.stringify({
          db: "film",
          table: "videos",
          query: {},
          sort: ["-last_play_time", "-douban_rating"],
          page: 1,
          limit: 15,
          fields: ["_id", "title", "genres", "poster", "imgs", "url"],
          slice: { imgs: 1 },
          action: "query",
          t: Date.now() / 1e3,
        })
      ),
    });
    const arrayBuffer = await response.arrayBuffer();
    const json = new TextDecoder().decode($d(arrayBuffer));
    ctx.response.body = {
      data: JSON.parse(json),
    };
  } catch {
    ctx.response.status = 500;
    ctx.response.body = { message: "Failed to get data" };
  }
});

export default router;
