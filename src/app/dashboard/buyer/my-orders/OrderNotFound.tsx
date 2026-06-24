import Link from "next/link";
import React from "react";

const OrderNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h2 className="text-2xl font-bold text-gray-800">No Orders Found</h2>

      <p className="mt-2 text-gray-500 max-w-md">
        You haven t placed any orders yet. Browse products and make your first
        purchase.
      </p>

      <Link
        href="/products"
        className="mt-6 rounded-lg bg-orange-500 px-6 py-3 text-white font-medium hover:bg-orange-600 transition"
      >
        Browse Products
      </Link>
    </div>
  );
};

export default OrderNotFound;
