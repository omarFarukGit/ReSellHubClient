"use client";
import { useRouter } from "next/navigation";
import React from "react";

const OrderNotFound = () => {
  const router = useRouter();
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-lg">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
            📦
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900">No Orders Yet</h2>

        <p className="mt-3 text-gray-500">
          You haven't received any orders yet. Once buyers place orders, they
          will appear here.
        </p>

        <button
          onClick={() => router.push("/dashboard/seller/my-products")}
          className="mt-6 rounded-xl bg-black px-6 py-3 font-medium text-white transition hover:opacity-90"
        >
          View Products
        </button>
      </div>
    </div>
  );
};

export default OrderNotFound;
