import Inventory, { InventoryData } from "../islands/Inventory.tsx";
import Layout from "@/components/Layout.tsx";
import { CategoryController } from "@/controllers/category.controller.ts";
import { InventoryController } from "@/controllers/inventory.controller.ts";
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers<InventoryData> = {
  async GET(_req, ctx) {
    const inventoryController = new InventoryController();
    const categoryController = new CategoryController();

    const [inventory, categories] = await Promise.all([
      inventoryController.getInventory(),
      categoryController.getCategories(),
    ]);

    return ctx.render({
      inventory: inventory ?? [],
      categories: categories ?? [],
    });
  },
};

export default function InventoryRoute(
  props: { data: InventoryData },
) {
  return (
    <Layout title="Kitchen Inventory - Inventory">
      <Inventory data={props.data} />
    </Layout>
  );
}
