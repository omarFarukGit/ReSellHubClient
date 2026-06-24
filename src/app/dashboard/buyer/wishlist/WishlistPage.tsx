"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface WishlistItem {
  _id: string;
  productId: string;
  productSnapshot: {
    title: string;
    price: number;
    image: string;
  };
}

interface Props {
  item: WishlistItem;
  onRemove?: (id: string) => void;
}

export default function WishlistCard({ item, onRemove }: Props) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const handleRemove = async (wishlistId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist/${session?.user.id}/${wishlistId}`,
        {
          method: "DELETE",
        },
      );
      console.log(wishlistId, "wi");

      const data = await res.json();

      if (data.success) {
        toast.success("remove wishlist");
        router.refresh();
      }
      if (!data.success) {
        toast.error("not remove wishlist");
      }
    } catch (error:unknown) {
      console.error(error);
    }
  };
  return (
    <Link href={`/products/${item.productId}`}>
      <div className="border border-slate-200 rounded-xl px-3 md:px-4 py-3 bg-white w-full cursor-pointer hover:shadow-lg transition-all duration-300 group">
        {/* Product Image */}
        <div className="flex items-center justify-center overflow-hidden">
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            <Image
              src={item.productSnapshot.image}
              alt={item.productSnapshot.title}
              fill
              className="object-contain group-hover:scale-105 transition duration-300"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-3">
          <p className="text-xs text-slate-500">Wishlist Item</p>

          <h3 className="text-base md:text-lg font-semibold text-slate-800 line-clamp-2">
            {item.productSnapshot.title}
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

          {/* Wishlist Badge */}
          <div className="mt-2">
            <span className="inline-flex px-2 py-1 text-xs rounded-full bg-red-50 text-red-600 border border-red-200">
              In Wishlist
            </span>
          </div>

          {/* Price + Remove */}
          <div className="flex items-end justify-between mt-4">
            <div>
              <p className="text-lg md:text-xl font-bold text-orange-600">
                ৳ {item.productSnapshot.price.toLocaleString()}
              </p>
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleRemove(item.productId);
              }}
              className="flex items-center justify-center bg-red-50 border border-red-300 p-2 rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
