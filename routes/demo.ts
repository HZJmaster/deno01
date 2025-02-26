import { Router } from "../dep.ts";
import { $o, $d } from "../config/key.ts";

const router = new Router();

router.get("/demo", async (ctx) => {
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
