import { app } from "$lib/index"
import { t } from "elysia"
import { db, eq, products } from "$lib/client"


app
    .get("/api/v1/products", async () => {
        return { products: await db.query.products.findMany() }
    })

    .post("/api/v1/products", async ({ body }) => {
        const [newProduct] = await db.insert(products).values(body).returning()
        return { product: newProduct }
    },{
        body: t.Object({
            name: t.String(),
            price: t.String(),
            quantity: t.Number(),
            disc: t.Boolean(),
            total_disc: t.String(),
        })
    })

