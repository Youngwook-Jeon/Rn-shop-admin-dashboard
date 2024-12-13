import { Dispatch, SetStateAction } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { ProductWithCategory } from "@/app/admin/products/products.types";
import { CreateOrUpdateProductSchema } from "@/app/admin/products/schema";

type Props = {
  product: ProductWithCategory;
  setIsProductModalOpen: Dispatch<SetStateAction<boolean>>;
  setCurrentProduct: Dispatch<
    SetStateAction<CreateOrUpdateProductSchema | null>
  >;
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const ProductTableRow = ({
  product,
  setIsProductModalOpen,
  setCurrentProduct,
  setIsDeleteModalOpen,
}: Props) => {
  const handleEditClick = (product: CreateOrUpdateProductSchema) => {
    setCurrentProduct({
      title: product.title,
      category: product.category,
      price: product.price,
      max_quantity: product.max_quantity,
      hero_image: product.hero_image,
      images: product.images,
      slug: product.slug,
      intent: "update",
    });
    setIsProductModalOpen(true);
  };

  return (
    <TableRow key={product.id}>
      <TableCell>{product.title}</TableCell>
      <TableCell>{product.category.name}</TableCell>
      <TableCell>{product.price}</TableCell>
      <TableCell>{product.max_quantity}</TableCell>
      <TableCell>
        {product.hero_image && (
          <Image
            width={40}
            height={40}
            src={product.hero_image}
            alt="Hero"
            className="w-10 h-10 object-cover"
          />
        )}
      </TableCell>
      <TableCell>
        {product.images_url.map((url, index) => (
          <Image
            width={40}
            height={40}
            key={index}
            src={url}
            alt={`Product ${index + 1}`}
            className="w-10 h-10 object-cover inline-block mr-1"
          />
        ))}
      </TableCell>
      <TableCell>
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            handleEditClick({
              title: product.title,
              category: product.category.id.toString(),
              price: product.price?.toString() ?? "",
              max_quantity: product.max_quantity.toString(),
              images: [],
              slug: product.slug,
              intent: "update",
            })
          }
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setIsDeleteModalOpen(true);
            setCurrentProduct({
              title: product.title,
              category: product.category.id.toString(),
              price: product.price?.toString() ?? "",
              max_quantity: product.max_quantity.toString(),
              images: [],
              slug: product.slug,
              intent: "update",
            });
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};
