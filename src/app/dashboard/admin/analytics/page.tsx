"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const stats = [
  {
    title: "Total Products",
    value: 128,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Total Orders",
    value: 54,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    title: "Revenue",
    value: "৳ 3,25,000",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  { title: "Pending", value: 9, color: "text-yellow-600", bg: "bg-yellow-50" },
];

const revenueData = [
  { name: "Mon", revenue: 4000 },
  { name: "Tue", revenue: 3000 },
  { name: "Wed", revenue: 5000 },
  { name: "Thu", revenue: 7000 },
  { name: "Fri", revenue: 6000 },
  { name: "Sat", revenue: 9000 },
  { name: "Sun", revenue: 7500 },
];

const orderStatusData = [
  { name: "Pending", value: 12 },
  { name: "Shipped", value: 18 },
  { name: "Delivered", value: 20 },
  { name: "Cancelled", value: 4 },
];

const COLORS = ["#facc15", "#3b82f6", "#22c55e", "#ef4444"];

const activity = [
  "New order placed - iPhone 13 Pro",
  "Product approved - MacBook Air",
  "New user registered",
  "Order shipped - Sneakers",
];

export default function AdminAnalyticsPage() {
  return (
    <div className="p-6 md:p-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Admin Analytics</h1>
        <p className="text-sm text-gray-500">
          Marketplace performance overview
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
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Revenue Overview</h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Order Status</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={orderStatusData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
              >
                {orderStatusData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Recent Activity</h2>

          <div className="space-y-3">
            {activity.map((a, i) => (
              <p key={i} className="text-sm text-gray-600 border-b pb-2">
                {a}
              </p>
            ))}
          </div>
        </div>

        {/* Quick Info */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">System Overview</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-green-700 font-medium">Server</p>
              <p className="text-green-600 text-xs">Active</p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-700 font-medium">Database</p>
              <p className="text-blue-600 text-xs">Connected</p>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg">
              <p className="text-yellow-700 font-medium">API Load</p>
              <p className="text-yellow-600 text-xs">Normal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
