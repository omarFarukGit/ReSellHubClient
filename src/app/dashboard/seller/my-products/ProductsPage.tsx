"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import EditProductModal from "./EditPorductModal";
import { useState } from "react";

const statusBadge = (status: string) => {
  switch (status) {
    case "available":
      return "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400";

    case "sold":
      return "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400";

    case "pending":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-400";

    case "rejected":
      return "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400";

    default:
      return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
  }
};

const ProductsPage = ({ products, user }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const router = useRouter();

  const deleteProduct = async (productId: string, sellerId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${productId}/${sellerId}`,
        {
          method: "DELETE",
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error("Product deleted failed ❌");
        return;
      }

      toast.success("Product deleted successfully ✅");

      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong ❌");
    }
  };

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-6 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 md:p-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Products</h1>

        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Manage all listed products in your marketplace
        </p>
      </div>

      {/* Table Card */}
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            {/* Table Header */}
            <thead className="bg-zinc-100 text-left dark:bg-zinc-800">
              <tr>
                <th className="p-4 text-zinc-700 dark:text-zinc-200">
                  Product
                </th>

                <th className="hidden p-4 text-zinc-700 dark:text-zinc-200 md:table-cell">
                  Category
                </th>

                <th className="hidden p-4 text-zinc-700 dark:text-zinc-200 lg:table-cell">
                  Price
                </th>

                <th className="hidden p-4 text-zinc-700 dark:text-zinc-200 lg:table-cell">
                  Condition
                </th>

                <th className="p-4 text-zinc-700 dark:text-zinc-200">Status</th>

                <th className="p-4 text-right text-zinc-700 dark:text-zinc-200">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {products.map((product: any) => (
                <tr
                  key={product._id}
                  className="border-t border-zinc-200 transition hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/60"
                >
                  {/* Product */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={product.images?.[0] || "/placeholder-product.jpg"}
                        alt={product.title}
                        className="h-10 w-10 rounded-lg object-cover"
                        width={200}
                        height={200}
                      />

                      <div className="min-w-0">
                        <p className="font-medium text-zinc-900 dark:text-zinc-100">
                          {product.title}
                        </p>

                        {/* Mobile Info */}
                        <div className="space-y-1 text-xs text-zinc-500 dark:text-zinc-400 md:hidden">
                          <p>$ {product.price.toLocaleString()}</p>

                          <p>{product.category}</p>
                        </div>

                        {/* Desktop Description */}
                        <p className="hidden truncate text-xs text-zinc-500 dark:text-zinc-400 md:block">
                          {product.description?.slice(0, 40)}...
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="hidden p-4 text-zinc-700 dark:text-zinc-300 md:table-cell">
                    {product.category}
                  </td>

                  {/* Price */}
                  <td className="hidden p-4 font-semibold text-zinc-900 dark:text-zinc-100 lg:table-cell">
                    $ {product.price.toLocaleString()}
                  </td>

                  {/* Condition */}
                  <td className="hidden p-4 capitalize text-zinc-700 dark:text-zinc-300 lg:table-cell">
                    {product.condition}
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${statusBadge(
                        product.status,
                      )}`}
                    >
                      {product.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex flex-wrap justify-end gap-2 text-xs">
                      {/* View */}
                      <Link
                        href={`/products/${product._id}`}
                        className="rounded-lg px-2.5 py-1.5 text-blue-600 transition hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/50"
                      >
                        View
                      </Link>

                      {/* Edit */}
                      <button
                        onClick={() => handleEdit(product)}
                        className="cursor-pointer rounded-lg px-2.5 py-1.5 text-green-600 transition hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950/50"
                      >
                        Edit
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => deleteProduct(product._id, user.id)}
                        className="cursor-pointer rounded-lg px-2.5 py-1.5 text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {/* Empty */}
              {products.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-16 text-center text-zinc-500 dark:text-zinc-400"
                  >
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex flex-col gap-2 text-xs text-zinc-500 dark:text-zinc-400 md:flex-row md:justify-between">
        <span>Total Products: {products.length}</span>

        <span>Showing all records</span>
      </div>

      {/* Edit Modal */}
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

export default ProductsPage;
