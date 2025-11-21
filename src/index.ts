import { Elysia } from "elysia";

const app = new Elysia()

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
