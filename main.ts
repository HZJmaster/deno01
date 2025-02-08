import { Application, jsonMiddleware } from "./dep.ts";
import userRouter from "./routes/user.ts";
import videoRouter from "./routes/video.ts";

const app = new Application();

app.use(jsonMiddleware);

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.use(videoRouter.routes());
app.use(videoRouter.allowedMethods());

await app.listen({ port: 8000 });
