"use client";

import Image from "next/image";
import { MapPin, ShoppingCart, Tag } from "lucide-react";

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
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden">

      {/* Image */}
      <div className="relative h-48 w-full">
        <Image
          src={product.images?.[0] || "/placeholder.png"}
          alt={product.title}
          fill
          className="object-cover"
        />

        {/* Status Badge */}
        <span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
          {product.status}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">

        {/* Title */}
        <h3 className="font-semibold text-gray-800 line-clamp-1">
          {product.title}
        </h3>

        {/* Category + Condition */}
        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
          <Tag className="w-3 h-3" />
          {product.category} • {product.condition}
        </div>

        {/* Price */}
        <p className="text-orange-500 font-bold mt-2 text-lg">
          ৳ {product.price}
        </p>

        {/* Description */}
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          {product.description}
        </p>

        {/* Button */}
        <button className="mt-4 w-full flex items-center justify-center gap-2 bg-orange-500 text-white py-2 rounded-xl hover:bg-orange-600 transition">
          <ShoppingCart className="w-4 h-4" />
          View Details
        </button>

      </div>
    </div>
  );
};

export default ProductCard;