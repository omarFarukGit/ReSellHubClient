"use client";

import { useRouter } from "next/navigation";
import OrderNotFound from "./OrderNotFound";
import Image from "next/image";
import { toast } from "react-toastify";
import { OrdersTableProps } from "@/types/orderType";

type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

const statusBadge = (status: OrderStatus) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400";

    case "processing":
      return "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400";

    case "shipped":
      return "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400";

    case "delivered":
      return "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400";

    case "cancelled":
      return "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400";

    default:
      return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
  }
};

export default function SellerOrdersPage({
  orders,
}: OrdersTableProps) {
  const router = useRouter();

  const updateStatus = async (
    orderId: string,
    sellerId: string,
    orderStatus: OrderStatus,
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

      toast.success("Status updated successfully ✅");

      router.refresh();
    } catch (error: unknown) {
      toast.error("Something went wrong ❌");
      console.error(error);
    }
  };

  if (!orders?.length) {
    return <OrderNotFound />;
  }

  return (
    <div className="space-y-6 p-6 md:p-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Seller Orders
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage all incoming orders from buyers
        </p>
      </div>

      {/* Table */}
      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-gray-200
          bg-white
          shadow-sm
          dark:border-gray-700
          dark:bg-gray-900
        "
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            {/* Table Header */}
            <thead
              className="
                bg-gray-50
                text-left
                text-gray-700
                dark:bg-gray-800
                dark:text-gray-300
              "
            >
              <tr>
                <th className="p-4">Product</th>

                <th className="hidden p-4 md:table-cell">
                  Buyer
                </th>

                <th className="hidden p-4 lg:table-cell">
                  Price
                </th>

                <th className="p-4">
                  Status
                </th>

                <th className="hidden p-4 lg:table-cell">
                  Date
                </th>

                <th className="hidden p-4 lg:table-cell">
                  Location
                </th>

                <th className="p-4 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="
                      border-t
                      border-gray-200
                      transition
                      hover:bg-gray-50
                      dark:border-gray-700
                      dark:hover:bg-gray-800/50
                    "
                  >
                    {/* Product */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="
                            overflow-hidden
                            rounded-lg
                            border
                            border-gray-200
                            dark:border-gray-700
                          "
                        >
                          <Image
                            src={order.productImage}
                            className="h-10 w-10 object-cover"
                            alt={order.productName}
                            width={200}
                            height={200}
                          />
                        </div>

                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {order.productName}
                          </p>

                          {/* Mobile Info */}
                          <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400 md:hidden">
                            <p>{order.buyerInfo.name}</p>
                            <p>
                              $ {order.productPrice}
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Buyer */}
                    <td className="hidden p-4 text-gray-600 dark:text-gray-300 md:table-cell">
                      {order.buyerInfo.name}
                    </td>

                    {/* Price */}
                    <td className="hidden p-4 font-semibold text-gray-900 dark:text-white lg:table-cell">
                      $ {order.productPrice}
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      <span
                        className={`
                          inline-flex
                          rounded-full
                          px-3
                          py-1
                          text-xs
                          font-medium
                          ${statusBadge(order.orderStatus)}
                        `}
                      >
                        {order.orderStatus}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="hidden p-4 text-gray-600 dark:text-gray-400 lg:table-cell">
                      {new Date(
                        order.createdAt,
                      ).toLocaleDateString()}
                    </td>

                    {/* Location */}
                    <td className="hidden max-w-[200px] p-4 text-gray-600 dark:text-gray-400 lg:table-cell">
                      <span className="line-clamp-2">
                        {order.buyerInfo.address}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-4">
                      <div className="flex flex-wrap justify-end gap-2 text-xs">
                        {/* View */}
                        <button
                          type="button"
                          className="
                            rounded-lg
                            px-3
                            py-1.5
                            font-medium
                            text-blue-600
                            transition
                            hover:bg-blue-50
                            dark:text-blue-400
                            dark:hover:bg-blue-500/10
                          "
                          onClick={() =>
                            router.push(
                              `/products/${order.productId}`,
                            )
                          }
                        >
                          View
                        </button>

                        {/* Status */}
                        <select
                          value={order.orderStatus}
                          onChange={(e) =>
                            updateStatus(
                              order._id,
                              order.sellerInfo.userId,
                              e.target.value as OrderStatus,
                            )
                          }
                          className={`
                            cursor-pointer
                            rounded-lg
                            border
                            border-transparent
                            px-2
                            py-1.5
                            text-xs
                            font-medium
                            outline-none
                            transition
                            focus:ring-2
                            focus:ring-blue-500/30
                            ${statusBadge(order.orderStatus)}
                          `}
                        >
                          <option value="pending">
                            Pending
                          </option>

                          <option value="processing">
                            Processing
                          </option>

                          <option value="shipped">
                            Shipped
                          </option>

                          <option value="delivered">
                            Delivered
                          </option>

                          <option value="cancelled">
                            Cancelled
                          </option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="
                      py-16
                      text-center
                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div
        className="
          flex
          flex-col
          gap-2
          text-xs
          text-gray-500
          dark:text-gray-400
          md:flex-row
          md:justify-between
        "
      >
        <span>
          Total Orders: {orders.length}
        </span>

        <span>Seller Dashboard</span>
      </div>
    </div>
  );
}