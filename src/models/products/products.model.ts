import { pgTable, serial, text, integer, boolean } from "drizzle-orm/pg-core"

export const products = pgTable("products",{
    product_id: serial("product_id").primaryKey(),
    name: text("name").notNull(),
    price: text("price").notNull(),
    quantity: integer("quantity").notNull(),
    disc: boolean("disc").notNull(),
    total_disc: text("total_disc").notNull(),
})

