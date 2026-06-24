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
    <div className="space-y-8 p-6">
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
              className="rounded-2xl border bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{item.title}</p>

                  <h2 className="mt-2 text-3xl font-bold">{item.value}</h2>
                </div>

                <div className="rounded-xl bg-gray-100 p-3">
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Orders */}
        <div className="rounded-2xl border bg-white p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Orders</h2>

            <button className="text-sm font-medium text-indigo-600">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left">Order</th>
                  <th className="py-3 text-left">Seller</th>
                  <th className="py-3 text-left">Price</th>
                  <th className="py-3 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b last:border-0">
                    <td className="py-4">
                      <div>
                        <p className="font-medium">{order.product}</p>

                        <p className="text-sm text-gray-500">{order.id}</p>
                      </div>
                    </td>

                    <td>{order.seller}</td>

                    <td>{order.price}</td>

                    <td>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Shipped"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
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
        <div className="rounded-2xl border bg-white p-6">
          <div className="flex flex-col items-center">
            <Image
              src={user.image || "https://i.pravatar.cc/150?img=12"}
              alt={user.name}
              className="h-24 w-24 rounded-full"
              width={200}
              height={200}
            />

            <h2 className="mt-4 text-xl font-bold">{user.name}</h2>

            <p className="text-sm text-gray-500">Buyer Account</p>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3">
              <Mail size={18} />
              <span className="text-sm">{user.email}</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={18} />
              <span className="text-sm">{user.phone || "01"}</span>
            </div>

            <div className="flex items-center gap-3">
              <MapPin size={18} />
              <span className="text-sm">{user.location}</span>
            </div>
          </div>

          <Link href={"/dashboard/buyer/profile"}>
            <button className="mt-6 w-full rounded-xl bg-orange-600 py-3 text-white cursor-pointer">
              Profile
            </button>
          </Link>
        </div>
      </div>

      {/* Order Tracking */}
      <div className="rounded-2xl border bg-white p-6">
        <h2 className="mb-6 text-xl font-semibold">Active Order Tracking</h2>

        <div className="flex flex-wrap items-center gap-4">
          <div className="rounded-xl bg-green-100 px-4 py-2">
            ✓ Order Placed
          </div>

          <div className="rounded-xl bg-green-100 px-4 py-2">
            ✓ Payment Complete
          </div>

          <div className="rounded-xl bg-green-100 px-4 py-2">✓ Shipped</div>

          <div className="rounded-xl bg-gray-100 px-4 py-2">Delivered</div>
        </div>
      </div>
    </div>
  );
}
