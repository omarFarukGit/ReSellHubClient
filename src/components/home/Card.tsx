"use client";

import Image from "next/image";
import { Heart, ShoppingCart, MapPin } from "lucide-react";

type ProductCardProps = {
  product: {
    name: string;
    price: string;
    location: string;
    image: string;
  };
};

const Card = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group">
      {/* Image */}
      <div className="relative h-48 w-full">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition"
        />

        {/* Like Icon */}
        <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow">
          <Heart className="w-4 h-4 text-red-500" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 line-clamp-1">
          {product.name}
        </h3>

        <p className="text-orange-500 font-bold mt-1">{product.price}</p>

        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {product.location}
        </p>

        <button className="mt-4 w-full flex items-center justify-center gap-2 bg-orange-500 text-white py-2 rounded-xl hover:bg-orange-600 transition">
          <ShoppingCart className="w-4 h-4" />
          View Details
        </button>
      </div>
    </div>
  );
};

export default Card;
