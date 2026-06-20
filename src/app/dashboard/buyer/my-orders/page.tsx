"use client";

import React from "react";

type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";

interface Order {
  id: number;
  productName: string;
  productImage: string;
  price: number;
  sellerName: string;
  status: OrderStatus;
  date: string;
}

const orders: Order[] = [
  {
    id: 1,
    productName: "iPhone 13 Pro",
    productImage:
      "https://images.unsplash.com/photo-1632661674596-79e4f1b6a3a7",
    price: 85000,
    sellerName: "Rakib Hasan",
    status: "pending",
    date: "2026-06-18",
  },
  {
    id: 2,
    productName: "MacBook Air M1",
    productImage:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    price: 95000,
    sellerName: "Mehedi Hasan",
    status: "shipped",
    date: "2026-06-17",
  },
  {
    id: 3,
    productName: "Nike Sneakers",
    productImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    price: 6500,
    sellerName: "Abu Bakar",
    status: "delivered",
    date: "2026-06-16",
  },
  {
    id: 4,
    productName: "Gaming Chair",
    productImage:
      "https://images.unsplash.com/photo-1616627982184-3f6c2d7c8a2e",
    price: 13500,
    sellerName: "Tanvir Ahmed",
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

export default function BuyerOrdersPage() {
  return (
    <div className="p-6 md:p-10 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">My Orders</h1>
        <p className="text-sm text-gray-500">
          Track all your purchased products
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm">
          {/* HEAD */}
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Seller</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* PRODUCT */}
                <td className="p-4 flex items-center gap-3">
                  <img
                    src={order.productImage}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <span className="font-medium">{order.productName}</span>
                </td>

                {/* SELLER */}
                <td className="p-4 text-gray-600">{order.sellerName}</td>

                {/* PRICE */}
                <td className="p-4 font-semibold">
                  ৳ {order.price.toLocaleString()}
                </td>

                {/* STATUS */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge(
                      order.status,
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>

                {/* DATE */}
                <td className="p-4 text-gray-600">{order.date}</td>

                {/* ACTIONS */}
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-3 text-xs">
                    <button className="text-blue-600 hover:underline">
                      View
                    </button>

                    {order.status === "pending" && (
                      <button className="text-red-600 hover:underline">
                        Cancel
                      </button>
                    )}

                    {order.status === "delivered" && (
                      <button className="text-green-600 hover:underline">
                        Review
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="flex justify-between text-xs text-gray-500">
        <span>Total Orders: {orders.length}</span>
        <span>Buyer Dashboard</span>
      </div>
    </div>
  );
}
