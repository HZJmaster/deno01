import { Application, jsonMiddleware } from "./dep.ts";
import { cron } from "https://deno.land/x/deno_cron@v1.0.0/cron.ts";
import userRouter from "./routes/user.ts";
import videoRouter from "./routes/video.ts";
import { parserAnimateWebsizte } from "./utils/parseHtml.ts";

const app = new Application();

app.use(jsonMiddleware);

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.use(videoRouter.routes());
app.use(videoRouter.allowedMethods());
cron("0 1 * * *", async () => {
  await parserAnimateWebsizte();
});
await parserAnimateWebsizte();
await app.listen({ port: 8000 });
