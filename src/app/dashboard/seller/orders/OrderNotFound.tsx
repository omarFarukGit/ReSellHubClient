"use client";

import { useRouter } from "next/navigation";
import React from "react";

const OrderNotFound = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div
        className="
          w-full max-w-md
          rounded-3xl
          border
          border-gray-200
          bg-white
          p-10
          text-center
          shadow-lg
          transition-colors
          dark:border-gray-700
          dark:bg-gray-900
          dark:shadow-black/20
        "
      >
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div
            className="
              flex h-20 w-20
              items-center justify-center
              rounded-full
              bg-gray-100
              text-3xl
              dark:bg-gray-800
            "
          >
            📦
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          No Orders Yet
        </h2>

        {/* Description */}
        <p className="mt-3 text-gray-500 dark:text-gray-400">
          You haven't received any orders yet. Once buyers place orders, they
          will appear here.
        </p>

        {/* Button */}
        <button
          onClick={() => router.push("/dashboard/seller/my-products")}
          className="
            mt-6
            rounded-xl
            bg-black
            px-6
            py-3
            font-medium
            text-white
            transition
            hover:bg-gray-800
            focus:outline-none
            focus:ring-2
            focus:ring-gray-400
            dark:bg-white
            dark:text-gray-900
            dark:hover:bg-gray-200
            dark:focus:ring-gray-500
          "
        >
          View Products
        </button>
      </div>
    </div>
  );
};

export default OrderNotFound;