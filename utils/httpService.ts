// httpService.ts
export interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: { [key: string]: string };
  body?: unknown;
}

export async function sendRequest<T>(
  url: string | URL,
  options?: RequestOptions
): Promise<T> {
  const defaultOptions: RequestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const mergedOptions = { ...defaultOptions, ...options };

  if (mergedOptions.method === "POST" || mergedOptions.method === "PUT") {
    if (!mergedOptions.headers) mergedOptions.headers = {};
    if (typeof mergedOptions.body !== "string") {
      mergedOptions.body = JSON.stringify(mergedOptions.body);
    }
  }

  try {
    const response = await fetch(url, mergedOptions);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }

    // 如果响应类型是JSON，则解析JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return (await response.json()) as T;
    } else {
      // 如果不是JSON内容，则返回文本
      return (await response.text()) as unknown as T;
    }
  } catch (error) {
    console.error(`Error while fetching ${url}:`, error);
    throw error;
  }
}
