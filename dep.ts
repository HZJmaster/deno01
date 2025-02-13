export {
  Application,
  Router,
  Context,
  type Middleware,
} from "https://deno.land/x/oak@v17.1.4/mod.ts";
export { jsonMiddleware } from "./middlewares/json_middleware.ts";
export { sendRequest } from "./utils/httpService.ts";
export const kv = await Deno.openKv();
// "https://api.deno.com/databases/32f7e8ff-39e5-46ad-ad81-599d639e2fe8/connect"
