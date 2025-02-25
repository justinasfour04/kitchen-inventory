import { JSX } from "preact";
import InventoryModal from "../islands/InventoryModal.tsx";

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  description: string;
  imageUrl?: string;
}

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
