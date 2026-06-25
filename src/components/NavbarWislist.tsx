"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const NavbarWishlist = () => {
  const [count, setCount] = useState(0);
  const router = useRouter();

  const { data: session } = authClient.useSession();

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!session?.user?.id) return;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist/${session.user.id}`,
        );

        const data = await res.json();

        setCount(data?.data?.length || 0);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWishlist();
  }, [session?.user?.id]);

  return (
    <Link href="/wishlist" className="relative">
      <Heart className="h-6 w-6" />

      <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
        {count}
      </span>
    </Link>
  );
};

export default NavbarWishlist;
