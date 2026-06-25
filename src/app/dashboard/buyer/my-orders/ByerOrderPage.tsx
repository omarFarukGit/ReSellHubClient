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
      return "bg-yellow-100 text-yellow-700";
    case "shipped":
      return "bg-blue-100 text-blue-700";
    case "delivered":
      return "bg-green-100 text-green-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
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

      router.refresh(); // 🔥 page data refresh
    } catch (error: unknown) {
      toast.error("Something went wrong ❌");
      console.log(error);
    }
  };

  if (!orders?.length) {
    return <OrderNotFound />;
  }
  return (
    <div className="p-6 md:p-10 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">My Orders</h1>
        <p className="text-sm text-gray-500">
          Track all your purchased products
        </p>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-xl bg-white shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-4">Product</th>

                <th className="hidden md:table-cell p-4">Seller</th>

                <th className="hidden lg:table-cell p-4">Price</th>

                <th className="p-4">Status</th>

                <th className="hidden lg:table-cell p-4">Date</th>

                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t hover:bg-gray-50 transition"
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
                        <p className="font-medium">{order.productName}</p>

                        {/* Mobile Info */}
                        <div className="md:hidden text-xs text-gray-500 space-y-1">
                          <p>{order.sellerInfo.name}</p>
                          <p>$ {order.productPrice}</p>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* SELLER */}
                  <td className="hidden md:table-cell p-4 text-gray-600">
                    {order.sellerInfo.name}
                  </td>

                  {/* PRICE */}
                  <td className="hidden lg:table-cell p-4 font-semibold">
                    $ {order.productPrice}
                  </td>

                  {/* STATUS */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge(
                        order.orderStatus,
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  {/* DATE */}
                  <td className="hidden lg:table-cell p-4 text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  {/* ACTIONS */}
                  <td className="p-4">
                    <div className="flex flex-wrap justify-end gap-2 text-xs">
                      <button
                        className="rounded px-2 py-1 text-blue-600 hover:bg-blue-50"
                        onClick={() =>
                          router.push(`/products/${order.productId}`)
                        }
                      >
                        View
                      </button>

                      {order.orderStatus === "pending" && (
                        <button
                          className="rounded px-2 py-1 text-red-600 hover:bg-red-50"
                          onClick={() =>
                            cancelOrder(order._id, order.buyerInfo.userId)
                          }
                        >
                          Cancel
                        </button>
                      )}

                      {order.orderStatus === "delivered" && (
                        <button className="rounded px-2 py-1 text-green-600 hover:bg-green-50">
                          Review
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-gray-500">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex flex-col gap-2 text-xs text-gray-500 md:flex-row md:justify-between">
        <span>Total Orders: {orders.length}</span>
        <span>Buyer Dashboard</span>
      </div>
    </div>
  );
}
