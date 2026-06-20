"use client";

import React from "react";

const cards = [
  {
    title: "Total Users",
    value: 245,
    change: "+12%",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Total Products",
    value: 128,
    change: "+8%",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    title: "Total Orders",
    value: 54,
    change: "+5%",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    title: "Revenue",
    value: "৳ 3,25,000",
    change: "+15%",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
];

const recentOrders = [
  {
    id: 1,
    product: "iPhone 13 Pro",
    buyer: "Rakib Hasan",
    status: "pending",
  },
  {
    id: 2,
    product: "MacBook Air M1",
    buyer: "Mehedi Hasan",
    status: "shipped",
  },
  {
    id: 3,
    product: "Nike Sneakers",
    buyer: "Abu Bakar",
    status: "delivered",
  },
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

export default function AdminOverviewPage() {
  return (
    <div className="p-6 md:p-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Admin Overview</h1>
        <p className="text-sm text-gray-500">
          Quick summary of your marketplace
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c, i) => (
          <div key={i} className={`p-5 rounded-xl shadow border ${c.bg}`}>
            <p className="text-sm text-gray-500">{c.title}</p>
            <h2 className={`text-2xl font-bold mt-2 ${c.color}`}>{c.value}</h2>
            <p className="text-xs text-gray-500 mt-1">Growth: {c.change}</p>
          </div>
        ))}
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Recent Orders</h2>

          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between border-b pb-3"
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

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Quick Actions</h2>

          <div className="space-y-3 text-sm">
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
              Add Product
            </button>

            <button className="w-full bg-green-600 text-white py-2 rounded-lg">
              Approve Listings
            </button>

            <button className="w-full bg-purple-600 text-white py-2 rounded-lg">
              View Orders
            </button>

            <button className="w-full bg-gray-800 text-white py-2 rounded-lg">
              View Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Status */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-semibold mb-4">System Status</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-green-700 font-medium">Server</p>
            <p className="text-green-600 text-xs">Running Smooth</p>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-700 font-medium">Database</p>
            <p className="text-blue-600 text-xs">Connected</p>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg">
            <p className="text-yellow-700 font-medium">API</p>
            <p className="text-yellow-600 text-xs">Stable</p>
          </div>
        </div>
      </div>
    </div>
  );
}
