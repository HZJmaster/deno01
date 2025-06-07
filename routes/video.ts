import { apiKey } from "../config/key.ts";
import { $d, $o } from "../config/key.ts";
import { kv, Router, sendRequest } from "../dep.ts";
import { extractPlaylists } from "../utils/executeJS.ts";
import { extractMediaInfo } from "../utils/parseHtml.ts";

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

router.get("/video/yhsearch", async (ctx) => {
  const queryParams = ctx.request.url.searchParams;
  const keyword = queryParams.get("keyword");
  const searchApi = await kv.get<{ searchApi: string }>([
    "system",
    "searchApi",
  ]);
  if (keyword) {
    try {
      const url = new URL(
        searchApi.value
          ? searchApi.value.searchApi
          : "http://159.75.138.91:47124/ssszz.php"
      );
      url.searchParams.append("top", "20");
      url.searchParams.append("q", keyword);
      url.searchParams.append(
        "other_kkk217",
        "%2568%2574%2574%2570%253a%252f%252f%2579%2568%2564%256d%2537%2536%252e%2563%256f%256d"
      );
      url.searchParams.append("dect", "0");
      const response = await sendRequest<string>(url);
      ctx.response.body = JSON.parse(response);
    } catch {
      ctx.response.status = 500;
      ctx.response.body = { message: "Failed to get data" };
    }
  } else {
    ctx.response.body = { message: "No key parameter provided" };
  }
});

router.get("/video/yhsource", async (ctx) => {
  const queryParams = ctx.request.url.searchParams;
  const page = queryParams.get("page") || "1";
  const action = queryParams.get("action");
  const year = queryParams.get("year") || "0";
  const area = queryParams.get("area") || "all";
  const sclass = queryParams.get("class") || "0";
  const sourceApi = await kv.get<{ sourceApi: string }>([
    "system",
    "sourceApi",
  ]);
  if (action) {
    try {
      const url = new URL(
        sourceApi.value
          ? sourceApi.value.sourceApi
          : "http://175.178.165.73:32517/getsortdata_all_z.php"
      );
      url.searchParams.append("action", action);
      url.searchParams.append("page", page);
      url.searchParams.append("year", year);
      url.searchParams.append("area", area);
      url.searchParams.append("class", sclass);
      url.searchParams.append("dect", "");
      url.searchParams.append("id", "");
      const response = await sendRequest<string>(url);
      ctx.response.body = extractMediaInfo(response);
    } catch {
      ctx.response.status = 500;
      ctx.response.body = { message: "Failed to get data" };
    }
  } else {
    ctx.response.body = { message: "No key parameter provided" };
  }
});

router.get("/video/yhresult", async (ctx) => {
  const queryParams = ctx.request.url.searchParams;
  const id = queryParams.get("id");
  const resultApi = await kv.get<{ resultApi: string }>([
    "system",
    "resultApi",
  ]);
  if (id) {
    try {
      const url = new URL(
        resultApi.value
          ? `${resultApi.value.resultApi}/ne2/s${id}.js?${Date.now()}`
          : `http://v.58hda.com:8077/ne2/s${id}.js?${Date.now()}`
      );
      const jsCode = await sendRequest<string>(url);
      ctx.response.body = extractPlaylists(jsCode);
    } catch {
      ctx.response.status = 500;
      ctx.response.body = { message: "Failed to get data" };
    }
  } else {
    ctx.response.body = { message: "No key parameter provided" };
  }
});

export default router;
