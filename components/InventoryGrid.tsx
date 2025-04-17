import { JSX } from "preact";
import InventoryModal from "@/islands/InventoryModal.tsx";
import { InventoryItemWithCategoryAndShelf } from "@/lib/types.ts";

export function InventoryGrid(
  { items }: { items: InventoryItemWithCategoryAndShelf[] },
): JSX.Element {
  return (
    <div>
      <div data-island="inventory-modal">
        <InventoryModal items={items} />
      </div>
    </div>
  );
}
