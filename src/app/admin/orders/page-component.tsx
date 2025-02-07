"use client";

import { OrdersWithProducts } from "./types";

type Props = {
  ordersWithProducts: OrdersWithProducts;
};

export default function PageComponent({}: Props) {
  return <div>Orders page</div>;
}
