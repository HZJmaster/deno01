// 使用正则表达式提取播放列表
export function extractPlaylists(code: string): Record<string, string[]> {
  const playlists: Record<string, string[]> = {};

  // 匹配所有 playarr_*[index]="value" 的赋值语句
  const regex = /(\w+)\[(\d+)\]\s*=\s*"([^"]+)"/g;

  let match;
  while ((match = regex.exec(code)) !== null) {
    const arrayName = match[1];
    const index = parseInt(match[2]);
    let value = match[3];

    // 只处理以 playarr 开头的数组
    if (arrayName.startsWith("playarr")) {
      // 提取第一个逗号前的 URL 部分
      const urlPart = value.split(",")[0].trim();

      if (!playlists[arrayName]) {
        playlists[arrayName] = [];
      }

      // 确保数组有足够的长度
      while (playlists[arrayName].length < index) {
        playlists[arrayName].push("");
      }

      playlists[arrayName][index - 1] = urlPart;
    }
  }

  // 清理空值并确保数组连续
  for (const key in playlists) {
    playlists[key] = playlists[key].filter((url) => url !== "");
  }

  return playlists;
}
