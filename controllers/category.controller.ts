import { Tables } from "@/db/types.ts";
import { getClient } from "@/db/index.ts";

export type CategoryId = Tables<"categories">["id"];
export type Category = {
  id: number;
  name: string;
  created_at: string | null;
  updated_at: string | null;
};

export class CategoryController {
  constructor() {}

  async getCategories(): Promise<Category[]> {
    const client = getClient();
    const { data: categories } = await client.from("categories")
      .select("*")
      .order("name", { ascending: true });

    return categories || [];
  }

  async addCategory(name: string): Promise<Category | null> {
    const client = getClient();
    const { data, error } = await client.from("categories")
      .insert({ name })
      .select()
      .single();

    if (error) {
      console.error("Failed to add category:", error);
      return null;
    }

    return data;
  }

  async deleteCategory(id: number): Promise<boolean> {
    const client = getClient();
    const { error } = await client.from("categories")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Failed to delete category:", error);
      return false;
    }

    return true;
  }
}
