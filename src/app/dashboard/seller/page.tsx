"use client";

import React from "react";

const stats = [
  {
    title: "Total Sales",
    value: 42,
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-50 dark:bg-green-950/30",
  },
  {
    title: "Revenue",
    value: "৳ 2,35,000",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    title: "Active Listings",
    value: 8,
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-950/30",
  },
  {
    title: "Pending Orders",
    value: 5,
    color: "text-yellow-600 dark:text-yellow-400",
    bg: "bg-yellow-50 dark:bg-yellow-950/30",
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
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400";

    case "shipped":
      return "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400";

    case "delivered":
      return "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400";

    default:
      return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
  }
};

export default function SellerOverviewPage() {
  return (
    <div className="min-h-screen space-y-8 bg-gray-50 p-6 text-gray-900 transition-colors md:p-10 dark:bg-gray-950 dark:text-gray-100">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Seller Overview</h1>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Welcome back! Heres your business summary
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className={`rounded-xl border border-gray-200 p-5 shadow-sm transition-colors dark:border-gray-800 ${s.bg}`}
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {s.title}
            </p>

            <h2 className={`mt-2 text-2xl font-bold ${s.color}`}>
              {s.value}
            </h2>
          </div>
        ))}
      </div>

      {/* MAIN SECTION */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Orders */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-colors lg:col-span-2 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 font-semibold">Recent Orders</h2>

          <div className="space-y-4">
            {recentOrders.map((order, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b border-gray-200 pb-3 dark:border-gray-800"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {order.product}
                  </p>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {order.buyer}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${statusBadge(
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
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 font-semibold">Quick Actions</h2>

          <div className="space-y-3">
            <button className="w-full rounded-lg bg-blue-600 py-2 text-white transition hover:bg-blue-700">
              Add Product
            </button>

            <button className="w-full rounded-lg bg-green-600 py-2 text-white transition hover:bg-green-700">
              View Orders
            </button>

            <button className="w-full rounded-lg bg-purple-600 py-2 text-white transition hover:bg-purple-700">
              View Analytics
            </button>

            <button className="w-full rounded-lg bg-gray-800 py-2 text-white transition hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600">
              Manage Profile
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM INSIGHT */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-3 font-semibold">Performance Insight</h2>

        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <p>
            🚀 Your sales increased by{" "}
            <b className="text-gray-900 dark:text-gray-100">18%</b> this week.
          </p>

          <p>
            📈 Top category:{" "}
            <b className="text-gray-900 dark:text-gray-100">Electronics</b>
          </p>

          <p>
            ⚡ Fastest selling item:{" "}
            <b className="text-gray-900 dark:text-gray-100">
              iPhone 13 Pro
            </b>
          </p>

          <p>
            💡 Suggestion: Add more fashion products to boost revenue.
          </p>
        </div>
      </div>
    </div>
  );
}