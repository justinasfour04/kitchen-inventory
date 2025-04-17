import { useState } from "preact/hooks";
import { InventoryItemWithCategoryAndShelf } from "@/lib/types.ts";

function ItemCard(
  { item, showTitle = false }: {
    item: InventoryItemWithCategoryAndShelf;
    showTitle?: boolean;
  },
) {
  return (
    <div>
      {showTitle && <h4 class="font-medium text-gray-900">{item.name}</h4>}
      {[
        { label: "Qty", value: item.quantity },
        { label: "Category", value: item.category?.name },
        { label: "Shelf", value: item.shelf?.name },
        { label: "Expiration Date", value: item.expiration_date },
        { label: "Unit", value: item.unit },
        { label: "Minimum Quantity", value: item.minimum_quantity },
        { label: "Barcode", value: item.barcode },
      ].map(({ label, value }) => (
        <p class="text-sm text-gray-600">
          {label}: {value}
        </p>
      ))}
    </div>
  );
}

const handleScroll = (el: HTMLDivElement) => {
  const leftButton = document.getElementById("scrollLeftButton");
  const rightButton = document.getElementById(
    "scrollRightButton",
  );

  if (leftButton) {
    leftButton.style.display = el.scrollLeft > 0 ? "block" : "none";
  }

  if (rightButton) {
    rightButton.style.display =
      el.scrollLeft < (el.scrollWidth - el.clientWidth - 10) ? "block" : "none";
  }
};

export default function InventoryModal(
  { items }: { items: InventoryItemWithCategoryAndShelf[] },
) {
  const [selectedItem, setSelectedItem] = useState<
    InventoryItemWithCategoryAndShelf | null
  >(null);

  return (
    <div>
      <div class="relative overflow-x-auto">
        <div
          id="inventoryScroller"
          class="flex gap-4 snap-x snap-mandatory overflow-x-auto pb-6 px-4"
          ref={(el) => {
            if (el) {
              // Add scroll event listener to update button visibility
              el.addEventListener("scroll", () => handleScroll(el));

              // Initial button visibility check
              setTimeout(() => handleScroll(el), 100);
            }
          }}
        >
          {items.map((item) => (
            <div
              key={item.barcode}
              onClick={() => setSelectedItem(item)}
              class="snap-center shrink-0 first:ml-0 cursor-pointer bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 border border-gray-200 w-[17rem]"
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
              <ItemCard item={item} showTitle />
            </div>
          ))}
        </div>
        <div
          id="scrollLeftButton"
          class="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-r-lg shadow-md hidden"
          onClick={() => {
            const scroller = document.getElementById("inventoryScroller");
            if (scroller) {
              scroller.scrollBy({ left: -300, behavior: "smooth" });
            }
          }}
        >
          <button class="text-gray-600 hover:text-gray-900">←</button>
        </div>
        <div
          id="scrollRightButton"
          class="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-l-lg shadow-md"
          onClick={() => {
            const scroller = document.getElementById("inventoryScroller");
            if (scroller) {
              scroller.scrollBy({ left: 300, behavior: "smooth" });
            }
          }}
        >
          <button class="text-gray-600 hover:text-gray-900">→</button>
        </div>
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
              <ItemCard item={selectedItem} showTitle={false} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
