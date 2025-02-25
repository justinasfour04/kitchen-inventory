import { Handlers } from "$fresh/server.ts";
import {
  ShelfWithItems,
  ShelvesController,
} from "../controllers/shelves/shelves.controller.ts";
import ClosetShelf from "../islands/ClosetShelf.tsx";

export const handler: Handlers<ShelfWithItems[]> = {
  async GET(_req, ctx) {
    const shelvesController = new ShelvesController();
    const shelves = await shelvesController.getShelves();
    return ctx.render(shelves);
  },
  async POST(req, ctx) {
    const shelvesController = new ShelvesController();

    // Handle form data submission
    const formData = await req.formData();
    const name = formData.get("name")?.toString();

    if (name) {
      await shelvesController.addShelf({ name });
    }

    const shelves = await shelvesController.getShelves();
    return ctx.render(shelves);
  },
};

export default function Closet({ data }: { data: ShelfWithItems[] }) {
  // Use data from the handler if available, otherwise use sample data
  const shelves = data?.length ? data : [];

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
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Shelf
          </button>
        </form>
      </div>

      <div data-island="closet-shelf">
        <ClosetShelf shelves={shelves} />
      </div>
    </div>
  );
}
