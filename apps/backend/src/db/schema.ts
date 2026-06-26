import { pgTable, serial } from "drizzle-orm/pg-core";

//Temporary schema meant as placeholder for testing
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
});
