import { InventoryItem } from "../inventory/inventory.types.ts";
import { getClient } from "../../db/config.ts";

export class InventoryController {
  constructor() {}

  async getInventory(): Promise<Record<string, InventoryItem>> {
    const client = await getClient();
    try {
      const inventory = await client.queryObject<InventoryItem>(
        "SELECT * FROM inventory",
      );
      return inventory.rows.reduce((groupedByBarcode, inventory) => {
        groupedByBarcode[inventory.barcode] = inventory;
        return groupedByBarcode;
      }, {} as Record<string, InventoryItem>);
    } finally {
      client.release();
    }
  }

  async addInventory(inventory: InventoryItem): Promise<void> {
    const client = await getClient();
    try {
      await client.queryObject(
        `INSERT INTO inventory (barcode, name, quantity, image) 
         VALUES ($1, $2, $3, $4)`,
        [
          inventory.barcode,
          inventory.name,
          inventory.quantity,
          inventory.image,
        ],
      );
    } finally {
      client.release();
    }
  }

  async searchByBarcode(barcode: string): Promise<InventoryItem | null> {
    const client = await getClient();
    try {
      const inventory = await client.queryObject<InventoryItem>(
        "SELECT * FROM inventory WHERE barcode = $1",
        [barcode],
      );
      return inventory.rows[0] || null;
    } finally {
      client.release();
    }
  }
}
