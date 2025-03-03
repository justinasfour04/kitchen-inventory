import Inventory from "@/components/Inventory.tsx";
import Layout from "@/components/Layout.tsx";
import { CategoryId } from "@/controllers/category.controller.ts";
import { InventoryItem } from "@/controllers/inventory.controller.ts";

export default function InventoryRoute(
  props: { data: Record<CategoryId, InventoryItem> },
) {
  return (
    <Layout title="Kitchen Inventory - Closet">
      <Inventory data={props.data} />
    </Layout>
  );
}
