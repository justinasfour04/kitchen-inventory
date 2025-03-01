import { useState } from "preact/hooks";
import { InventoryGrid } from "../components/InventoryGrid.tsx";
import { ShelfWithItems } from "../controllers/shelves/shelves.controller.ts";
import BarcodeScanner from "./BarcodeScanner.tsx";

interface ClosetShelfProps {
  shelves: ShelfWithItems[];
}

export default function ClosetShelf({ shelves }: ClosetShelfProps) {
  const [selectedShelf, setSelectedShelf] = useState<number | null>(null);
  const [view, setView] = useState<"options" | "items">("options");
  const [barcodeInput, setBarcodeInput] = useState("");
  const [showNewItemForm, setShowNewItemForm] = useState(false);
  const [_searchStatus, setSearchStatus] = useState<
    "idle" | "not_found" | "found"
  >("idle");
  const [showScanner, setShowScanner] = useState(false);

  const handleShelfClick = (shelfId: number) => {
    if (selectedShelf === shelfId) {
      // If clicking the same shelf, toggle selection off
      setSelectedShelf(null);
    } else {
      // Select the new shelf and show options
      setSelectedShelf(shelfId);
      setView("options");
      // Reset form states
      setBarcodeInput("");
      setShowNewItemForm(false);
      setSearchStatus("idle");
    }
  };

  const handleBarcodeSearch = (e: Event) => {
    e.preventDefault();
    if (!barcodeInput.trim()) return;

    try {
      // Simulate a search - in a real app, this would be an API call
      // For now, we'll just set the status to not_found to show the new item form
      setSearchStatus("not_found");
      setShowNewItemForm(true);
    } catch (error) {
      console.error("Error searching for barcode:", error);
    }
  };

  const handleBarcodeDetected = (barcode: string) => {
    console.log("Barcode detected:", barcode);
    setBarcodeInput(barcode);
    setShowScanner(false);

    // Automatically trigger the search after a short delay
    setTimeout(() => {
      setSearchStatus("not_found");
      setShowNewItemForm(true);
    }, 500);
  };

  const selectedShelfData = shelves.find((s) => s.id === selectedShelf);

  return (
    <div>
      {/* Closet structure */}
      <div class="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200">
        <div class="grid grid-cols-1 gap-4">
          {shelves.map((shelf) => (
            <button
              key={shelf.id}
              onClick={() => handleShelfClick(shelf.id)}
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

      {/* Selected shelf actions and content */}
      {selectedShelf && selectedShelfData && (
        <div class="mt-6 bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200">
          <h3 class="text-xl font-semibold mb-4">{selectedShelfData.name}</h3>

          {view === "options"
            ? (
              <div class="flex flex-col gap-4">
                <div class="flex justify-between items-center">
                  <span class="text-gray-700">
                    {selectedShelfData.items.length} items in this shelf
                  </span>
                  <div class="flex gap-2">
                    <button
                      onClick={() => setView("items")}
                      class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={selectedShelfData.items.length === 0}
                    >
                      View Items
                    </button>
                  </div>
                </div>

                {/* Add item section */}
                <div class="mt-4 pt-4 border-t border-gray-200">
                  <h4 class="text-lg font-medium mb-3">
                    Add Item to {selectedShelfData.name}
                  </h4>

                  {/* Barcode search form */}
                  <div class="mb-4">
                    <form onSubmit={handleBarcodeSearch} class="flex gap-2">
                      <input
                        type="text"
                        value={barcodeInput}
                        onInput={(e) =>
                          setBarcodeInput((e.target as HTMLInputElement).value)}
                        placeholder="Enter barcode"
                        class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => setShowScanner(true)}
                        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z"
                            clip-rule="evenodd"
                          />
                          <path d="M11 4a1 1 0 10-2 0v1a1 1 0 002 0V4zM10 7a1 1 0 011 1v1h2a1 1 0 110 2h-3a1 1 0 01-1-1V8a1 1 0 011-1zM16 9a1 1 0 100 2 1 1 0 000-2zM9 13a1 1 0 011-1h1a1 1 0 110 2v2a1 1 0 11-2 0v-3zM7 11a1 1 0 100-2H4a1 1 0 100 2h3zM17 13a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zM16 17a1 1 0 100-2h-3a1 1 0 100 2h3z" />
                        </svg>
                      </button>
                      <button
                        type="submit"
                        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Search
                      </button>
                    </form>
                  </div>

                  {/* New item form */}
                  {showNewItemForm && (
                    <div class="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                      <p class="mb-3 text-sm text-yellow-800">
                        Item with barcode "{barcodeInput}" not found. Create a
                        new item:
                      </p>
                      <form method="post" class="space-y-4">
                        <div>
                          <label
                            for="itemName"
                            class="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Item Name
                          </label>
                          <input
                            type="text"
                            id="itemName"
                            name="itemName"
                            placeholder="Enter item name"
                            required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                          <div>
                            <label
                              for="quantity"
                              class="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Quantity
                            </label>
                            <input
                              type="number"
                              id="quantity"
                              name="quantity"
                              min="1"
                              defaultValue="1"
                              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label
                              for="unit"
                              class="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Unit
                            </label>
                            <input
                              type="text"
                              id="unit"
                              name="unit"
                              placeholder="item, box, etc."
                              defaultValue="item"
                              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label
                              for="expirationDate"
                              class="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Expiration Date
                            </label>
                            <input
                              type="date"
                              id="expirationDate"
                              name="expirationDate"
                              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>

                        <input type="hidden" name="action" value="addItem" />
                        <input
                          type="hidden"
                          name="barcode"
                          value={barcodeInput}
                        />
                        <input
                          type="hidden"
                          name="shelfId"
                          value={selectedShelf}
                        />

                        <div class="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setShowNewItemForm(false)}
                            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                          >
                            Create & Add
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Direct barcode submission (when not creating a new item) */}
                  {!showNewItemForm && (
                    <form method="post" class="space-y-4">
                      <div>
                        <label
                          for="barcode"
                          class="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Scan Barcode
                        </label>
                        <input
                          type="text"
                          id="barcode"
                          name="barcode"
                          placeholder="Scan or enter barcode"
                          required
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <input type="hidden" name="action" value="addItem" />
                      <input
                        type="hidden"
                        name="shelfId"
                        value={selectedShelf}
                      />
                      <button
                        type="submit"
                        class="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        Add Item
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )
            : (
              <div>
                <div class="mb-4">
                  <button
                    onClick={() => setView("options")}
                    class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    ← Back to Options
                  </button>
                </div>
                <InventoryGrid items={selectedShelfData.items} />
              </div>
            )}
        </div>
      )}

      {/* Barcode Scanner Modal */}
      {showScanner && (
        <BarcodeScanner
          onBarcodeDetected={handleBarcodeDetected}
          onClose={() => setShowScanner(false)}
        />
      )}
    </div>
  );
}
