import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import * as dotenv from "dotenv";

// Load environment variables (.env file locally, or GitHub environment variables in CI)
dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is missing!");
}

async function runMigration() {
  console.log("Running database migrations...");

  // Disable prefetch as it's not supported by all neon/pg/postgis proxies during migration steps
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is missing!");
  }

  const migrationClient = postgres(process.env.DATABASE_URL, {
    max: 1,
    onnotice: () => {},
  });
  const db = drizzle(migrationClient);

  try {
    // Looks for the generated SQL files inside your drizzle folder
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("Migrations completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    await migrationClient.end();
  }
}

runMigration();
