import { getClient } from "@/db/index.ts";
import { Tables } from "@/db/types.ts";

type Shelf = Omit<Tables<"shelves">, "created_at" | "updated_at">;
export type ShelfWithItems = Shelf & {
  items: Omit<Tables<"items">, "id" | "created_at" | "updated_at">[];
};

export class ShelvesController {
  constructor() {}

  async getShelves(): Promise<ShelfWithItems[]> {
    const client = getClient();
    // First, get all shelves
    const {
      data: shelves,
    } = await client.from("shelves").select("id, name").order("created_at", {
      ascending: false,
    });

    if (shelves) {
      // For each shelf, get its items
      const shelvesWithItems: ShelfWithItems[] = await Promise.all(
        shelves.map(async (shelf) => {
          const {
            data: items,
          } = await client.from("items").select(
            "barcode, category_id, expiration_date, image, minimum_quantity, name, quantity, shelf_id, unit",
          ).eq("shelf_id", shelf.id).order("created_at", { ascending: false });

          if (items) {
            // Convert database items to InventoryItem format
            return {
              ...shelf,
              items,
            };
          }

          return {
            ...shelf,
            items: [],
          };
        }),
      );

      return shelvesWithItems;
    }

    return [];
  }

  async addShelf(
    nameOfShelf: string,
  ): Promise<Shelf> {
    const client = getClient();
    const {
      data: newShelf,
    } = await client.from("shelves").insert({
      name: nameOfShelf,
    }).select("id, name").single();

    if (!newShelf) {
      throw new Error("Failed to add shelf");
    }
    return newShelf;
  }
}
