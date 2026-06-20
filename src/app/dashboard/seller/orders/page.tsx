"use client";

import React from "react";

type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";

interface Order {
  id: number;
  productName: string;
  buyerName: string;
  price: number;
  status: OrderStatus;
  date: string;
}

const orders: Order[] = [
  {
    id: 1,
    productName: "iPhone 13 Pro",
    buyerName: "Rakib Hasan",
    price: 85000,
    status: "pending",
    date: "2026-06-18",
  },
  {
    id: 2,
    productName: "MacBook Air M1",
    buyerName: "Mehedi Hasan",
    price: 95000,
    status: "shipped",
    date: "2026-06-17",
  },
  {
    id: 3,
    productName: "Nike Sneakers",
    buyerName: "Abu Bakar",
    price: 6500,
    status: "delivered",
    date: "2026-06-16",
  },
  {
    id: 4,
    productName: "Gaming Chair",
    buyerName: "Tanvir Ahmed",
    price: 13500,
    status: "cancelled",
    date: "2026-06-15",
  },
];

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

export default function SellerOrdersPage() {
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
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* Product */}
                <td className="p-4 font-medium">{order.productName}</td>

                {/* Buyer */}
                <td className="p-4 text-gray-600">{order.buyerName}</td>

                {/* Price */}
                <td className="p-4 font-semibold">
                  ৳ {order.price.toLocaleString()}
                </td>

                {/* Status */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge(
                      order.status,
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>

                {/* Date */}
                <td className="p-4 text-gray-600">{order.date}</td>

                {/* Actions */}
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-3 text-xs">
                    <button className="text-blue-600 hover:underline">
                      View
                    </button>

                    {order.status === "pending" && (
                      <button className="text-green-600 hover:underline">
                        Accept
                      </button>
                    )}

                    {order.status === "shipped" && (
                      <button className="text-purple-600 hover:underline">
                        Mark Delivered
                      </button>
                    )}

                    {order.status !== "delivered" && (
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
