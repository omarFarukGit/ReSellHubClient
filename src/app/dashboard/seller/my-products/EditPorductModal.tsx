"use client";

import { IProduct } from "@/types/product";
import Image from "next/image";
import { toast } from "react-toastify";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: IProduct;
  setProduct: (data: IProduct) => void;
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
    } catch (error: unknown) {
      toast.error("Something went wrong ❌");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      {/* Modal */}
      <div
        className="
          w-full max-w-2xl
          max-h-[90vh]
          overflow-y-auto
          rounded-2xl
          border
          border-gray-200
          bg-white
          p-6
          shadow-2xl
          dark:border-gray-700
          dark:bg-gray-900
        "
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Edit Product
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Update your product information
            </p>
          </div>

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className="
              flex h-9 w-9 items-center justify-center
              rounded-full
              text-xl
              text-gray-500
              transition
              hover:bg-gray-100
              hover:text-gray-800
              dark:text-gray-400
              dark:hover:bg-gray-800
              dark:hover:text-white
            "
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Product Name + Category */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Product Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Product Name
              </label>

              <input
                className="
                  w-full rounded-xl border
                  border-gray-300
                  bg-white
                  px-4 py-3
                  text-gray-900
                  outline-none
                  transition
                  placeholder:text-gray-400
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/20
                  dark:border-gray-700
                  dark:bg-gray-800
                  dark:text-white
                  dark:placeholder:text-gray-500
                "
                value={product.title || ""}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    title: e.target.value,
                  })
                }
                placeholder="Product Name"
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Category
              </label>

              <select
                className="
                  w-full rounded-xl border
                  border-gray-300
                  bg-white
                  px-4 py-3
                  text-gray-900
                  outline-none
                  transition
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/20
                  dark:border-gray-700
                  dark:bg-gray-800
                  dark:text-white
                "
                value={product.category || ""}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    category: e.target.value,
                  })
                }
              >
                <option value="Electronics">Electronics</option>
                <option value="Mobile Phones">Mobile Phones</option>
                <option value="Laptops">Laptops</option>
                <option value="Fashion">Fashion</option>
                <option value="Furniture">Furniture</option>
                <option value="Vehicles">Vehicles</option>
              </select>
            </div>
          </div>

          {/* Condition + Price */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Condition */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Condition
              </label>

              <select
                className="
                  w-full rounded-xl border
                  border-gray-300
                  bg-white
                  px-4 py-3
                  text-gray-900
                  outline-none
                  transition
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/20
                  dark:border-gray-700
                  dark:bg-gray-800
                  dark:text-white
                "
                value={product.condition || ""}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    condition: e.target.value,
                  })
                }
              >
                <option value="new">Brand New</option>
                <option value="like-new">Like New</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Price
              </label>

              <input
                type="number"
                className="
                  w-full rounded-xl border
                  border-gray-300
                  bg-white
                  px-4 py-3
                  text-gray-900
                  outline-none
                  transition
                  placeholder:text-gray-400
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/20
                  dark:border-gray-700
                  dark:bg-gray-800
                  dark:text-white
                  dark:placeholder:text-gray-500
                "
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
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>

            <textarea
              rows={5}
              className="
                w-full resize-none rounded-xl border
                border-gray-300
                bg-white
                px-4 py-3
                text-gray-900
                outline-none
                transition
                placeholder:text-gray-400
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-500/20
                dark:border-gray-700
                dark:bg-gray-800
                dark:text-white
                dark:placeholder:text-gray-500
              "
              value={product.description || ""}
              onChange={(e) =>
                setProduct({
                  ...product,
                  description: e.target.value,
                })
              }
              placeholder="Write product description..."
            />
          </div>

          {/* Images */}
          <div>
            <label className="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Product Images
            </label>

            {product.images?.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {product.images.map((img: string, index: number) => (
                  <div
                    key={index}
                    className="
                      overflow-hidden rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      dark:border-gray-700
                      dark:bg-gray-800
                    "
                  >
                    <Image
                      src={img}
                      alt={`${product.title} ${index + 1}`}
                      className="h-24 w-full object-cover"
                      width={200}
                      height={200}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="
                  rounded-xl border border-dashed
                  border-gray-300
                  p-6
                  text-center
                  text-sm
                  text-gray-500
                  dark:border-gray-700
                  dark:text-gray-400
                "
              >
                No images available
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-gray-700" />

          {/* Buttons */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="
                rounded-xl
                border
                border-gray-300
                bg-white
                px-5 py-2.5
                font-medium
                text-gray-700
                transition
                hover:bg-gray-100
                dark:border-gray-700
                dark:bg-gray-800
                dark:text-gray-300
                dark:hover:bg-gray-700
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                rounded-xl
                bg-green-600
                px-5 py-2.5
                font-medium
                text-white
                transition
                hover:bg-green-700
                focus:outline-none
                focus:ring-2
                focus:ring-green-500/40
              "
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