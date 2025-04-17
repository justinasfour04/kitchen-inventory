import { Handlers } from "$fresh/server.ts";
import { InventoryController } from "@/controllers/inventory.controller.ts";

export const handler: Handlers = {
  async GET(req, _ctx) {
    const barcode = new URL(req.url).searchParams.get("barcode");
    if (!barcode) {
      return new Response(JSON.stringify({ error: "Barcode is required" }), {
        status: 400,
      });
    }

    const inventoryController = new InventoryController();
    const item = await inventoryController.searchByBarcode(barcode);

    if (!item) {
      return new Response(JSON.stringify({ error: "Item not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(item), { status: 200 });
  },
};
