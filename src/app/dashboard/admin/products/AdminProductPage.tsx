"use client";
import { IProduct } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import EditProductModal from "./EditPorductModal";

interface AdminProductPageProps {
  products: IProduct[];
}
const statusBadge = (status: string) => {
  switch (status) {
    case "available":
      return "bg-blue-100 text-blue-700";
    case "sold":
      return "bg-green-100 text-green-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "rejected":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const AdminProductPage = ({ products }: AdminProductPageProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const router = useRouter();

  const handleEdit = (product: IProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const deleteProduct = async (productId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/all/products/${productId}`,
        {
          method: "DELETE",
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error("delete product failed ❌");
        return;
      }

      toast.success("delete product successfully ✅");

      router.refresh(); // 🔥 page data refresh
    } catch (error: unknown) {
      toast.error("Something went wrong ❌");
      console.log(error);
    }
  };

  const updateStatus = async (
    productId: string,
    status: "available" | "pending" | "sold" | "rejected",
  ) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/all/products/${productId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
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
      console.log(error);
    }
  };
  return (
    <div className="p-6 md:p-10">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-sm text-gray-500">
            Manage all listed products in your marketplace
          </p>
        </div>

        <div className="text-sm text-gray-500">
          Total Products: {products.length}
        </div>
      </div>

      {/* Table Card */}
      <div className="overflow-hidden rounded-xl bg-white shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-4">Product</th>

                <th className="hidden md:table-cell p-4">Category</th>

                <th className="hidden lg:table-cell p-4">Price</th>

                <th className="hidden lg:table-cell p-4">Condition</th>

                <th className="p-4">Status</th>

                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr
                    key={product._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    {/* Product */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={product.images[0]}
                          alt={product.title}
                          className="h-10 w-10 rounded object-cover"
                          width={200}
                          height={200}
                        />

                        <div>
                          <p className="font-medium">{product.title}</p>

                          {/* Mobile Info */}
                          <div className="md:hidden space-y-1 text-xs text-gray-500">
                            <p>৳ {product.price.toLocaleString()}</p>
                            <p>{product.category}</p>
                          </div>

                          {/* Tablet Info */}
                          <div className="hidden md:block lg:hidden text-xs text-gray-500">
                            $ {product.price.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="hidden md:table-cell p-4">
                      {product.category}
                    </td>

                    {/* Price */}
                    <td className="hidden lg:table-cell p-4 font-semibold">
                      $ {product.price.toLocaleString()}
                    </td>

                    {/* Condition */}
                    <td className="hidden lg:table-cell p-4">
                      {product.condition}
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      <select
                        value={product.status}
                        onChange={(e) =>
                          updateStatus(
                            product._id,
                            e.target.value as
                              | "available"
                              | "pending"
                              | "sold"
                              | "rejected",
                          )
                        }
                        className={`rounded-md border px-2 py-1 text-xs font-medium ${statusBadge(
                          product.status,
                        )}`}
                      >
                        <option value="available">Available</option>
                        <option value="pending">Pending</option>
                        <option value="sold">Sold</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="p-4">
                      <div className="flex flex-wrap justify-end gap-2 text-xs">
                        <Link
                          href={`/products/${product._id}`}
                          className="rounded px-2 py-1 text-blue-600 hover:bg-blue-50"
                        >
                          View
                        </Link>

                        <button
                          className="rounded px-2 py-1 text-green-600 hover:bg-green-50"
                          onClick={() => handleEdit(product)}
                        >
                          Edit
                        </button>

                        <button
                          className="rounded px-2 py-1 text-red-600 hover:bg-red-50"
                          onClick={() => deleteProduct(product._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-gray-500">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex flex-col gap-2 text-xs text-gray-500 md:flex-row md:justify-between">
        <span>Total Products: {products.length}</span>
        <span>Showing all records</span>
      </div>

      <EditProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        setProduct={setSelectedProduct}
        onSuccess={() => router.refresh()}
      />
    </div>
  );
};

export default AdminProductPage;
