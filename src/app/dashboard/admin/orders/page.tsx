"use client";

import { useState } from "react";
import Link from "next/link";

type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";

interface Order {
  id: number;
  productName: string;
  productImage: string;
  price: number;
  buyerName: string;
  location: string;
  status: OrderStatus;
  date: string;
}

const dummyOrders: Order[] = [
  {
    id: 1,
    productName: "iPhone 13 Pro",
    productImage:
      "https://images.unsplash.com/photo-1632661674596-79e4f1b6a3a7",
    price: 85000,
    buyerName: "Rakib Hasan",
    location: "Dhaka",
    status: "pending",
    date: "2026-06-18",
  },
  {
    id: 2,
    productName: "MacBook Air M1",
    productImage:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    price: 95000,
    buyerName: "Mehedi Hasan",
    location: "Chattogram",
    status: "shipped",
    date: "2026-06-17",
  },
  {
    id: 3,
    productName: "Nike Sneakers",
    productImage:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    price: 6500,
    buyerName: "Abu Bakar",
    location: "Sylhet",
    status: "delivered",
    date: "2026-06-16",
  },
  {
    id: 4,
    productName: "Gaming Chair",
    productImage:
      "https://images.unsplash.com/photo-1616627982184-3f6c2d7c8a2e",
    price: 13500,
    buyerName: "Tanvir Ahmed",
    location: "Khulna",
    status: "cancelled",
    date: "2026-06-15",
  },
];

const statusColor = (status: OrderStatus) => {
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

export default function OrdersPage() {
  const [orders] = useState(dummyOrders);

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full min-w-[800px]">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Buyer</th>
              <th className="p-4">Location</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t hover:bg-gray-50">
                {/* Product */}
                <td className="p-4 flex items-center gap-3">
                  <img
                    src={order.productImage}
                    alt={order.productName}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <span className="font-medium">{order.productName}</span>
                </td>

                {/* Buyer */}
                <td className="p-4">{order.buyerName}</td>

                {/* Location */}
                <td className="p-4">{order.location}</td>

                {/* Price */}
                <td className="p-4 font-semibold">
                  ৳ {order.price.toLocaleString()}
                </td>

                {/* Status */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>

                {/* Date */}
                <td className="p-4">{order.date}</td>

                {/* Action */}
                <td className="p-4">
                  <Link
                    href={`/orders/${order.id}`}
                    className="text-orange-600 font-medium hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}