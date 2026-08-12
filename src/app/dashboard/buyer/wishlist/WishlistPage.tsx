"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Trash2 } from "lucide-react";
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
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <Link href={`/products/${item.productId}`}>
      <div
        className="
          w-full cursor-pointer rounded-xl
          border border-slate-200 bg-white
          px-3 py-3
          transition-all duration-300
          hover:shadow-lg
          group

          dark:border-slate-700
          dark:bg-slate-900
          dark:hover:border-slate-600
          dark:hover:shadow-black/20
        "
      >
        {/* Product Image */}
        <div
          className="
            flex items-center justify-center overflow-hidden
            rounded-lg
            bg-slate-50
            dark:bg-slate-800
          "
        >
          <div className="relative h-32 w-32 md:h-40 md:w-40">
            <Image
              src={item.productSnapshot.image}
              alt={item.productSnapshot.title}
              fill
              className="
                object-contain
                transition duration-300
                group-hover:scale-105
              "
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-3">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Wishlist Item
          </p>

          <h3
            className="
              line-clamp-2
              text-base font-semibold
              text-slate-800
              md:text-lg

              dark:text-slate-100
            "
          >
            {item.productSnapshot.title}
          </h3>

          {/* Rating */}
          <div className="mt-1 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={14}
                className={
                  star <= 4
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-slate-300 dark:text-slate-600"
                }
              />
            ))}

            <span className="text-xs text-slate-500 dark:text-slate-400">
              (4)
            </span>
          </div>

          {/* Wishlist Badge */}
          <div className="mt-2">
            <span
              className="
                inline-flex rounded-full
                border border-red-200
                bg-red-50
                px-2 py-1
                text-xs text-red-600

                dark:border-red-900/60
                dark:bg-red-950/40
                dark:text-red-400
              "
            >
              In Wishlist
            </span>
          </div>

          {/* Price + Remove */}
          <div className="mt-4 flex items-end justify-between">
            <div>
              <p
                className="
                  text-lg font-bold
                  text-orange-600
                  md:text-xl

                  dark:text-orange-400
                "
              >
                ৳ {item.productSnapshot.price.toLocaleString()}
              </p>
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleRemove(item.productId);
              }}
              className="
                flex items-center justify-center
                rounded-lg
                border border-red-300
                bg-red-50
                p-2
                text-red-500
                transition

                hover:bg-red-500
                hover:text-white

                dark:border-red-900/60
                dark:bg-red-950/40
                dark:text-red-400
                dark:hover:bg-red-600
                dark:hover:text-white
              "
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}