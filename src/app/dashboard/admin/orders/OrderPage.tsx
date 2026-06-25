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
      return "bg-yellow-100 text-yellow-700";
    case "shipped":
      return "bg-blue-100 text-blue-700";
    case "delivered":
      return "bg-green-100 text-green-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-600";
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
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-sm text-gray-500">Manage all marketplace orders</p>
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

                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {/* Product */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={order.productImage}
                        alt={order.productName}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-lg object-cover flex-shrink-0"
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
                  <td className="hidden md:table-cell p-4">
                    {order.buyerInfo.name}
                  </td>

                  {/* Price */}
                  <td className="hidden lg:table-cell p-4 font-semibold">
                    $ {order.productPrice}
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(
                        order.orderStatus,
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="hidden lg:table-cell p-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  {/* Action */}
                  <td className="p-4">
                    <div className="flex flex-wrap gap-2 text-xs">
                      <Link
                        href={`/products/${order.productId}`}
                        className="rounded px-2 py-1 text-orange-600 hover:bg-orange-50"
                      >
                        View
                      </Link>

                      <button
                        onClick={() => deleteProduct(order._id)}
                        className="rounded px-2 py-1 text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
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

      {/* Footer */}
      <div className="mt-4 flex flex-col gap-2 text-xs text-gray-500 md:flex-row md:justify-between">
        <span>Total Orders: {orders.length}</span>
        <span>Showing all records</span>
      </div>
    </div>
  );
}
