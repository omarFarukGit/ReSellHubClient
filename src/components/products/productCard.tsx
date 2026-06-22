import Image from "next/image";
import { Heart } from "lucide-react";
import { Product } from "@/types/product";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex flex-col h-full group">
      {/* IMAGE */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={product.images?.[0] || "/placeholder-product.jpg"}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition" />

        {/* wishlist */}
        <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full border border-slate-200 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition">
          <Heart size={18} />
        </button>

        {/* status badge */}
        <span
          className={`absolute bottom-3 left-3 px-3 py-1 text-xs font-medium rounded-full capitalize ${
            product.status === "available"
              ? "bg-green-100 text-green-600 border border-green-200"
              : "bg-red-100 text-red-600 border border-red-200"
          }`}
        >
          {product.status}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col flex-1">
        {/* TITLE */}
        <h2 className="text-lg font-bold text-slate-900 truncate">
          {product.title}
        </h2>

        {/* CATEGORY + CONDITION */}
        <div className="flex gap-2 mt-3 flex-wrap">
          <span className="px-2.5 py-1 text-xs rounded-full bg-orange-50 text-orange-600 border border-orange-200">
            {product.category}
          </span>

          <span className="px-2.5 py-1 text-xs rounded-full bg-blue-50 text-blue-600 border border-blue-200">
            {product.condition}
          </span>
        </div>

        {/* DESCRIPTION */}
        <p className="text-slate-500 text-sm mt-3 line-clamp-3">
          {product.description}
        </p>

        {/* FOOTER */}
        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-orange-600">
              ৳ {product.price.toLocaleString()}
            </h3>
          </div>

          <Link href={`/products/${product._id}`}>
            <button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl font-medium transition shadow-md">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
