import Image from "next/image";
import { Heart } from "lucide-react";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 text-white rounded-2xl overflow-hidden shadow-lg hover:shadow-orange-500/10 hover:border-orange-500/30 transition-all duration-300 flex flex-col h-full group">
      {/* Image Section */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={product.images?.[0] || "/placeholder-product.jpg"}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300" />

        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 z-10 bg-zinc-900/80 backdrop-blur-sm p-2 rounded-full border border-zinc-700 hover:bg-orange-500 hover:border-orange-500 hover:text-white transition">
          <Heart size={18} />
        </button>

        {/* Status Badge */}
        <span
          className={`absolute bottom-3 left-3 z-10 px-3 py-1 text-xs font-medium rounded-full capitalize ${
            product.status === "available"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {product.status}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Title (ONE LINE ONLY) */}
        <h2 className="text-lg font-bold text-white truncate">
          {product.title}
        </h2>

        {/* Category & Condition */}
        <div className="flex gap-2 mt-3 flex-wrap">
          <span className="px-2.5 py-1 text-xs rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
            {product.category}
          </span>

          <span className="px-2.5 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
            {product.condition}
          </span>
        </div>

        {/* Description */}
        <p className="text-zinc-400 text-sm mt-3 line-clamp-3">
          {product.description}
        </p>

        {/* Bottom Section */}
        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-orange-400">
              ৳ {product.price.toLocaleString()}
            </h3>
          </div>

          <button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl font-medium transition-all duration-300">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
