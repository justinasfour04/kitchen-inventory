import "@std/dotenv/load";

import { MigrationManager } from "../db/migrationManager.ts";
import { migration as initialSchema } from "../db/migrations/001_initial_schema.ts";

// Add all migrations here in order
const migrations = [
  initialSchema,
];

const migrationManager = new MigrationManager();

console.log("Starting migrations...");
try {
  await migrationManager.migrate(migrations)
  console.log("Migrations completed successfully!");
  Deno.exit(0);
} catch (error) {
  console.error("Migration failed:", error);
  Deno.exit(1);
}
