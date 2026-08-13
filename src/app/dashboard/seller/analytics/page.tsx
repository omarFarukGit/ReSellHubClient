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
  CartesianGrid,
} from "recharts";

const stats = [
  {
    title: "Total Sales",
    value: 32,
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-50 dark:bg-green-950/40",
    border: "border-green-100 dark:border-green-900",
  },
  {
    title: "Revenue",
    value: "৳ 1,25,000",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    border: "border-blue-100 dark:border-blue-900",
  },
  {
    title: "Active Listings",
    value: 12,
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-950/40",
    border: "border-purple-100 dark:border-purple-900",
  },
  {
    title: "Pending Orders",
    value: 5,
    color: "text-yellow-600 dark:text-yellow-400",
    bg: "bg-yellow-50 dark:bg-yellow-950/40",
    border: "border-yellow-100 dark:border-yellow-900",
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
    <div className="min-h-screen space-y-8 bg-zinc-50 p-6 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 md:p-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Seller Analytics</h1>

        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Track your performance and sales growth
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.title}
            className={`rounded-xl border p-5 shadow-sm transition hover:shadow-md ${s.bg} ${s.border}`}
          >
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {s.title}
            </p>

            <h2 className={`mt-2 text-2xl font-bold ${s.color}`}>
              {s.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Sales Chart */}
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 font-semibold text-zinc-900 dark:text-zinc-100">
            Weekly Sales
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-zinc-200 dark:stroke-zinc-700"
              />

              <XAxis
                dataKey="name"
                tick={{ fill: "currentColor" }}
                className="text-zinc-500 dark:text-zinc-400"
              />

              <YAxis
                tick={{ fill: "currentColor" }}
                className="text-zinc-500 dark:text-zinc-400"
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--tooltip-bg)",
                  borderRadius: "8px",
                  border: "1px solid var(--tooltip-border)",
                  color: "var(--tooltip-text)",
                }}
              />

              <Line
                type="monotone"
                dataKey="sales"
                stroke="#22c55e"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 lg:col-span-2">
          <h2 className="mb-4 font-semibold text-zinc-900 dark:text-zinc-100">
            Revenue Growth
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-zinc-200 dark:stroke-zinc-700"
              />

              <XAxis
                dataKey="name"
                tick={{ fill: "currentColor" }}
                className="text-zinc-500 dark:text-zinc-400"
              />

              <YAxis
                tick={{ fill: "currentColor" }}
                className="text-zinc-500 dark:text-zinc-400"
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--tooltip-bg)",
                  borderRadius: "8px",
                  border: "1px solid var(--tooltip-border)",
                  color: "var(--tooltip-text)",
                }}
              />

              <Bar
                dataKey="revenue"
                fill="#3b82f6"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Top Products */}
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 font-semibold text-zinc-900 dark:text-zinc-100">
            Top Products
          </h2>

          <div className="space-y-3">
            {topProducts.map((p) => (
              <div
                key={p.name}
                className="flex justify-between border-b border-zinc-200 pb-2 text-sm last:border-0 dark:border-zinc-700"
              >
                <span className="text-zinc-700 dark:text-zinc-300">
                  {p.name}
                </span>

                <span className="font-medium text-zinc-900 dark:text-zinc-100">
                  {p.sales} sold
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Insight */}
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 lg:col-span-2">
          <h2 className="mb-4 font-semibold text-zinc-900 dark:text-zinc-100">
            Performance Insight
          </h2>

          <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
            <p>
              🚀 Your sales increased by{" "}
              <b className="text-zinc-900 dark:text-zinc-100">18%</b> this week
              compared to last week.
            </p>

            <p>
              📈 Best performing category is{" "}
              <b className="text-zinc-900 dark:text-zinc-100">Electronics</b>.
            </p>

            <p>
              💡 Try boosting listings for{" "}
              <b className="text-zinc-900 dark:text-zinc-100">Fashion</b>{" "}
              products to increase sales.
            </p>

            <p>
              ⚡ Fastest selling product:{" "}
              <b className="text-zinc-900 dark:text-zinc-100">
                iPhone 13 Pro
              </b>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}