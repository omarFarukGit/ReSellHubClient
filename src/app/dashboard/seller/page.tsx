"use client";

import React from "react";

const stats = [
  {
    title: "Total Sales",
    value: 42,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    title: "Revenue",
    value: "৳ 2,35,000",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Active Listings",
    value: 8,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    title: "Pending Orders",
    value: 5,
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
];

const recentOrders = [
  { product: "iPhone 13 Pro", buyer: "Rakib Hasan", status: "pending" },
  { product: "MacBook Air M1", buyer: "Mehedi Hasan", status: "shipped" },
  { product: "Nike Shoes", buyer: "Abu Bakar", status: "delivered" },
];

const statusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "shipped":
      return "bg-blue-100 text-blue-700";
    case "delivered":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export default function SellerOverviewPage() {
  return (
    <div className="p-6 md:p-10 space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Seller Overview</h1>
        <p className="text-sm text-gray-500">
          Welcome back! Heres your business summary
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className={`p-5 rounded-xl shadow border ${s.bg}`}>
            <p className="text-sm text-gray-500">{s.title}</p>
            <h2 className={`text-2xl font-bold mt-2 ${s.color}`}>{s.value}</h2>
          </div>
        ))}
      </div>

      {/* MAIN SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Recent Orders</h2>

          <div className="space-y-4">
            {recentOrders.map((order, i) => (
              <div
                key={i}
                className="flex justify-between items-center border-b pb-3"
              >
                <div>
                  <p className="font-medium">{order.product}</p>
                  <p className="text-xs text-gray-500">{order.buyer}</p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge(
                    order.status,
                  )}`}
                >
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Quick Actions</h2>

          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
              Add Product
            </button>

            <button className="w-full bg-green-600 text-white py-2 rounded-lg">
              View Orders
            </button>

            <button className="w-full bg-purple-600 text-white py-2 rounded-lg">
              View Analytics
            </button>

            <button className="w-full bg-gray-800 text-white py-2 rounded-lg">
              Manage Profile
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM INSIGHT */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-semibold mb-3">Performance Insight</h2>

        <div className="text-sm text-gray-600 space-y-2">
          <p>
            🚀 Your sales increased by <b>18%</b> this week.
          </p>
          <p>
            📈 Top category: <b>Electronics</b>
          </p>
          <p>
            ⚡ Fastest selling item: <b>iPhone 13 Pro</b>
          </p>
          <p>💡 Suggestion: Add more fashion products to boost revenue.</p>
        </div>
      </div>
    </div>
  );
}
