import Link from "next/link";
import { Heart } from "lucide-react";

export default function EmptyWishlist() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-4 rounded-full bg-pink-100 p-4">
        <Heart className="h-10 w-10 text-pink-500" />
      </div>

      <h2 className="text-2xl font-bold text-gray-800">
        Your Wishlist is Empty
      </h2>

      <p className="mt-2 max-w-md text-gray-500">
        Save products you love to your wishlist and easily find them later.
      </p>

      <Link
        href="/products"
        className="mt-6 rounded-lg bg-orange-500 px-6 py-3 font-medium text-white transition hover:bg-orange-600"
      >
        Explore Products
      </Link>
    </div>
  );
}