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
      toast.error("Something went wrong ❌");
    }
  };

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 md:p-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <p className="text-sm text-gray-500">
          Manage all listed products in your marketplace
        </p>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Condition</th>
              <th className="p-4">Status</th>
              {/* <th className="p-4">Location</th> */}
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* Product */}
                <td className="p-4 flex items-center gap-3">
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    className="w-10 h-10 rounded object-cover"
                    width={200}
                    height={200}
                  />
                  <div>
                    <p className="font-medium">{product.title}</p>
                    <p className="text-xs text-gray-500">
                      {product.description.slice(0, 40)}...
                    </p>
                  </div>
                </td>

                {/* Category */}
                <td className="p-4">{product.category}</td>

                {/* Price */}
                <td className="p-4 font-semibold">
                  ৳ {product.price.toLocaleString()}
                </td>

                {/* Condition */}
                <td className="p-4">{product.condition}</td>

                {/* Status */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge(
                      product.status,
                    )}`}
                  >
                    {product.status}
                  </span>
                </td>

                {/* Location */}
                {/* <td className="p-4 text-gray-600">{product.location}</td> */}

                {/* Actions */}
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-3 text-xs">
                    <Link href={`/products/${product._id}`}>
                      <button className="text-blue-600 hover:underline">
                        View
                      </button>
                    </Link>
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-green-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(product._id, user.id)}
                      className="text-red-600 hover:underline"
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

      {/* Footer */}
      <div className="flex justify-between mt-4 text-xs text-gray-500">
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

export default ProductsPage;
