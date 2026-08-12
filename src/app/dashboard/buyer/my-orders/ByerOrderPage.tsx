"use client";

import { IOrder } from "@/types/orderType";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
import OrderNotFound from "./OrderNotFound";

type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";

const statusBadge = (status: OrderStatus) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-400";

    case "shipped":
      return "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400";

    case "delivered":
      return "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400";

    case "cancelled":
      return "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400";
  }
};

interface OrdersTableProps {
  orders: IOrder[];
}

export default function BuyerOrdersPage({ orders }: OrdersTableProps) {
  const router = useRouter();

  const cancelOrder = async (productId: string, buyerId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/my-orders/${productId}/${buyerId}`,
        {
          method: "DELETE",
        },
      );

      if (!res.ok) {
        toast.error("Order cancel failed ❌");
        return;
      }

      toast.success("Order cancelled successfully ✅");

      router.refresh();
    } catch (error: unknown) {
      toast.error("Something went wrong ❌");
      console.log(error);
    }
  };

  if (!orders?.length) {
    return <OrderNotFound />;
  }

  return (
    <div className="min-h-screen space-y-6 bg-gray-50 p-6 text-gray-900 transition-colors dark:bg-gray-950 dark:text-gray-100 md:p-10">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          My Orders
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Track all your purchased products
        </p>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow dark:border-gray-800 dark:bg-gray-900">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left dark:bg-gray-800">
              <tr>
                <th className="p-4 text-gray-700 dark:text-gray-200">
                  Product
                </th>

                <th className="hidden p-4 text-gray-700 dark:text-gray-200 md:table-cell">
                  Seller
                </th>

                <th className="hidden p-4 text-gray-700 dark:text-gray-200 lg:table-cell">
                  Price
                </th>

                <th className="p-4 text-gray-700 dark:text-gray-200">
                  Status
                </th>

                <th className="hidden p-4 text-gray-700 dark:text-gray-200 lg:table-cell">
                  Date
                </th>

                <th className="p-4 text-right text-gray-700 dark:text-gray-200">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t border-gray-100 transition hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/60"
                >
                  {/* PRODUCT */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={order.productImage}
                        className="h-10 w-10 rounded object-cover"
                        alt={order.productName}
                        width={200}
                        height={200}
                      />

                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {order.productName}
                        </p>

                        {/* Mobile Info */}
                        <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400 md:hidden">
                          <p>{order.sellerInfo.name}</p>
                          <p>$ {order.productPrice}</p>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* SELLER */}
                  <td className="hidden p-4 text-gray-600 dark:text-gray-400 md:table-cell">
                    {order.sellerInfo.name}
                  </td>

                  {/* PRICE */}
                  <td className="hidden p-4 font-semibold text-gray-900 dark:text-white lg:table-cell">
                    $ {order.productPrice}
                  </td>

                  {/* STATUS */}
                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${statusBadge(
                        order.orderStatus,
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  {/* DATE */}
                  <td className="hidden p-4 text-gray-600 dark:text-gray-400 lg:table-cell">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  {/* ACTIONS */}
                  <td className="p-4">
                    <div className="flex flex-wrap justify-end gap-2 text-xs">
                      <button
                        className="rounded px-2 py-1 text-blue-600 transition hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/50"
                        onClick={() =>
                          router.push(`/products/${order.productId}`)
                        }
                      >
                        View
                      </button>

                      {order.orderStatus === "pending" && (
                        <button
                          className="rounded px-2 py-1 text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/50"
                          onClick={() =>
                            cancelOrder(
                              order._id,
                              order.buyerInfo.userId,
                            )
                          }
                        >
                          Cancel
                        </button>
                      )}

                      {order.orderStatus === "delivered" && (
                        <button className="rounded px-2 py-1 text-green-600 transition hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950/50">
                          Review
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {orders.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-16 text-center text-gray-500 dark:text-gray-400"
                  >
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex flex-col gap-2 text-xs text-gray-500 dark:text-gray-400 md:flex-row md:justify-between">
        <span>Total Orders: {orders.length}</span>
        <span>Buyer Dashboard</span>
      </div>
    </div>
  );
}