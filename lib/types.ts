import { Category } from "@/controllers/category.controller.ts";
import { InventoryItem } from "@/controllers/inventory.controller.ts";
import { ShelfWithItems } from "@/controllers/shelves.controller.ts";

export type InventoryItemWithCategoryAndShelf = InventoryItem & { category: Category, shelf: ShelfWithItems };