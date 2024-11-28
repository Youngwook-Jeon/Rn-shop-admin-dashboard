/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { PlusCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { CategoryTableRow } from "@/components/category";
import {
  createCategorySchema,
  CreateCategorySchema,
} from "@/app/admin/categories/create-category.schema";
import { CategoriesWithProductsResponse } from "@/app/admin/categories/categories.types";
import { CategoryForm } from "@/app/admin/categories/category-form";
import { createCategory, imageUploadHandler } from "@/actions/categories";
import { toast } from "sonner";

type Props = {
  categories: CategoriesWithProductsResponse;
};

const CategoriesPageComponent: FC<Props> = ({ categories }) => {
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] =
    useState(false);
  const [currentCategory, setCurrentCategory] =
    useState<CreateCategorySchema | null>(null);

  const form = useForm<CreateCategorySchema>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      image: undefined,
    },
  });

  const router = useRouter();

  const submitCategoryHandler: SubmitHandler<CreateCategorySchema> = async (
    data
  ) => {
    const uniqueId = uuid();
    const fileName = `category/category-${uniqueId}`;
    const file = new File([data.image[0]], fileName);
    const formData = new FormData();
    formData.append("file", file);

    const image_url = await imageUploadHandler(formData);

    if (image_url) {
      await createCategory({ image_url, name: data.name });
      form.reset();
      router.refresh();
      toast.success("Category created successfully");
    }
  };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="flex items-center my-10">
        <div className="ml-auto flex items-center gap-2">
          <Dialog
            open={isCreateCategoryModalOpen}
            onOpenChange={() =>
              setIsCreateCategoryModalOpen(!isCreateCategoryModalOpen)
            }
          >
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="h-8 gap-1"
                onClick={() => {
                  setCurrentCategory(null);
                  setIsCreateCategoryModalOpen(true);
                }}
              >
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Category
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Category</DialogTitle>
              </DialogHeader>
              <CategoryForm
                form={form}
                onSubmit={submitCategoryHandler}
                defaultValues={currentCategory}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="overflow-x-auto">
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>

        <CardContent>
          <Table className="min-w-[600px]">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="md:table-cell">Created at</TableHead>
                <TableHead className="md:table-cell">Products</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <CategoryTableRow
                  key={category.id}
                  category={category}
                  setCurrentCategory={setCurrentCategory}
                  setIsCreateCategoryModalOpen={setIsCreateCategoryModalOpen}
                  //   deleteCategoryHandler={deleteCategoryHandler}
                />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
};

export default CategoriesPageComponent;
