import { getClient } from "../../db/index.ts";
import { Tables } from "../../db/types.ts";

export type InventoryItem = Omit<Tables<'items'>, 'id' | 'created_at' | 'updated_at'>;

export class InventoryController {
  constructor() {}

  async getInventory(): Promise<Record<string, InventoryItem> | null> {
    const client = getClient();
    const {
      data: items,
    } = await client.from('items').select('*');

    if (items) {
      return items.reduce((groupedByBarcode, item) => {
        groupedByBarcode[item.barcode] = item;
        return groupedByBarcode;
      }, {} as Record<string, InventoryItem>);
    }

    return null;
  }

  async addInventoryToShelf(
    shelfId: number,
    categoryId: number,
    item: InventoryItem,
  ): Promise<void> {
    const client = getClient();
    await client.from('items').insert({
      barcode: item.barcode,
      name: item.name,
      quantity: item.quantity,
      image: item.image,
      shelf_id: shelfId,
      expiration_date: item.expiration_date,
      unit: item.unit,
      category_id: categoryId,
    });
  }

  async searchByBarcode(barcode: string): Promise<InventoryItem | null> {
    const client = getClient();
    const {
      data: foundItem,
    } = await client.from('items').select('*').eq('barcode', barcode).single();
    return foundItem;
  }
}
