import { Handlers } from "$fresh/server.ts";
import { ShelvesController } from "../controllers/shelves/shelves.controller.ts";
import ClosetShelf from "../islands/ClosetShelf.tsx";
import { InventoryItem } from "./InventoryGrid.tsx";

interface ShelfData {
  id: number;
  name: string;
  items: InventoryItem[];
}

// Sample data - replace with actual data from your backend
const shelves: ShelfData[] = [
  {
    id: 1,
    name: "Top Shelf",
    items: [
      {
        id: "1",
        name: "Paper Towels",
        quantity: 12,
        description: "Bulk pack of premium paper towels",
      },
      {
        id: "2",
        name: "Cleaning Supplies",
        quantity: 5,
        description: "Various cleaning sprays and solutions",
      },
    ],
  },
  {
    id: 2,
    name: "Upper Middle Shelf",
    items: [
      {
        id: "3",
        name: "Canned Goods",
        quantity: 15,
        description: "Assorted canned vegetables and fruits",
      },
      {
        id: "4",
        name: "Pasta",
        quantity: 8,
        description: "Different types of dried pasta",
      },
    ],
  },
  {
    id: 3,
    name: "Lower Middle Shelf",
    items: [
      {
        id: "5",
        name: "Snacks",
        quantity: 20,
        description: "Various packaged snacks",
      },
      {
        id: "6",
        name: "Rice",
        quantity: 3,
        description: "5lb bags of white rice",
      },
    ],
  },
  {
    id: 4,
    name: "Bottom Shelf",
    items: [
      {
        id: "7",
        name: "Pet Food",
        quantity: 2,
        description: "Large bags of dry pet food",
      },
      {
        id: "8",
        name: "Water Bottles",
        quantity: 24,
        description: "Case of bottled water",
      },
    ],
  },
];

export const handler: Handlers<ShelfData[]> = {
  async GET(_req, ctx) {
    const shelvesController = new ShelvesController();
    const shelves = await shelvesController.getShelves();
    return ctx.render(shelves);
  },
  async POST(req, ctx) {
    const shelvesController = new ShelvesController();
    const { name } = await req.json();
    await shelvesController.addShelf({ name });
    const shelves = await shelvesController.getShelves();
    return ctx.render(shelves);
  }
}

export default function Closet() {
  return (
    <div class="w-full max-w-4xl mx-auto p-4">
      <h2 class="text-2xl font-bold mb-6 text-center">My Closet</h2>
      <div data-island="closet-shelf">
        <ClosetShelf shelves={shelves} />
      </div>
    </div>
  );
}
