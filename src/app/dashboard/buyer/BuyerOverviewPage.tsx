"use client";

import { IUser } from "@/types/userType";
import {
  ShoppingBag,
  Heart,
  Package,
  Wallet,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  user: IUser;
}

export default function BuyerOverviewPage({ user }: any) {
  const stats = [
    {
      title: "Total Orders",
      value: 18,
      icon: ShoppingBag,
    },
    {
      title: "Active Orders",
      value: 3,
      icon: Package,
    },
    {
      title: "Wishlist",
      value: 7,
      icon: Heart,
    },
    {
      title: "Total Spent",
      value: "৳45,500",
      icon: Wallet,
    },
  ];

  const recentOrders = [
    {
      id: "#RH-1001",
      product: "iPhone 13",
      seller: "Rakib Hasan",
      price: "৳55,000",
      status: "Delivered",
    },
    {
      id: "#RH-1002",
      product: "Nike Air Max",
      seller: "Hasan Mahmud",
      price: "৳4,500",
      status: "Processing",
    },
    {
      id: "#RH-1003",
      product: "Apple Watch",
      seller: "Nayeem",
      price: "৳8,000",
      status: "Shipped",
    },
  ];

  return (
    <div className="min-h-screen space-y-8 bg-gray-50 p-6 text-gray-900 transition-colors dark:bg-gray-950 dark:text-gray-100">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 p-8 text-white">
        <h1 className="text-3xl font-bold">Welcome Back 👋</h1>

        <p className="mt-2 text-indigo-100">
          Manage your orders, wishlist and purchases from Resell Hub.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                    {item.value}
                  </h2>
                </div>

                <div className="rounded-xl bg-gray-100 p-3 dark:bg-gray-800">
                  <Icon
                    size={24}
                    className="text-gray-700 dark:text-gray-200"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Orders */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 lg:col-span-2 dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recent Orders
            </h2>

            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="py-3 text-left text-gray-700 dark:text-gray-300">
                    Order
                  </th>

                  <th className="py-3 text-left text-gray-700 dark:text-gray-300">
                    Seller
                  </th>

                  <th className="py-3 text-left text-gray-700 dark:text-gray-300">
                    Price
                  </th>

                  <th className="py-3 text-left text-gray-700 dark:text-gray-300">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-200 last:border-0 dark:border-gray-800"
                  >
                    <td className="py-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {order.product}
                        </p>

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {order.id}
                        </p>
                      </div>
                    </td>

                    <td className="text-gray-700 dark:text-gray-300">
                      {order.seller}
                    </td>

                    <td className="text-gray-900 dark:text-gray-200">
                      {order.price}
                    </td>

                    <td>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : order.status === "Shipped"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Profile */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex flex-col items-center">
            <Image
              src={user.image || "https://i.pravatar.cc/150?img=12"}
              alt={user.name}
              className="h-24 w-24 rounded-full border border-gray-200 object-cover dark:border-gray-700"
              width={200}
              height={200}
            />

            <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
              {user.name}
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Buyer Account
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3">
              <Mail
                size={18}
                className="text-gray-600 dark:text-gray-400"
              />

              <span className="text-sm text-gray-700 dark:text-gray-300">
                {user.email}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Phone
                size={18}
                className="text-gray-600 dark:text-gray-400"
              />

              <span className="text-sm text-gray-700 dark:text-gray-300">
                {user.phone || "01"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <MapPin
                size={18}
                className="text-gray-600 dark:text-gray-400"
              />

              <span className="text-sm text-gray-700 dark:text-gray-300">
                {user.location}
              </span>
            </div>
          </div>

          <Link href="/dashboard/buyer/profile">
            <button className="mt-6 w-full cursor-pointer rounded-xl bg-orange-600 py-3 text-white transition hover:bg-orange-700">
              Profile
            </button>
          </Link>
        </div>
      </div>

      {/* Order Tracking */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
          Active Order Tracking
        </h2>

        <div className="flex flex-wrap items-center gap-4">
          <div className="rounded-xl bg-green-100 px-4 py-2 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            ✓ Order Placed
          </div>

          <div className="rounded-xl bg-green-100 px-4 py-2 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            ✓ Payment Complete
          </div>

          <div className="rounded-xl bg-green-100 px-4 py-2 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            ✓ Shipped
          </div>

          <div className="rounded-xl bg-gray-100 px-4 py-2 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
            Delivered
          </div>
        </div>
      </div>
    </div>
  );
}