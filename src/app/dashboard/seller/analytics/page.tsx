"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const stats = [
  {
    title: "Total Sales",
    value: 32,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    title: "Revenue",
    value: "৳ 1,25,000",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Active Listings",
    value: 12,
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

const salesData = [
  { name: "Mon", sales: 3 },
  { name: "Tue", sales: 5 },
  { name: "Wed", sales: 2 },
  { name: "Thu", sales: 6 },
  { name: "Fri", sales: 4 },
  { name: "Sat", sales: 7 },
  { name: "Sun", sales: 5 },
];

const revenueData = [
  { name: "Week 1", revenue: 20000 },
  { name: "Week 2", revenue: 30000 },
  { name: "Week 3", revenue: 25000 },
  { name: "Week 4", revenue: 50000 },
];

const topProducts = [
  { name: "iPhone 13 Pro", sales: 10 },
  { name: "MacBook Air", sales: 7 },
  { name: "Nike Shoes", sales: 9 },
  { name: "Headphones", sales: 6 },
];

export default function SellerAnalyticsPage() {
  return (
    <div className="p-6 md:p-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Seller Analytics</h1>
        <p className="text-sm text-gray-500">
          Track your performance and sales growth
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className={`p-5 rounded-xl shadow border ${s.bg}`}>
            <p className="text-sm text-gray-500">{s.title}</p>
            <h2 className={`text-2xl font-bold mt-2 ${s.color}`}>{s.value}</h2>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Weekly Sales</h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#22c55e"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Revenue Growth</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Products */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Top Products</h2>

          <div className="space-y-3">
            {topProducts.map((p, i) => (
              <div
                key={i}
                className="flex justify-between border-b pb-2 text-sm"
              >
                <span>{p.name}</span>
                <span className="font-medium">{p.sales} sold</span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Insight */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Performance Insight</h2>

          <div className="space-y-4 text-sm text-gray-600">
            <p>
              🚀 Your sales increased by <b>18%</b> this week compared to last
              week.
            </p>
            <p>
              📈 Best performing category is <b>Electronics</b>.
            </p>
            <p>
              💡 Try boosting listings for <b>Fashion</b> products to increase
              sales.
            </p>
            <p>
              ⚡ Fastest selling product: <b>iPhone 13 Pro</b>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
