"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart } from "lucide-react";
import { Product } from "@/types/product";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { data: session, isPending } = useSession();
  console.log(session, "pro");

  useEffect(() => {
    const getWishlistStatus = async () => {
      if (!session?.user?.id) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist/${session.user.id}`,
      );

      const data = await res.json();

      if (data.success) {
        const exists = data.data.some(
          (item: any) => item.productId === product._id,
        );

        setIsWishlisted(exists);
      }
    };

    getWishlistStatus();
  }, [session?.user?.id, product._id]);
  const handleWishlist = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const buyerId = session?.user.id as string;
      console.log(buyerId);

      if (!buyerId) {
        alert("Please login first");
        return;
      }

      if (isWishlisted) {
        // Remove Wishlist
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist/${session?.user.id}/${product._id}`,
          {
            method: "DELETE",
          },
        );

        const data = await res.json();

        if (data.success) {
          setIsWishlisted(false);
          toast.success("remove wishlist");
        }
        if (!data.success) {
          toast.error("not remove wishlist");
        }
      } else {
        // Add Wishlist
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: buyerId,
              productId: product._id,
              productSnapshot: {
                title: product.title,
                price: product.price,
                image: product.images?.[0],
              },
            }),
          },
        );

        const data = await res.json();

        if (data.success) {
          setIsWishlisted(true);
          toast.success("added wishlist");
        }
        if (!data.success) {
          toast.error("not added wishlist");
        }
      }
    } catch (error) {
      console.error("Wishlist Error:", error);
    }
  };

  return (
    <Link href={`/products/${product._id}`}>
      <div className="border border-slate-200 rounded-xl px-3 md:px-4 py-3 bg-white w-full cursor-pointer hover:shadow-lg transition-all duration-300 group">
        {/* Product Image */}
        <div className="flex items-center justify-center overflow-hidden">
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            <Image
              src={product.images?.[0] || "/placeholder-product.jpg"}
              alt={product.title}
              fill
              className="object-contain group-hover:scale-105 transition duration-300"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-3">
          <p className="text-xs text-slate-500">{product.category}</p>

          <h3 className="text-base md:text-lg font-semibold text-slate-800 truncate">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={14}
                className={`${
                  star <= 4
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-slate-300"
                }`}
              />
            ))}
            <span className="text-xs text-slate-500">(4)</span>
          </div>

          {/* Condition */}
          <div className="mt-2">
            <span className="inline-flex px-2 py-1 text-xs rounded-full bg-blue-50 text-blue-600 border border-blue-200">
              {product.condition}
            </span>
          </div>

          {/* Price + Wishlist */}
          <div className="flex items-end justify-between mt-4">
            <div>
              <p className="text-lg md:text-xl font-bold text-orange-600">
                ${product.price.toLocaleString()}
              </p>

              {product.originalPrice && (
                <p className="text-xs text-slate-400 line-through">
                  ${product.originalPrice.toLocaleString()}
                </p>
              )}
            </div>

            <button
              onClick={handleWishlist}
              className="flex items-center justify-center bg-red-50 border border-red-300 p-2 rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition"
            >
              <Heart
                size={18}
                className={isWishlisted ? "fill-red-500 text-red-500" : ""}
              />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
