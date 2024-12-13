"use server";

import slugify from "slugify";
import { revalidatePath } from "next/cache";

import { createClient } from "@/supabase/server";
import {
  ProductsWithCategoriesResponse,
  UpdateProductSchema,
} from "@/app/admin/products/products.types";
import { CreateProductSchemaServer } from "@/app/admin/products/schema";

const supabase = await createClient();

export const getProductsWithCategories =
  async (): Promise<ProductsWithCategoriesResponse> => {
    const { data, error } = await supabase
      .from("product")
      .select("*, category:category(*)")
      .returns<ProductsWithCategoriesResponse>();

    if (error) {
      throw new Error(`
        Error fetching products with categories: ${error.message}`);
    }

    return data || [];
  };

export const createProduct = async ({
  category,
  hero_image,
  images,
  max_quantity,
  price,
  title,
}: CreateProductSchemaServer) => {
  const slug = slugify(title, { lower: true });

  const { data, error } = await supabase.from("product").insert({
    category,
    hero_image,
    images_url: images,
    max_quantity,
    price,
    slug,
    title,
  });

  if (error) {
    throw new Error(`Error creating product: ${error.message}`);
  }

  revalidatePath("/admin/products");

  return data;
};

export const updateProduct = async ({
  category,
  hero_image,
  images_url,
  max_quantity,
  price,
  slug,
  title,
}: UpdateProductSchema) => {
  const { data, error } = await supabase
    .from("product")
    .update({
      category,
      hero_image,
      images_url,
      max_quantity,
      price,
      title,
    })
    .match({ slug });

  if (error) {
    throw new Error(`Error updating product: ${error.message}`);
  }

  revalidatePath("/admin/products");

  return data;
};

export const deleteProduct = async (slug: string) => {
  const { error } = await supabase.from("product").delete().match({ slug });

  if (error) {
    throw new Error(`Error deleting product: ${error.message}`);
  }

  revalidatePath("/admin/products");
};
