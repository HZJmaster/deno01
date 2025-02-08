import { Router } from "../dep.ts";

const router = new Router();

router.get("/users", (context) => {
  context.response.body = {
    username: "User list",
  };
});

router.get("/users/:id", (context) => {
  if (context.params && context.params.id) {
    context.response.body = `User ID: ${context.params.id}`;
  }
});

export default router;
