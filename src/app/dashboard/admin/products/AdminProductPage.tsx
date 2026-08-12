"use client";

import React, { useState } from "react";
import { IProduct } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import EditProductModal from "./EditPorductModal";

interface AdminProductPageProps {
  products: IProduct[];
}

const statusBadge = (status: string) => {
  switch (status) {
    case "available":
      return `
        bg-blue-100 text-blue-700
        dark:bg-blue-500/10 dark:text-blue-400
      `;

    case "sold":
      return `
        bg-green-100 text-green-700
        dark:bg-green-500/10 dark:text-green-400
      `;

    case "pending":
      return `
        bg-yellow-100 text-yellow-700
        dark:bg-yellow-500/10 dark:text-yellow-400
      `;

    case "rejected":
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

const AdminProductPage = ({
  products,
}: AdminProductPageProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<any>(null);

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

      router.refresh();
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
    <div
      className="
        min-h-screen
        bg-gray-50
        p-6
        transition-colors
        duration-300
        dark:bg-gray-950
        md:p-10
      "
    >
      {/* Header */}
      <div
        className="
          mb-6
          flex
          flex-col
          gap-2
          md:flex-row
          md:items-center
          md:justify-between
        "
      >
        <div>
          <h1
            className="
              text-2xl
              font-bold
              text-gray-900
              dark:text-white
            "
          >
            Products
          </h1>

          <p
            className="
              text-sm
              text-gray-500
              dark:text-gray-400
            "
          >
            Manage all listed products in your marketplace
          </p>
        </div>

        <div
          className="
            text-sm
            text-gray-500
            dark:text-gray-400
          "
        >
          Total Products:{" "}
          <span className="font-semibold text-orange-500">
            {products.length}
          </span>
        </div>
      </div>

      {/* Table Card */}
      <div
        className="
          overflow-hidden
          rounded-xl
          border
          border-gray-200
          bg-white
          shadow-sm
          transition-colors
          duration-300

          dark:border-gray-800
          dark:bg-gray-900
        "
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            {/* Table Header */}
            <thead
              className="
                bg-gray-100
                text-left
                text-gray-700

                dark:bg-gray-800
                dark:text-gray-300
              "
            >
              <tr>
                <th className="p-4 font-semibold">
                  Product
                </th>

                <th className="hidden p-4 font-semibold md:table-cell">
                  Category
                </th>

                <th className="hidden p-4 font-semibold lg:table-cell">
                  Price
                </th>

                <th className="hidden p-4 font-semibold lg:table-cell">
                  Condition
                </th>

                <th className="p-4 font-semibold">
                  Status
                </th>

                <th className="p-4 text-right font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr
                    key={product._id}
                    className="
                      border-t
                      border-gray-100
                      transition
                      hover:bg-gray-50

                      dark:border-gray-800
                      dark:hover:bg-gray-800/50
                    "
                  >
                    {/* Product */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={product.images[0]}
                          alt={product.title}
                          className="
                            h-10
                            w-10
                            shrink-0
                            rounded-lg
                            object-cover
                            ring-1
                            ring-gray-100

                            dark:ring-gray-700
                          "
                          width={200}
                          height={200}
                        />

                        <div>
                          <p
                            className="
                              font-medium
                              text-gray-800
                              dark:text-white
                            "
                          >
                            {product.title}
                          </p>

                          {/* Mobile Info */}
                          <div
                            className="
                              space-y-1
                              text-xs
                              text-gray-500

                              dark:text-gray-400

                              md:hidden
                            "
                          >
                            <p>
                              ৳{" "}
                              {product.price.toLocaleString()}
                            </p>

                            <p>
                              {product.category}
                            </p>
                          </div>

                          {/* Tablet Info */}
                          <div
                            className="
                              hidden
                              text-xs
                              text-gray-500

                              dark:text-gray-400

                              md:block
                              lg:hidden
                            "
                          >
                            ৳{" "}
                            {product.price.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td
                      className="
                        hidden
                        p-4
                        text-gray-700

                        dark:text-gray-300

                        md:table-cell
                      "
                    >
                      {product.category}
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
                      ৳{" "}
                      {product.price.toLocaleString()}
                    </td>

                    {/* Condition */}
                    <td
                      className="
                        hidden
                        p-4
                        capitalize
                        text-gray-600

                        dark:text-gray-400

                        lg:table-cell
                      "
                    >
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
                        className={`
                          rounded-md
                          border
                          px-2
                          py-1
                          text-xs
                          font-medium
                          outline-none
                          transition
                          focus:ring-2
                          focus:ring-orange-500/30

                          ${statusBadge(
                            product.status,
                          )}
                        `}
                      >
                        <option value="available">
                          Available
                        </option>

                        <option value="pending">
                          Pending
                        </option>

                        <option value="sold">
                          Sold
                        </option>

                        <option value="rejected">
                          Rejected
                        </option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="p-4">
                      <div
                        className="
                          flex
                          flex-wrap
                          justify-end
                          gap-2
                          text-xs
                        "
                      >
                        {/* View */}
                        <Link
                          href={`/products/${product._id}`}
                          className="
                            rounded-lg
                            border
                            border-blue-200
                            px-3
                            py-1.5
                            font-medium
                            text-blue-600
                            transition

                            hover:bg-blue-50

                            dark:border-blue-500/30
                            dark:text-blue-400
                            dark:hover:bg-blue-500/10
                          "
                        >
                          View
                        </Link>

                        {/* Edit */}
                        <button
                          className="
                            rounded-lg
                            border
                            border-green-200
                            px-3
                            py-1.5
                            font-medium
                            text-green-600
                            transition

                            hover:bg-green-50

                            dark:border-green-500/30
                            dark:text-green-400
                            dark:hover:bg-green-500/10
                          "
                          onClick={() =>
                            handleEdit(product)
                          }
                        >
                          Edit
                        </button>

                        {/* Delete */}
                        <button
                          className="
                            rounded-lg
                            border
                            border-red-200
                            px-3
                            py-1.5
                            font-medium
                            text-red-600
                            transition

                            hover:bg-red-50

                            dark:border-red-500/30
                            dark:text-red-400
                            dark:hover:bg-red-500/10
                          "
                          onClick={() =>
                            deleteProduct(product._id)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
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
                    No products found
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
        <span>
          Total Products: {products.length}
        </span>

        <span>
          Showing all records
        </span>
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

export default AdminProductPage;