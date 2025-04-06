import Inventory, { handler as inventoryHandler } from "../islands/Inventory.tsx";
import Layout from "@/components/Layout.tsx";
import { Category } from "@/controllers/category.controller.ts";
import { InventoryItem } from "@/controllers/inventory.controller.ts";
import { Handlers } from "$fresh/server.ts";

interface InventoryData {
  inventory: Record<string, InventoryItem>;
  categories: Category[];
}

export const handler: Handlers<InventoryData> = inventoryHandler;

export default function InventoryRoute(
  props: { data: InventoryData },
) {
  return (
    <Layout title="Kitchen Inventory - Inventory">
      <Inventory data={props.data} />
    </Layout>
  );
}
