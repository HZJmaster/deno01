import { Application, jsonMiddleware } from "./dep.ts";
import userRouter from "./routes/user.ts";
import systemRouter from "./routes/system.ts";
import expireRouter from "./routes/expire.ts";
import adminRouter from "./routes/admin.ts";
import videoRouter from "./routes/video.ts";

const app = new Application();

app.use(jsonMiddleware);

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.use(adminRouter.routes());
app.use(adminRouter.allowedMethods());

app.use(systemRouter.routes());
app.use(systemRouter.allowedMethods());

app.use(expireRouter.routes());
app.use(expireRouter.allowedMethods());

app.use(videoRouter.routes());
app.use(videoRouter.allowedMethods());

await app.listen({ port: 8000 });
