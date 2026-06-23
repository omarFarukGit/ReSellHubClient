import React from "react";
import AdminProductPage from "./AdminProductPage";
import { getUserSession } from "@/lib/core/session";

const page = async () => {
  const user = await getUserSession();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/all/products`,
  );
  const data = await res.json();
  const products = data.data;
  return (
    <div>
      <AdminProductPage products={products} />
    </div>
  );
};

export default page;
