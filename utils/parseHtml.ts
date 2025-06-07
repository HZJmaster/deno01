import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.45/deno-dom-wasm.ts";

// 解析HTML并提取影视信息
export function extractMediaInfo(html: string) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  if (!doc) return [];

  const items = [];
  const liElements = doc.querySelectorAll("li.mb");

  for (const li of liElements) {
    const anchor = li.querySelector("a.li-hv");
    if (!anchor) continue;

    // 提取标题（优先使用<p class="name">的内容）
    const nameElement = anchor.querySelector(".text .name");
    const title =
      nameElement?.textContent.trim() ||
      anchor.getAttribute("title") ||
      "未知标题";

    // 提取链接
    const url = anchor.getAttribute("href") || "#";

    // 提取图片URL（优先使用src属性）
    const img = anchor.querySelector("img.lazy");
    const thumb =
      img?.getAttribute("src") || img?.getAttribute("data-original") || "";

    // 提取最新集数
    const episodeText = anchor.querySelector("p.bz")?.textContent.trim() || "";
    const lianzaijs = parseInt(episodeText.replace(/[^\d]/g, "")) || 0;

    items.push({
      title,
      url,
      thumb,
      episodeText,
      lianzaijs,
    });
  }

  return items;
}
