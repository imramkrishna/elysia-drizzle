import { Elysia } from "elysia";
import routes from "./routes";
import checkAuth from "./middlewares/checkAuth";

const app = new Elysia()

routes.forEach(route => {
  if (route.isProtected) {
    app.use(new Elysia().use(checkAuth).route(route.method, route.path, route.controller))
  } else {
    app.route(route.method, route.path, route.controller)
  }
})
app.listen(3000)
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
