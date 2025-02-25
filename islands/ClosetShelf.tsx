import { useState } from "preact/hooks";
import { InventoryGrid, InventoryItem } from "../components/InventoryGrid.tsx";

interface ShelfData {
  id: number;
  name: string;
  items: InventoryItem[];
}

interface ClosetShelfProps {
  shelves: ShelfData[];
}

export default function ClosetShelf({ shelves }: ClosetShelfProps) {
  const [selectedShelf, setSelectedShelf] = useState<number | null>(null);

  return (
    <div>
      {/* Closet structure */}
      <div class="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200">
        <div class="grid grid-cols-1 gap-4">
          {shelves.map((shelf) => (
            <button
              key={shelf.id}
              onClick={() => setSelectedShelf(shelf.id)}
              class={`h-24 border-2 rounded-lg transition-all ${
                selectedShelf === shelf.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-blue-300 hover:bg-gray-50"
              }`}
            >
              <div class="flex items-center justify-center h-full">
                <span class="text-lg font-medium">{shelf.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected shelf inventory */}
      {selectedShelf && (
        <div class="mt-6">
          <h3 class="text-xl font-semibold mb-4">
            {shelves.find((s) => s.id === selectedShelf)?.name} Contents
          </h3>
          <InventoryGrid
            items={shelves.find((s) => s.id === selectedShelf)?.items || []}
          />
        </div>
      )}
    </div>
  );
}
