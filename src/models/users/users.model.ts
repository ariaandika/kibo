import { pgTable, text, timestamp, integer, serial } from "drizzle-orm/pg-core"


export const users = pgTable("users",{
    user_id: serial("user_id").primaryKey(),
    username: text("username").notNull().unique(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    role: integer("role").notNull().default(1),
    created_at: timestamp("created_at").notNull().defaultNow(),
})

