"use client";

import { useRouter } from "next/navigation";
import OrderNotFound from "./OrderNotFound";
import Image from "next/image";
import { toast } from "react-toastify";
import { OrdersTableProps } from "@/types/orderType";

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

export default function SellerOrdersPage({ orders }: OrdersTableProps) {
  console.log(orders, "ordr");
  const router = useRouter();

  const updateStatus = async (
    orderId: string,
    sellerId: string,
    orderStatus:
      | "pending"
      | "processing"
      | "shipped"
      | "delivered"
      | "cancelled",
  ) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/seller-orders/${orderId}/${sellerId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderStatus }),
        },
      );

      if (!res.ok) {
        toast.error("Status update failed ❌");
        return;
      }
      console.log(res, orderId, sellerId, "orderstatus");
      toast.success("Status updated successfully ✅");
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
    <div className="p-6 md:p-10 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Seller Orders</h1>
        <p className="text-sm text-gray-500">
          Manage all incoming orders from buyers
        </p>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl bg-white shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-4">Product</th>

                <th className="hidden md:table-cell p-4">Buyer</th>

                <th className="hidden lg:table-cell p-4">Price</th>

                <th className="p-4">Status</th>

                <th className="hidden lg:table-cell p-4">Date</th>

                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    {/* Product */}
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
                            <p>{order.buyerInfo.name}</p>
                            <p>$ {order.productPrice}</p>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Buyer */}
                    <td className="hidden md:table-cell p-4 text-gray-600">
                      {order.buyerInfo.name}
                    </td>

                    {/* Price */}
                    <td className="hidden lg:table-cell p-4 font-semibold">
                      $ {order.productPrice}
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge(
                          order.orderStatus,
                        )}`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="hidden lg:table-cell p-4 text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                    {/* Actions */}
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

                        <select
                          value={order.orderStatus}
                          onChange={(e) =>
                            updateStatus(
                              order._id,
                              order.sellerInfo.userId,
                              e.target.value as
                                | "pending"
                                | "processing"
                                | "shipped"
                                | "delivered"
                                | "cancelled",
                            )
                          }
                          className={`rounded-md border px-2 py-1 text-xs font-medium ${statusBadge(
                            order.orderStatus,
                          )}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
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

      {/* Footer */}
      <div className="flex flex-col gap-2 text-xs text-gray-500 md:flex-row md:justify-between">
        <span>Total Orders: {orders.length}</span>
        <span>Seller Dashboard</span>
      </div>
    </div>
  );
}
