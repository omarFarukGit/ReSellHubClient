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
      {" "}
      <div className="mb-6">
        {" "}
        <h1 className="text-2xl font-bold">Orders</h1>{" "}
        <p className="text-sm text-gray-500">
          Manage all marketplace orders{" "}
        </p>{" "}
      </div>
      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="w-full min-w-[700px] text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Buyer</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3 min-w-[220px]">
                    <Image
                      src={order.productImage}
                      alt={order.productName}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-lg object-cover flex-shrink-0"
                    />

                    <div className="min-w-0">
                      <p className="font-medium truncate">
                        {order.productName}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="p-4 whitespace-nowrap">
                  {order.buyerInfo.name}
                </td>

                <td className="p-4 font-semibold whitespace-nowrap">
                  ৳ {order.productPrice}
                </td>

                <td className="p-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(
                      order.orderStatus,
                    )}`}
                  >
                    {order.orderStatus}
                  </span>
                </td>

                <td className="p-4 whitespace-nowrap">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                <td className="p-4">
                  <div className="flex gap-3 whitespace-nowrap">
                    <Link
                      href={`/products/${order.productId}`}
                      className="text-orange-600 font-medium hover:underline"
                    >
                      View
                    </Link>

                    <button
                      onClick={() => deleteProduct(order._id)}
                      className="text-red-600 font-medium hover:underline cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between text-xs text-gray-500">
        <span>Total Orders: {orders.length}</span>
        <span>Showing all records</span>
      </div>
    </div>
  );
}
