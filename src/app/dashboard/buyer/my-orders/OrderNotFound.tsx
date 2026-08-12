import Link from "next/link";
import React from "react";

const OrderNotFound = () => {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center py-20 text-center bg-gray-50 dark:bg-gray-950 transition-colors">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        No Orders Found
      </h2>

      <p className="mt-2 max-w-md text-gray-500 dark:text-gray-400">
        You haven&apos;t placed any orders yet. Browse products and make your
        first purchase.
      </p>

      <Link
        href="/products"
        className="mt-6 rounded-lg bg-orange-500 px-6 py-3 font-medium text-white transition hover:bg-orange-600"
      >
        Browse Products
      </Link>
    </div>
  );
};

export default OrderNotFound;
