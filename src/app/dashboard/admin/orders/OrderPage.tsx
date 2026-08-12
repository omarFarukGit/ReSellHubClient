"use client";

import Link from "next/link";
import Image from "next/image";
import { OrdersTableProps } from "@/types/orderType";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";

const statusColor = (status: OrderStatus) => {
  switch (status) {
    case "pending":
      return `
        bg-yellow-100 text-yellow-700
        dark:bg-yellow-500/10 dark:text-yellow-400
      `;

    case "shipped":
      return `
        bg-blue-100 text-blue-700
        dark:bg-blue-500/10 dark:text-blue-400
      `;

    case "delivered":
      return `
        bg-green-100 text-green-700
        dark:bg-green-500/10 dark:text-green-400
      `;

    case "cancelled":
      return `
        bg-red-100 text-red-700
        dark:bg-red-500/10 dark:text-red-400
      `;

    default:
      return `
        bg-gray-100 text-gray-600
        dark:bg-gray-800 dark:text-gray-400
      `;
  }
};

export default function OrdersPage({ orders }: OrdersTableProps) {
  const router = useRouter();

  const deleteProduct = async (productId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/${productId}`,
        {
          method: "DELETE",
        },
      );

      await res.json();

      if (!res.ok) {
        toast.error("Delete order failed ❌");
        return;
      }

      toast.success("Delete order successfully ✅");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong ❌");
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-gray-50
        p-4
        transition-colors duration-300
        dark:bg-gray-950
        md:p-6
        lg:p-8
      "
    >
      {/* Header */}
      <div className="mb-6">
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
          Marketplace
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
          Orders
        </h1>

        <p
          className="
            mt-1
            text-sm
            text-gray-500
            dark:text-gray-400
          "
        >
          Manage all marketplace orders
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
          transition-colors duration-300
          dark:border-gray-800
          dark:bg-gray-900
        "
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            {/* Table Head */}
            <thead
              className="
                bg-gray-50
                text-left
                text-gray-600
                dark:bg-gray-800/70
                dark:text-gray-300
              "
            >
              <tr>
                <th className="p-4 font-semibold">Product</th>

                <th className="hidden p-4 font-semibold md:table-cell">
                  Buyer
                </th>

                <th className="hidden p-4 font-semibold lg:table-cell">
                  Price
                </th>

                <th className="p-4 font-semibold">Status</th>

                <th className="hidden p-4 font-semibold lg:table-cell">
                  Date
                </th>

                <th className="p-4 font-semibold">Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="
                    border-t
                    border-gray-100
                    transition-colors duration-200
                    hover:bg-gray-50

                    dark:border-gray-800
                    dark:hover:bg-gray-800/50
                  "
                >
                  {/* Product */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={order.productImage}
                        alt={order.productName}
                        width={48}
                        height={48}
                        className="
                          h-12
                          w-12
                          shrink-0
                          rounded-lg
                          object-cover
                          ring-1
                          ring-gray-100
                          dark:ring-gray-700
                        "
                      />

                      <div className="min-w-0">
                        <p
                          className="
                            truncate
                            font-medium
                            text-gray-800
                            dark:text-white
                          "
                        >
                          {order.productName}
                        </p>

                        {/* Mobile Info */}
                        <div
                          className="
                            mt-1
                            space-y-1
                            text-xs
                            text-gray-500
                            dark:text-gray-400
                            md:hidden
                          "
                        >
                          <p>{order.buyerInfo.name}</p>
                          <p>৳ {order.productPrice}</p>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Buyer */}
                  <td
                    className="
                      hidden
                      p-4
                      text-gray-700
                      dark:text-gray-300
                      md:table-cell
                    "
                  >
                    {order.buyerInfo.name}
                  </td>

                  {/* Price */}
                  <td
                    className="
                      hidden
                      p-4
                      font-semibold
                      text-gray-800
                      dark:text-white
                      lg:table-cell
                    "
                  >
                    ৳ {order.productPrice}
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
                        capitalize
                        ${statusColor(order.orderStatus)}
                      `}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  {/* Date */}
                  <td
                    className="
                      hidden
                      p-4
                      text-gray-500
                      dark:text-gray-400
                      lg:table-cell
                    "
                  >
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  {/* Action */}
                  <td className="p-4">
                    <div className="flex flex-wrap gap-2 text-xs">
                      <Link
                        href={`/products/${order.productId}`}
                        className="
                          rounded-lg
                          border
                          border-orange-200
                          px-3
                          py-1.5
                          font-medium
                          text-orange-600
                          transition-colors

                          hover:bg-orange-50

                          dark:border-orange-500/30
                          dark:text-orange-400
                          dark:hover:bg-orange-500/10
                        "
                      >
                        View
                      </Link>

                      <button
                        onClick={() => deleteProduct(order._id)}
                        className="
                          rounded-lg
                          border
                          border-red-200
                          px-3
                          py-1.5
                          font-medium
                          text-red-600
                          transition-colors

                          hover:bg-red-50

                          dark:border-red-500/30
                          dark:text-red-400
                          dark:hover:bg-red-500/10
                        "
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {/* Empty State */}
              {orders.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="
                      py-16
                      text-center
                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-base font-medium text-gray-700 dark:text-gray-300">
                        No orders found
                      </p>

                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        There are currently no marketplace orders.
                      </p>
                    </div>
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
          mt-4
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
        <span>Total Orders: {orders.length}</span>
        <span>Showing all records</span>
      </div>
    </div>
  );
}