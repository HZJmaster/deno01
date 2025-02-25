import { Application, jsonMiddleware } from "./dep.ts";
import userRouter from "./routes/user.ts";
import videoRouter from "./routes/video.ts";
import demoRouter from "./routes/demo.ts";

const app = new Application();

app.use(jsonMiddleware);

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.use(demoRouter.routes());
app.use(demoRouter.allowedMethods());

app.use(videoRouter.routes());
app.use(videoRouter.allowedMethods());

await app.listen({ port: 8000 });
