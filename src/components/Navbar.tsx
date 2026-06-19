"use client";

import { useState, useEffect } from "react";
import {
  BookOpen,
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  Settings,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { getUserSession } from "@/lib/core/session";

type UserType = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user as UserType | undefined;

  const handleSignOut = async (): Promise<void> => {
    await authClient.signOut();
    router.push("/login");
  };

  // const user = false;

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass = (path: string): string =>
    `font-medium transition-colors ${
      pathname === path
        ? "text-[#F97316]"
        : "text-slate-700 hover:text-blue-600"
    }`;

  const mobileNavClass = (path: string): string =>
    `block px-4 py-3 text-base font-medium rounded-xl transition-colors ${
      pathname === path
        ? "bg-blue-50 text-[#F97316]"
        : "text-slate-900 hover:bg-slate-50"
    }`;

  return (
    <nav
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/70 backdrop-blur-md shadow-sm py-2"
          : "bg-slate-50 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-[#FF6F00] rounded-xl group-hover:rotate-12 transition-transform">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-900">
              ReSellHub
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/" className={navLinkClass("/")}>
              Home
            </Link>

            <Link href="/products" className={navLinkClass("/products")}>
              Products
            </Link>
            <Link href="/categories" className={navLinkClass("/categories")}>
              categories
            </Link>
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <>
                <Link href="/auth/signin">
                  <Button className="font-bold rounded-full px-8 shadow-lg shadow-blue-600/20">
                    Sigin In
                  </Button>
                </Link>

                <Link href="/auth/signup">
                  <Button className="font-bold rounded-full px-8">
                    Sign up
                  </Button>
                </Link>
              </>
            ) : (
              <div className="relative group">
                <button className="flex items-center gap-3 p-1 rounded-full hover:bg-slate-100 transition-colors">
                  <Image
                    width={40}
                    height={40}
                    src={
                      user?.image ||
                      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=400"
                    }
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <div className="text-left hidden lg:block">
                    <p className="text-sm font-bold truncate max-w-25">
                      {user?.name}
                    </p>
                    <p className="text-[10px] text-slate-500">{user?.email}</p>
                  </div>
                </button>

                {/* Dropdown */}
                <div className="absolute right-0 top-12 w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl hidden group-hover:flex flex-col py-2 z-50">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="font-bold text-sm">Welcome back!</p>
                    <p className="text-xs truncate text-slate-500">
                      {user?.email}
                    </p>
                  </div>

                  <Link
                    href="/dashboad"
                    className="px-4 py-2 text-sm hover:bg-slate-100 flex items-center gap-3"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>

                  <Link
                    href="/my-profile"
                    className="px-4 py-2 text-sm hover:bg-slate-100 flex items-center gap-3"
                  >
                    <User className="w-4 h-4" />
                    My profile
                  </Link>
                  <Link
                    href="/setting"
                    className="px-4 py-2 text-sm hover:bg-slate-100 flex items-center gap-3"
                  >
                    <Settings className="w-4 h-4" />
                    Setting
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2 text-sm text-red-500 hover:bg-red-50 flex items-center gap-3 text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 space-y-2 bg-white border-b">
          <Link href="/" className={mobileNavClass("/")}>
            Home
          </Link>

          <Link href="/all-room" className={mobileNavClass("/all-room")}>
            Rooms
          </Link>

          {user && (
            <>
              <Link href="/add-room" className={mobileNavClass("/add-room")}>
                Add Room
              </Link>
              <Link
                href="/my-listing"
                className={mobileNavClass("/my-listing")}
              >
                My Listing
              </Link>
              <Link
                href="/my-booking"
                className={mobileNavClass("/my-booking")}
              >
                My Booking
              </Link>
            </>
          )}

          <div className="pt-4 border-t">
            {user ? (
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl"
              >
                Log Out
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <Link href="/login">
                  <Button variant="bordered" className="w-full rounded-xl">
                    Login
                  </Button>
                </Link>

                <Link href="/register">
                  <Button className="w-full rounded-xl">Join Now</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
