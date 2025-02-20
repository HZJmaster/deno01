import { Application, jsonMiddleware } from "./dep.ts";
import userRouter from "./routes/user.ts";
import videoRouter from "./routes/video.ts";
import demoRouter from "./routes/demo.ts";
import { parserAnimateWebsizte } from "./utils/parseHtml.ts";

const app = new Application();

app.use(jsonMiddleware);

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.use(demoRouter.routes());
app.use(demoRouter.allowedMethods());

app.use(videoRouter.routes());
app.use(videoRouter.allowedMethods());

Deno.cron("fetchSource", "0 1 * * *", async () => {
  console.log("This runs at 1:00 AM every day");
  await parserAnimateWebsizte();
});

await app.listen({ port: 8000 });
