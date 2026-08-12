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

  console.log(product._id, "mopro");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/all/products/${product._id}`,
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
      console.log(error);
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
        p-4
        backdrop-blur-sm
      "
    >
      <div
        className="
          max-h-[90vh]
          w-full
          max-w-[500px]
          overflow-y-auto
          rounded-2xl
          border
          border-gray-200
          bg-white
          p-6
          shadow-2xl
          transition-colors
          duration-300

          dark:border-gray-700
          dark:bg-gray-900
        "
      >
        {/* Header */}
        <div className="mb-6">
          <h2
            className="
              text-xl
              font-bold
              text-gray-900

              dark:text-white
            "
          >
            Edit Product
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-gray-500

              dark:text-gray-400
            "
          >
            Update your product information
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name + Category */}
          <div className="flex flex-col gap-4 sm:flex-row">
            {/* Product Name */}
            <div className="w-full">
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-gray-700

                  dark:text-gray-300
                "
              >
                Product Name
              </label>

              <input
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  p-3
                  text-gray-900
                  outline-none
                  transition
                  placeholder:text-gray-400
                  focus:border-orange-500
                  focus:ring-2
                  focus:ring-orange-500/20

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
            <div className="w-full">
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-gray-700

                  dark:text-gray-300
                "
              >
                Category
              </label>

              <select
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  p-3
                  text-gray-900
                  outline-none
                  transition
                  focus:border-orange-500
                  focus:ring-2
                  focus:ring-orange-500/20

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
                <option value="Electronics">
                  Electronics
                </option>

                <option value="Mobile Phones">
                  Mobile Phones
                </option>

                <option value="Laptops">
                  Laptops
                </option>

                <option value="Fashion">
                  Fashion
                </option>

                <option value="Furniture">
                  Furniture
                </option>

                <option value="Vehicles">
                  Vehicles
                </option>
              </select>
            </div>
          </div>

          {/* Condition + Price */}
          <div>
            {/* Condition */}
            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-gray-700

                dark:text-gray-300
              "
            >
              Condition
            </label>

            <select
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                bg-white
                p-3
                text-gray-900
                outline-none
                transition
                focus:border-orange-500
                focus:ring-2
                focus:ring-orange-500/20

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
              <option value="new">
                Brand New
              </option>

              <option value="like-new">
                Like New
              </option>

              <option value="good">
                Good
              </option>

              <option value="fair">
                Fair
              </option>
            </select>

            {/* Price */}
            <label
              className="
                mb-2
                mt-4
                block
                text-sm
                font-medium
                text-gray-700

                dark:text-gray-300
              "
            >
              Price
            </label>

            <input
              type="number"
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                bg-white
                p-3
                text-gray-900
                outline-none
                transition
                placeholder:text-gray-400
                focus:border-orange-500
                focus:ring-2
                focus:ring-orange-500/20

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

          {/* Description */}
          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-gray-700

                dark:text-gray-300
              "
            >
              Description
            </label>

            <textarea
              rows={5}
              className="
                w-full
                resize-none
                rounded-xl
                border
                border-gray-300
                bg-white
                p-3
                text-gray-900
                outline-none
                transition
                placeholder:text-gray-400
                focus:border-orange-500
                focus:ring-2
                focus:ring-orange-500/20

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
              placeholder="Description"
            />
          </div>

          {/* Images Preview */}
          <div>
            <label
              className="
                mb-3
                block
                text-sm
                font-medium
                text-gray-700

                dark:text-gray-300
              "
            >
              Product Images
            </label>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {product.images?.map(
                (img: string, index: number) => (
                  <div
                    key={index}
                    className="
                      overflow-hidden
                      rounded-xl
                      border
                      border-gray-200

                      dark:border-gray-700
                    "
                  >
                    <Image
                      src={img}
                      alt="product"
                      className="
                        h-24
                        w-full
                        object-cover
                        transition
                        hover:scale-105
                      "
                      width={200}
                      height={200}
                    />
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Buttons */}
          <div
            className="
              flex
              flex-col-reverse
              gap-3
              border-t
              border-gray-200
              pt-5

              dark:border-gray-700

              sm:flex-row
              sm:justify-end
            "
          >
            {/* Cancel */}
            <button
              type="button"
              onClick={onClose}
              className="
                rounded-xl
                border
                border-gray-300
                px-5
                py-2.5
                font-medium
                text-gray-700
                transition
                hover:bg-gray-100

                dark:border-gray-700
                dark:text-gray-300
                dark:hover:bg-gray-800
              "
            >
              Cancel
            </button>

            {/* Save */}
            <button
              type="submit"
              className="
                rounded-xl
                bg-orange-500
                px-5
                py-2.5
                font-semibold
                text-white
                transition
                hover:bg-orange-600
                active:scale-[0.98]
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