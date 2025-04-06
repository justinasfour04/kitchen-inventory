import { Handlers } from "$fresh/server.ts";
import { CategoryController } from "@/controllers/category.controller.ts";

interface AddCategoryData {
  name: string;
}

export const handler: Handlers = {
  async GET(_req, _ctx) {
    try {
      const categoryController = new CategoryController();
      const categories = await categoryController.getCategories();
      return new Response(JSON.stringify(categories), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    } catch (err) {
      console.error("Error fetching categories:", err);
      return new Response(
        JSON.stringify({
          error: "Failed to fetch categories",
          message: err instanceof Error ? err.message : "Unknown error",
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 500,
        },
      );
    }
  },

  async POST(req, _ctx) {
    try {
      const data = await req.json() as AddCategoryData;

      if (!data.name || !data.name.trim()) {
        return new Response(
          JSON.stringify({ error: "Category name is required" }),
          {
            headers: { "Content-Type": "application/json" },
            status: 400,
          },
        );
      }

      const categoryController = new CategoryController();
      const newCategory = await categoryController.addCategory(
        data.name.trim(),
      );

      if (!newCategory) {
        return new Response(
          JSON.stringify({ error: "Failed to add category" }),
          {
            headers: { "Content-Type": "application/json" },
            status: 500,
          },
        );
      }

      return new Response(JSON.stringify(newCategory), {
        headers: { "Content-Type": "application/json" },
        status: 201,
      });
    } catch (err) {
      console.error("Error adding category:", err);
      return new Response(
        JSON.stringify({
          error: "Failed to add category",
          message: err instanceof Error ? err.message : "Unknown error",
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 500,
        },
      );
    }
  },

  async DELETE(req, _ctx) {
    try {
      const url = new URL(req.url);
      const id = url.searchParams.get("id");

      if (!id) {
        return new Response(
          JSON.stringify({ error: "Category ID is required" }),
          {
            headers: { "Content-Type": "application/json" },
            status: 400,
          },
        );
      }

      const categoryId = parseInt(id);
      if (isNaN(categoryId)) {
        return new Response(
          JSON.stringify({ error: "Invalid category ID" }),
          {
            headers: { "Content-Type": "application/json" },
            status: 400,
          },
        );
      }

      const categoryController = new CategoryController();
      const success = await categoryController.deleteCategory(categoryId);

      if (!success) {
        return new Response(
          JSON.stringify({ error: "Failed to delete category" }),
          {
            headers: { "Content-Type": "application/json" },
            status: 500,
          },
        );
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    } catch (err) {
      console.error("Error deleting category:", err);
      return new Response(
        JSON.stringify({
          error: "Failed to delete category",
          message: err instanceof Error ? err.message : "Unknown error",
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 500,
        },
      );
    }
  },
};
