const env = Deno.env.get("ENV_DENO");
export {
  Application,
  Router,
  Context,
  type Middleware,
} from "https://deno.land/x/oak@v17.1.4/mod.ts";
export { jsonMiddleware } from "./middlewares/json_middleware.ts";
export { sendRequest } from "./utils/httpService.ts";
export { ResponseHandler } from "./utils/responseHandler.ts";
export { generateToken } from "./utils/jwtTool.ts";
let kvTemp;
if (env === "production") {
  kvTemp = await Deno.openKv();
} else {
  kvTemp = await Deno.openKv(
    "https://api.deno.com/databases/dca20192-cb7b-481c-bd13-8a428a24f047/connect"
  );
}
export const kv = kvTemp;
