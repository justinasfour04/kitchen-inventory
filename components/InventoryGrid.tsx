import { JSX } from "preact";
import InventoryModal from "@/islands/InventoryModal.tsx";
import { InventoryItem } from "@/controllers/inventory.controller.ts";

interface InventoryGridProps {
  items: InventoryItem[];
}

export function InventoryGrid({ items }: InventoryGridProps): JSX.Element {
  return (
    <div>
      <div data-island="inventory-modal">
        <InventoryModal items={items} />
      </div>
    </div>
  );
}
