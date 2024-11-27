/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { PlusCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
// import { v4 as uuid } from 'uuid';

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
// import {
//   createCategory,
//   deleteCategory,
//   imageUploadHandler,
//   updateCategory,
// } from '@/actions/categories';
import { useRouter } from "next/navigation";
// import { toast } from 'sonner';

type Props = {
  categories: CategoriesWithProductsResponse;
};

const CategoriesPageComponent: FC<Props> = ({ categories }) => {
  return <>CategoriesPageComponent</>;
};

export default CategoriesPageComponent;
