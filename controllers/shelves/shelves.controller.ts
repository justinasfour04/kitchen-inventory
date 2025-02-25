import { getClient } from "../../db/config.ts";
import { Shelf } from "./shelves.types.ts";

export class ShelvesController {
  constructor() {}
  
  async getShelves(): Promise<Shelf[]> {
    const client = await getClient();
    try {
      const result = await client.queryObject<Shelf>(
        "SELECT * FROM shelves ORDER BY created_at DESC JOIN items ON shelves.id = items.shelf_id",
      );
      return result.rows;
    } finally {
      client.release();
    }
  }

  async addShelf(shelf: Omit<Shelf, "id" | "createdAt" | "updatedAt">): Promise<Shelf> {
    const client = await getClient();
    try {
      const result = await client.queryObject<Shelf>(
        "INSERT INTO shelves (name) VALUES ($1) RETURNING *",
        [shelf.name],
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }
}