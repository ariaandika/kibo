import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as models from "./models"

export { eq, or } from "drizzle-orm"
export * from "./models"

export const queryClient = postgres(process.env.DATABASE_URL!);
export const db = drizzle(queryClient, { schema: models });

