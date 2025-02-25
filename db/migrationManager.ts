import { getClient } from "./config.ts";

// Interface for migration metadata
interface MigrationMeta {
  id: number;
  name: string;
  executed_at: Date;
}

export class MigrationManager {
  private async createMigrationsTable() {
    const client = await getClient();
    try {
      await client.queryObject(`
        CREATE TABLE IF NOT EXISTS migrations (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          executed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);
    } finally {
      client.release();
    }
  }

  private async getMigrationsHistory(): Promise<MigrationMeta[]> {
    const client = await getClient();
    try {
      const result = await client.queryObject<MigrationMeta>(
        "SELECT * FROM migrations ORDER BY id ASC",
      );
      return result.rows;
    } finally {
      client.release();
    }
  }

  private async recordMigration(name: string): Promise<void> {
    const client = await getClient();
    try {
      await client.queryObject(
        "INSERT INTO migrations (name) VALUES ($1)",
        [name],
      );
    } finally {
      client.release();
    }
  }

  async migrate(migrations: { name: string; up: string }[]): Promise<void> {
    await this.createMigrationsTable();
    const history = await this.getMigrationsHistory();
    const executedMigrations = new Set(history.map((m) => m.name));

    const client = await getClient();
    try {
      for (const migration of migrations) {
        if (!executedMigrations.has(migration.name)) {
          console.log(`Executing migration: ${migration.name}`);
          await client.queryObject(migration.up);
          await this.recordMigration(migration.name);
          console.log(`Completed migration: ${migration.name}`);
        }
      }
    } catch (error) {
      console.error("Migration failed:", error);
      throw error;
    } finally {
      client.release();
    }
  }
}
