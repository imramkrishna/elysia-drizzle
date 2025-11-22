import { Elysia } from "elysia";
import routes from "./routes";
import checkAuth from "./middlewares/checkAuth";

const app = new Elysia()

routes.forEach(route => {
  route.isProtected ?
    app.use(checkAuth).route(route.method, route.path, route.controller)
    :
    app.route(route.method, route.path, route.controller)
})

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
