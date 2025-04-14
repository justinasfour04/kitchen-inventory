import { Handlers } from "$fresh/server.ts";
import {
  ShelfWithItems,
  ShelvesController,
} from "@/controllers/shelves.controller.ts";
import {
  InventoryController,
  type InventoryItem,
} from "@/controllers/inventory.controller.ts";
import ClosetShelf from "@/islands/ClosetShelf.tsx";
import { CategoryController, Category } from "@/controllers/category.controller.ts";

export const handler: Handlers<{ shelves: ShelfWithItems[]; categories: Category[] }> = {
  async GET(_req, ctx) {
    const shelvesController = new ShelvesController();
    const categoriesController = new CategoryController();
    const shelves = await shelvesController.getShelves();
    const categories = await categoriesController.getCategories();
    const data = { shelves, categories };
    return ctx.render(data);
  },
  async POST(req, ctx) {
    const shelvesController = new ShelvesController();
    const inventoryController = new InventoryController();
    const categoriesController = new CategoryController();

    // Handle form data submission
    const formData = await req.formData();
    const name = formData.get("name")?.toString();
    const categoryId = formData.get("category")?.toString();
    const barcode = formData.get("barcode")?.toString();
    const shelfId = formData.get("shelfId")?.toString();
    const action = formData.get("action")?.toString();

    // New item fields
    const itemName = formData.get("itemName")?.toString();
    const quantity = formData.get("quantity")?.toString() || "1";
    const unit = formData.get("unit")?.toString() || "item";
    const expirationDate = formData.get("expirationDate")?.toString() || "";

    if (action === "addShelf" && name) {
      await shelvesController.addShelf(name);
    } else if (action === "addItem" && barcode && shelfId && categoryId) {
      // Search for item by barcode
      const item = await inventoryController.searchByBarcode(barcode);

      if (item) {
        // Add existing item to the selected shelf
        await inventoryController.addInventoryToShelf(
          parseInt(shelfId, 10),
          parseInt(categoryId, 10),
          item,
        );
      } else if (itemName) {
        // Create a new item if name is provided
        const newItem: InventoryItem = {
          barcode,
          name: itemName,
          quantity: parseInt(quantity, 10),
          image: "",
          unit,
          expiration_date: new Date(expirationDate).toISOString(),
          minimum_quantity: 0,
          category_id: parseInt(categoryId, 10),
          shelf_id: parseInt(shelfId, 10),
        };

        // Add the new item to the selected shelf
        try {
          await inventoryController.addInventoryToShelf(
            parseInt(shelfId, 10),
            parseInt(categoryId, 10),
            newItem,
          );
        } catch (error) {
          console.error(error);
        }
      } else {
        // If item not found and no name provided, log an error
        console.log(
          `Item with barcode ${barcode} not found and no name provided to create it`,
        );
      }
    }

    const shelves = await shelvesController.getShelves();
    const categories = await categoriesController.getCategories();
    const data = { shelves, categories };
    return ctx.render(data);
  },
};

export default function Closet({ data }: { data: { shelves: ShelfWithItems[]; categories: Category[] } }) {
  // Use data from the handler if available, otherwise use sample data
  const shelves = data?.shelves;
  const categories = data?.categories;

  return (
    <div class="w-full max-w-4xl mx-auto p-4">
      <h2 class="text-2xl font-bold mb-6 text-center">My Closet</h2>

      {/* Add new shelf form */}
      <div class="mb-8 bg-white rounded-lg shadow p-4 border border-gray-200">
        <h3 class="text-lg font-semibold mb-3">Add New Shelf</h3>
        <form method="post" class="flex gap-2">
          <input
            type="text"
            name="name"
            placeholder="Shelf name"
            required
            class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input type="hidden" name="action" value="addShelf" />
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Shelf
          </button>
        </form>
      </div>

      {/* Shelves and their contents */}
      <div data-island="closet-shelf">
        <ClosetShelf shelves={shelves} categories={categories} />
      </div>
    </div>
  );
}
