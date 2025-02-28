import { getClient } from "../../db/index.ts";
import { Shelf } from "./shelves.types.ts";
import { DbInventoryItem, InventoryItem } from "../inventory/inventory.types.ts";

export interface ShelfWithItems extends Shelf {
  items: InventoryItem[];
}

export class ShelvesController {
  constructor() {}

  async getShelves(): Promise<ShelfWithItems[]> {
    const client = await getClient();
    try {
      // First, get all shelves
      const shelvesResult = await client.queryObject<Shelf>(
        'SELECT id, name FROM shelves ORDER BY created_at DESC',
      );

      const shelves = shelvesResult.rows;

      // For each shelf, get its items
      const shelvesWithItems: ShelfWithItems[] = await Promise.all(
        shelves.map(async (shelf) => {
          const itemsResult = await client.queryObject<DbInventoryItem>(
            `SELECT barcode, name, quantity, image, unit FROM items WHERE shelf_id = $1`,
            [shelf.id],
          );

          // Convert database items to InventoryItem format
          const items: InventoryItem[] = itemsResult?.rows.map((item) => ({
            id: item.id.toString(),
            barcode: item.barcode,
            expirationDate: item.expirationDate,
            imageUrl: item.imageUrl || "",
            minimumQuantity: item.minimumQuantity,
            name: item.name,
            notes: item.notes,
            quantity: item.quantity,
            unit: item.unit,
          })) || [];

          return {
            ...shelf,
            items,
          };
        }),
      );

      return shelvesWithItems;
    } finally {
      client.release();
    }
  }

  async addShelf(
    shelf: Omit<Shelf, "id" | "createdAt" | "updatedAt">,
  ): Promise<Shelf> {
    const client = await getClient();
    try {
      const result = await client.queryObject<Shelf>(
        'INSERT INTO shelves (name) VALUES ($1) RETURNING id, name, created_at as "createdAt", updated_at as "updatedAt"',
        [shelf.name],
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }
}
