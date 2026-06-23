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

      const data = await res.json();

      if (!res.ok) {
        toast.error("delete order failed ❌");
        return;
      }

      toast.success("delete order successfully ✅");

      router.refresh(); // 🔥 page data refresh
    } catch (error) {
      toast.error("Something went wrong ❌");
    }
  };
  return (
    <div className="p-6 md:p-10">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full min-w-[800px]">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Buyer</th>
              {/* <th className="p-4">Location</th> */}
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t hover:bg-gray-50">
                {/* Product */}
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

                {/* Buyer */}
                <td className="p-4">{order.buyerInfo.name}</td>

                {/* Location */}
                {/* <td className="p-4">{order.location}</td> */}

                {/* Price */}
                <td className="p-4 font-semibold">৳ {order.productPrice}</td>

                {/* Status */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(
                      order.orderStatus,
                    )}`}
                  >
                    {order.orderStatus}
                  </span>
                </td>

                {/* Date */}
                <td className="p-4">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                {/* Action */}
                <td className="p-4 flex gap-2">
                  <Link
                    href={`/products/${order.productId}`}
                    className="text-orange-600 font-medium hover:underline"
                  >
                    View
                  </Link>
                  <button
                    className="text-red-600 font-medium hover:underline cursor-pointer"
                    onClick={() => {
                      deleteProduct(order._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
