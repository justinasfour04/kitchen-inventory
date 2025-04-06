/** @jsxImportSource preact */
import { useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";

interface DeleteCategoryButtonProps {
  categoryId: number;
  onSuccess?: () => Promise<void>;
}

export default function DeleteCategoryButton(
  { categoryId, onSuccess }: DeleteCategoryButtonProps,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/categories?id=${categoryId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete category");
      }

      setShowConfirmation(false);

      if (onSuccess) {
        await onSuccess();
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while deleting the category",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const openConfirmation = () => {
    setShowConfirmation(true);
    setError(null);
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
    setError(null);
  };

  if (!IS_BROWSER) {
    return null;
  }

  return (
    <>
      <button
        onClick={openConfirmation}
        class="text-red-600 hover:text-red-800 transition-colors ml-2"
        aria-label="Delete category"
        disabled={isLoading}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>

      {showConfirmation && (
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div class="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div class="p-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">
                Delete Category
              </h3>
              <p class="text-gray-600 mb-4">
                Are you sure you want to delete this category? This action
                cannot be undone.
              </p>

              {error && (
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 relative">
                  {error}
                </div>
              )}

              <div class="flex justify-end space-x-3">
                <button
                  onClick={closeConfirmation}
                  class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 font-medium"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  class="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
