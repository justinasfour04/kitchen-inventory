import { useEffect, useState } from "preact/hooks";

import {
  Category,
  CategoryController,
} from "@/controllers/category.controller.ts";
import {
  InventoryItem,
} from "@/controllers/inventory.controller.ts";
import CategoryForm from "@/islands/CategoryForm.tsx";
import DeleteCategoryButton from "@/islands/DeleteCategoryButton.tsx";

export type InventoryData = {
  inventory: Record<string, InventoryItem>;
  categories: Category[];
}

export default function Inventory(
  { data }: { data: InventoryData },
) {
  const [isCategoryAdded, setIsCategoryAdded] = useState(false);
  const [isCategoryDeleted, setIsCategoryDeleted] = useState(false);
  const [categories, setCategories] = useState<Category[]>(data.categories);

  useEffect(() => {
    void (async () => {
      if (isCategoryAdded) {
        setIsCategoryAdded(false);
      }

      if (isCategoryDeleted) {
        setIsCategoryDeleted(false);
      }

      const response = await fetch("/api/categories");
      const categories = await response.json();
      setCategories(categories);
    })();
  }, [isCategoryAdded, isCategoryDeleted]);

  return (
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Inventory</h1>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-2">
          <div class="bg-white shadow rounded-lg p-6">
            <h2 class="text-xl font-semibold text-gray-700 mb-4">Items</h2>
            {data.inventory && Object.entries(data.inventory).length > 0
              ? (
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(data.inventory).map(([barcode, item]) => (
                    <div key={barcode} class="bg-gray-50 p-4 rounded-md">
                      <h3 class="font-medium text-lg text-gray-800">
                        {item.name}
                      </h3>
                      <p class="text-gray-600">Quantity: {item.quantity}</p>
                      {item.category_id && (
                        <p class="text-gray-600">
                          Category: {data.categories.find((c) =>
                            c.id === item.category_id
                          )?.name || "Unknown"}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )
              : <p class="text-gray-500">No inventory items found.</p>}
          </div>
        </div>

        <div>
          <div class="bg-white shadow rounded-lg mb-6">
            <div class="p-6">
              <h2 class="text-xl font-semibold text-gray-700 mb-4">
                Categories
              </h2>
              {categories && categories.length > 0
                ? (
                  <ul class="space-y-2">
                    {categories.map((category) => (
                      <li
                        key={category.id}
                        class="px-3 py-2 bg-gray-50 rounded-md flex justify-between items-center"
                      >
                        <span>{category.name}</span>
                        <DeleteCategoryButton
                          categoryId={category.id}
                          onSuccess={() => {
                            setIsCategoryDeleted(true);
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                )
                : <p class="text-gray-500">No categories found.</p>}
            </div>
          </div>

          <CategoryForm onSuccess={() => {
            setIsCategoryAdded(true);
          }}/>
        </div>
      </div>
    </div>
  );
}
