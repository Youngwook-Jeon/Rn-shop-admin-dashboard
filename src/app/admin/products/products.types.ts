import { Category } from "@/app/admin/categories/categories.types";

export type ProductWithCategory = {
  category: Category;
  created_at: string;
  hero_image: string;
  id: number;
  images_url: string[];
  max_quantity: number;
  price: number | null;
  slug: string;
  title: string;
};

export type ProductsWithCategoriesResponse = ProductWithCategory[];

export type UpdateProductSchema = {
  category: number;
  hero_image: string;
  images_url: string[];
  max_quantity: number;
  price: number;
  slug: string;
  title: string;
};
