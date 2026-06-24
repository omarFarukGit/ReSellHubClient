import { getUserSession } from "@/lib/core/session";
import React from "react";
import WishlistCard from "./WishlistPage";
import EmptyWishlist from "./WishlistNotFound";

export interface IWishlist {
  _id: string;
  userId: string;
  productId: string;
  productSnapshot: {
    title: string;
    price: number;
    image: string;
  };
  createdAt: string;
  updatedAt: string;
}

const Settings = async () => {
  const user = await getUserSession();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist/${user?.id}`,
  );

  const data = await res.json();
  const wishlist = data.data;

  if (!wishlist.length) {
    return <EmptyWishlist />;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {wishlist.map((item: IWishlist) => (
        <WishlistCard key={item._id} item={item} />
      ))}
    </div>
  );
};

export default Settings;
