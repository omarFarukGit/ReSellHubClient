"use client";

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
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-500/10",
  },
  {
    title: "Total Orders",
    value: 54,
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-50 dark:bg-green-500/10",
  },
  {
    title: "Revenue",
    value: "৳ 3,25,000",
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-500/10",
  },
  {
    title: "Pending",
    value: 9,
    color: "text-yellow-600 dark:text-yellow-400",
    bg: "bg-yellow-50 dark:bg-yellow-500/10",
  },
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

const cardStyle = `
  rounded-2xl
  border
  border-gray-200
  bg-white
  shadow-sm
  transition-colors duration-300
  dark:border-gray-800
  dark:bg-gray-900
`;

export default function AdminAnalyticsPage() {
  return (
    <div
      className="
        min-h-screen
        space-y-8
        bg-gray-50
        p-6
        transition-colors duration-300
        dark:bg-gray-950
        md:p-10
      "
    >
      {/* Header */}
      <div>
        <span
          className="
            text-sm
            font-semibold
            uppercase
            tracking-wider
            text-orange-500
            dark:text-orange-400
          "
        >
          Dashboard
        </span>

        <h1
          className="
            mt-1
            text-2xl
            font-bold
            text-gray-900
            dark:text-white
          "
        >
          Admin Analytics
        </h1>

        <p
          className="
            mt-1
            text-sm
            text-gray-500
            dark:text-gray-400
          "
        >
          Marketplace performance overview
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className={`
              group
              rounded-2xl
              border
              border-gray-200
              p-5
              shadow-sm
              transition-all duration-300
              hover:-translate-y-1
              hover:shadow-md
              dark:border-gray-800
              ${stat.bg}
            `}
          >
            <p
              className="
                text-sm
                text-gray-500
                dark:text-gray-400
              "
            >
              {stat.title}
            </p>

            <h2
              className={`
                mt-2
                text-2xl
                font-bold
                ${stat.color}
                transition-transform duration-300
                group-hover:scale-105
              `}
            >
              {stat.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Revenue Chart */}
        <div className={`lg:col-span-2 ${cardStyle} p-6`}>
          <h2
            className="
              mb-4
              font-semibold
              text-gray-900
              dark:text-white
            "
          >
            Revenue Overview
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <XAxis
                dataKey="name"
                stroke="#9ca3af"
                tick={{ fontSize: 12 }}
              />

              <YAxis
                stroke="#9ca3af"
                tick={{ fontSize: 12 }}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--tooltip-bg)",
                  border: "1px solid var(--tooltip-border)",
                  borderRadius: "10px",
                }}
              />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#f97316"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className={`${cardStyle} p-6`}>
          <h2
            className="
              mb-4
              font-semibold
              text-gray-900
              dark:text-white
            "
          >
            Order Status
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={orderStatusData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                innerRadius={55}
                paddingAngle={3}
              >
                {orderStatusData.map((item, index) => (
                  <Cell
                    key={item.name}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-3">
            {orderStatusData.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center gap-2 text-xs"
              >
                <span
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor: COLORS[index],
                  }}
                />

                <span
                  className="
                    text-gray-600
                    dark:text-gray-400
                  "
                >
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Activity */}
        <div className={`${cardStyle} p-6`}>
          <h2
            className="
              mb-4
              font-semibold
              text-gray-900
              dark:text-white
            "
          >
            Recent Activity
          </h2>

          <div className="space-y-3">
            {activity.map((item) => (
              <div
                key={item}
                className="
                  border-b
                  border-gray-100
                  pb-3
                  text-sm
                  text-gray-600
                  last:border-0
                  last:pb-0
                  dark:border-gray-800
                  dark:text-gray-400
                "
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* System Overview */}
        <div className={`lg:col-span-2 ${cardStyle} p-6`}>
          <h2
            className="
              mb-4
              font-semibold
              text-gray-900
              dark:text-white
            "
          >
            System Overview
          </h2>

          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
            {/* Server */}
            <div
              className="
                rounded-xl
                border
                border-green-100
                bg-green-50
                p-4
                dark:border-green-500/20
                dark:bg-green-500/10
              "
            >
              <p className="font-medium text-green-700 dark:text-green-400">
                Server
              </p>

              <p className="mt-1 text-xs text-green-600 dark:text-green-500">
                ● Active
              </p>
            </div>

            {/* Database */}
            <div
              className="
                rounded-xl
                border
                border-blue-100
                bg-blue-50
                p-4
                dark:border-blue-500/20
                dark:bg-blue-500/10
              "
            >
              <p className="font-medium text-blue-700 dark:text-blue-400">
                Database
              </p>

              <p className="mt-1 text-xs text-blue-600 dark:text-blue-500">
                ● Connected
              </p>
            </div>

            {/* API */}
            <div
              className="
                rounded-xl
                border
                border-yellow-100
                bg-yellow-50
                p-4
                dark:border-yellow-500/20
                dark:bg-yellow-500/10
              "
            >
              <p className="font-medium text-yellow-700 dark:text-yellow-400">
                API Load
              </p>

              <p className="mt-1 text-xs text-yellow-600 dark:text-yellow-500">
                ● Normal
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}