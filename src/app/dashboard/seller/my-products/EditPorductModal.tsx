"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  setProduct: (data: any) => void;
  onSuccess: () => void;
}

const EditProductModal = ({
  isOpen,
  onClose,
  product,
  setProduct,
  onSuccess,
}: Props) => {
  if (!isOpen) return null;

  console.log(product._id, "mopro");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${product._id}/${product.sellerInfo.userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        },
      );

      if (!res.ok) {
        toast.error("Update failed ❌");
        return;
      }

      toast.success("Updated successfully ✅");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error("Something went wrong ❌");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[500px]">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className=" flex gap-2">
            {/* Product Name */}
            <input
              className="w-full border rounded-xl p-3"
              value={product.title || ""}
              onChange={(e) =>
                setProduct({ ...product, title: e.target.value })
              }
              placeholder="Product Name"
            />

            {/* Category */}
            <select
              className="w-full border rounded-xl p-3"
              value={product.category || ""}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
            >
              <option>Electronics</option>
              <option>Mobile Phones</option>
              <option>Laptops</option>
              <option>Fashion</option>
              <option>Furniture</option>
              <option>Vehicles</option>
            </select>
          </div>

          {/* Brand */}
          {/* <input
              className="w-full border rounded-xl p-3"
              value={product.brand || ""}
              onChange={(e) =>
                setProduct({ ...product, brand: e.target.value })
              }
              placeholder="Brand"
            /> */}

          {/* Model */}
          {/* <input
              className="w-full border rounded-xl p-3"
              value={product.model || ""}
              onChange={(e) =>
                setProduct({ ...product, model: e.target.value })
              }
              placeholder="Model"
            /> */}

          <div>
            {/* Condition */}
            <select
              className="w-full border rounded-xl p-3"
              value={product.condition || ""}
              onChange={(e) =>
                setProduct({ ...product, condition: e.target.value })
              }
            >
              <option value="new">Brand New</option>
              <option value="like-new">Like New</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
            </select>

            {/* Price */}
            <input
              type="number"
              className="w-full border rounded-xl p-3 mt-4"
              value={product.price || ""}
              onChange={(e) =>
                setProduct({
                  ...product,
                  price: Number(e.target.value),
                })
              }
              placeholder="Price"
            />
          </div>

          {/* Location */}
          {/* <input
            className="w-full border rounded-xl p-3"
            value={product.location || ""}
            onChange={(e) =>
              setProduct({ ...product, location: e.target.value })
            }
            placeholder="Location"
          /> */}

          {/* Description */}
          <textarea
            rows={5}
            className="w-full border rounded-xl p-3"
            value={product.description || ""}
            onChange={(e) =>
              setProduct({
                ...product,
                description: e.target.value,
              })
            }
            placeholder="Description"
          />

          {/* Images Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {product.images?.map((img: string, index: number) => (
              <Image
                key={index}
                src={img}
                alt="product"
                className="h-24 w-full object-cover rounded-lg border"
                width={200}
                height={200}
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
