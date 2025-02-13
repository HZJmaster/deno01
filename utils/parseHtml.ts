import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.49/deno-dom-wasm.ts";
import { sendRequest, kv } from "../dep.ts";

const basrUrl = "http://yhdm1.org/";

type videoType = {
  url: string | null;
  name: string | null;
  picUrl: string | null | undefined;
  bz: string | undefined;
  type: string | null;
};

export async function parserAnimateWebsizte() {
  try {
    const html = await sendRequest<string>(basrUrl);
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    if (doc) {
      const indexList = doc.querySelectorAll(".index-list-l");
      indexList.forEach(async (item) => {
        const a = item.querySelector(
          'a[href="/zongyi/"],a[href="/acg/"],a[href="/tv/"],a[href="/mov/"]'
        );
        if (a) {
          const objs = item.querySelectorAll(".li-hv");
          const typeSource: videoType[] = [];
          objs.forEach((o) => {
            const img = o.querySelector("img");
            const bz = o.querySelector(".bz");
            typeSource.push({
              name: o.getAttribute("title"),
              url: o.getAttribute("href"),
              picUrl: img?.getAttribute("data-original"),
              bz: bz?.textContent,
              type: a.textContent,
            });
          });
          const result = await kv.set(
            ["todayVideo", a.textContent],
            typeSource
          );
          console.log(result);
        }
      });
    }
  } catch (error) {
    const err = error as Error; // 断言为 Error 类型
    console.error(err.message);
  }
}
