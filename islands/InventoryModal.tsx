import { useState } from "preact/hooks";
import { type InventoryItem } from "../controllers/inventory/inventory.controller.ts";

interface InventoryModalProps {
  items: InventoryItem[];
}

export default function InventoryModal({ items }: InventoryModalProps) {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  return (
    <div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.barcode}
            onClick={() => setSelectedItem(item)}
            class="cursor-pointer bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 border border-gray-200"
          >
            <div class="aspect-square w-full bg-gray-100 rounded-md mb-2 flex items-center justify-center">
              {item.image
                ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    class="object-cover w-full h-full rounded-md"
                  />
                )
                : <div class="text-gray-400">No Image</div>}
            </div>
            <h4 class="font-medium text-gray-900">{item.name}</h4>
            <p class="text-sm text-gray-600">Qty: {item.quantity}</p>
          </div>
        ))}
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div class="bg-white rounded-lg p-6 max-w-md w-full">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-xl font-bold">{selectedItem.name}</h3>
              <button
                onClick={() => setSelectedItem(null)}
                class="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            {selectedItem.image && (
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                class="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <div class="space-y-2">
              <p class="font-medium">Quantity: {selectedItem.quantity}</p>
              <p class="text-gray-600">{selectedItem.name}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
