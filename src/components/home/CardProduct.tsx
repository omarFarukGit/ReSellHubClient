"use client";

import Image from "next/image";
import { ShoppingCart, Tag } from "lucide-react";

type Product = {
  title: string;
  category: string;
  condition: string;
  price: number;
  images: string[];
  description: string;
  status: string;
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border border-gray-100
        bg-white
        shadow-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-lg

        dark:border-gray-800
        dark:bg-gray-900
        dark:shadow-gray-950/30
        dark:hover:border-gray-700
        dark:hover:shadow-xl
      "
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={product.images?.[0] || "/placeholder.png"}
          alt={product.title}
          fill
          className="
            object-cover
            transition-transform duration-500
            hover:scale-105
          "
        />

        {/* Status Badge */}
        <span
          className="
            absolute right-3 top-3
            rounded-full
            bg-green-500
            px-3 py-1
            text-xs font-medium
            text-white
            shadow-sm
          "
        >
          {product.status}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3
          className="
            line-clamp-1
            font-semibold
            text-gray-800
            transition-colors
            dark:text-white
          "
        >
          {product.title}
        </h3>

        {/* Category + Condition */}
        <div
          className="
            mt-1
            flex items-center gap-2
            text-xs
            text-gray-500
            dark:text-gray-400
          "
        >
          <Tag className="h-3 w-3 shrink-0" />

          <span>
            {product.category} • {product.condition}
          </span>
        </div>

        {/* Price */}
        <p
          className="
            mt-2
            text-lg font-bold
            text-orange-500
            dark:text-orange-400
          "
        >
          ৳ {product.price}
        </p>

        {/* Description */}
        <p
          className="
            mt-2
            line-clamp-2
            text-sm
            text-gray-500
            dark:text-gray-400
          "
        >
          {product.description}
        </p>

        {/* Button */}
        <button
          className="
            mt-4
            flex w-full
            items-center justify-center gap-2
            rounded-xl
            bg-orange-500
            py-2
            font-medium
            text-white
            transition-all duration-300
            hover:bg-orange-600
            hover:shadow-md
            active:scale-[0.98]

            dark:bg-orange-600
            dark:hover:bg-orange-500
          "
        >
          <ShoppingCart className="h-4 w-4" />
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;