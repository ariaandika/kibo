import { Elysia } from "elysia"
import { jwt } from "@elysiajs/jwt"
import { swagger } from "@elysiajs/swagger"

export const app = new Elysia()
    .use(jwt({
        name: "jwt",
        secret: process.env.JWT_SECRET!,
    }))
    .use(swagger())
