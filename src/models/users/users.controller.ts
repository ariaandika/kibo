import { app } from "$lib/index"
import { t } from "elysia"
import { db, eq, users } from "$lib/client"


app
    .post("/api/v1/users/login", async ({ body, jwt, set }) => {
        const { username, password } = body

        const user = await db.query.users.findFirst({
            where: eq(users.username, username)
        })

        if (user && await Bun.password.verify(password, user.password)) { }
        else {
            set.status = 401;
            return { error: true, message: "Invalid username or password" }
        }

        const { password: _, created_at, ...userData } = user 

        return {
            user: userData,
            token: await jwt.sign({ user_id: user.user_id })
        }
    },{
        body: t.Object({
            username: t.String(),
            password: t.String()
        })
    })

    .post("/api/v1/users/register", async ({ body, jwt, set }) => {
        const userName = await db.query.users.findFirst({
            where: eq(users.username, body.username)
        })

        if (userName) {
            set.status = 409;
            return { error: true, message: "Username already exists" }
        }

        const userEmail = await db.query.users.findFirst({
            where: eq(users.email, body.email)
        })

        if (userEmail) {
            set.status = 409;
            return { error: true, message: "Email already exists" }
        }

        body.password = await Bun.password.hash(body.password)

        const [newUser] = await db.insert(users).values(body).returning()

        const { password: _, ...userData } = newUser

        return {
            user: userData,
            token: await jwt.sign({ user_id: userData.user_id })
        }

    },{
        body: t.Object({
            username: t.String(),
            password: t.String(),
            email: t.String(),
        })
    })
