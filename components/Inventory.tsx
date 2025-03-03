import { Handlers } from "$fresh/server.ts";
import { type CategoryId } from "@/controllers/category.controller.ts";
import {
  InventoryController,
  InventoryItem,
} from "@/controllers/inventory.controller.ts";

export const handler: Handlers<Record<string, InventoryItem>> = {
  async GET(_req, ctx) {
    const inventoryController = new InventoryController();
    const inventory = await inventoryController.getInventory();
    return ctx.render(inventory ?? {});
  },
};

export default function Inventory(
  { data }: { data: Record<CategoryId, InventoryItem> },
) {
  return (
    <div>
      <h1>Inventory</h1>
      {data && Object.entries(data).map(([barcode, item]) => (
        <div key={barcode}>
          <h2>{item.name}</h2>
          <p>{item.quantity}</p>
        </div>
      ))}
    </div>
  );
}
