"use client";

import { useRouter } from "next/navigation";
import React from "react";
import OrderNotFound from "./OrderNotFound";
import Image from "next/image";

type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";

interface Order {
  id: number;
  productName: string;
  buyerName: string;
  price: number;
  status: OrderStatus;
  date: string;
}

const statusBadge = (status: OrderStatus) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "shipped":
      return "bg-blue-100 text-blue-700";
    case "delivered":
      return "bg-green-100 text-green-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
  }
};

export default function SellerOrdersPage(orders) {
  console.log(orders, "ordr");
  const router = useRouter();

  if (!orders?.orders?.length) {
    return <OrderNotFound />;
  }
  return (
    <div className="p-6 md:p-10 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Seller Orders</h1>
        <p className="text-sm text-gray-500">
          Manage all incoming orders from buyers
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full min-w-[800px] text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Buyer</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.orders.map((order) => (
              <tr
                key={order.id}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* Product */}
                <td className="p-4 flex items-center gap-3">
                  <Image
                    src={order.productImage}
                    className="w-10 h-10 rounded object-cover"
                    alt={order.productName}
                    width={200}
                    height={200}
                  />
                  <span className="font-medium">{order.productName}</span>
                </td>

                {/* Buyer */}
                <td className="p-4 text-gray-600">{order.buyerInfo.name}</td>

                {/* Price */}
                <td className="p-4 font-semibold">৳ {order.price}</td>

                {/* Status */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge(
                      order.orderStatus,
                    )}`}
                  >
                    {order.orderStatus}
                  </span>
                </td>

                {/* Date */}

                <td className="p-4 text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                {/* Actions */}
                <td className="p-4 text-right">
                  <div
                    className="flex justify-end gap-3 text-xs"
                    onClick={() => router.push(`/products/${order.productId}`)}
                  >
                    <button className="text-blue-600 hover:underline">
                      View
                    </button>

                    {order.orderStatus === "pending" && (
                      <button className="text-green-600 hover:underline">
                        Accept
                      </button>
                    )}

                    {order.orderStatus === "shipped" && (
                      <button className="text-purple-600 hover:underline">
                        Mark Delivered
                      </button>
                    )}

                    {order.orderStatus !== "delivered" && (
                      <button className="text-red-600 hover:underline">
                        Cancel
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex justify-between text-xs text-gray-500">
        <span>Total Orders: {orders.length}</span>
        <span>Seller Dashboard</span>
      </div>
    </div>
  );
}
