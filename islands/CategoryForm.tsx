/** @jsxImportSource preact */
import { useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";

interface CategoryFormProps {
  onSuccess?: () => void;
}

export default function CategoryForm({ onSuccess }: CategoryFormProps) {
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      setError("Category name is required");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: categoryName.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add category");
      }

      setCategoryName("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 1000);

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while adding the category",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!IS_BROWSER) {
    return <div class="loading">Loading...</div>;
  }

  return (
    <div class="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Add New Category</h2>

      {success && (
        <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 relative">
          Category added successfully!
        </div>
      )}

      {error && (
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 relative">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} class="space-y-4">
        <div>
          <label
            for="categoryName"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Category Name
          </label>
          <input
            id="categoryName"
            type="text"
            value={categoryName}
            onInput={(e) =>
              setCategoryName((e.target as HTMLInputElement).value)}
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter category name"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          class={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
            ${isLoading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"}
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          {isLoading ? "Adding..." : "Add Category"}
        </button>
      </form>
    </div>
  );
}
