import React from "react";
import AdminProductPage from "./AdminProductPage";
import { getUserSession } from "@/lib/core/session";
import { authHeader } from "@/lib/core/server";

const page = async () => {
  const user = await getUserSession();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/all/products`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(await authHeader()),
      },
    },
  );

  const data = await res.json();
  const products = data.data;

  return (
    <div
      className="
        min-h-screen
        bg-gray-50
        transition-colors
        duration-300

        dark:bg-gray-950
      "
    >
      <AdminProductPage products={products} />
    </div>
  );
};

export default page;
