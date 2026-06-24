"use client";

import { IOrder } from "@/types/orderType";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

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

export default function BuyerOrdersPage({ orders}:OrdersTableProps) {
  const router = useRouter();

const cancelOrder = async (productId: string,buyerId:string) => {


  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/my-orders/${productId}/${buyerId}`,
      {
        method: "DELETE",
      }
    );


    if (!res.ok) {
      toast.error("Order cancel failed ❌");
      return;
    }

    toast.success("Order cancelled successfully ✅");

    router.refresh(); // 🔥 page data refresh
  } catch (error:unknown) {
    toast.error("Something went wrong ❌");
    console.log(error)
  }
};

  if (!orders?.length) {
    return (
      <div>
        <h1>order not found</h1>
      </div>
    );
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
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full min-w-225 text-sm">
          {/* HEAD */}
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Seller</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* PRODUCT */}
                <td className="p-4 flex items-center gap-3">
                  <Image
                    src={order.productImage}
                    className="w-10 h-10 rounded object-cover"
                    alt={order.productName}
                    width={200}
                    height={200}
                  />
                  <span className="font-medium">{order.productName}</span>
                </td>

                {/* SELLER */}
                <td className="p-4 text-gray-600">{order.sellerInfo.name}</td>

                {/* PRICE */}
                <td className="p-4 font-semibold">৳ {order.productPrice}</td>

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
                <td className="p-4 text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                {/* ACTIONS */}
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-3 text-xs">
                    <button
                      className="text-blue-600 hover:underline cursor-pointer"
                      onClick={() =>
                        router.push(`/products/${order.productId}`)
                      }
                    >
                      View
                    </button>

                    {order.orderStatus === "pending" && (
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => cancelOrder(order._id,order.buyerInfo.userId)}
                      >
                        Cancel
                      </button>
                    )}

                    {order.orderStatus === "delivered" && (
                      <button className="text-green-600 hover:underline">
                        Review
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="flex justify-between text-xs text-gray-500">
        <span>Total Orders: {orders.length}</span>
        <span>Buyer Dashboard</span>
      </div>
    </div>
  );
}
