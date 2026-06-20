"use client";

import { useState, useEffect } from "react";
import {
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

type UserType = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user as UserType | undefined;

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navClass = (path: string) =>
    `font-medium transition-colors ${
      pathname === path
        ? "text-orange-500"
        : "text-slate-700 hover:text-orange-500"
    }`;

  const mobileClass = (path: string) =>
    `block px-4 py-3 rounded-xl font-medium transition ${
      pathname === path
        ? "bg-orange-50 text-orange-500"
        : "text-slate-900 hover:bg-slate-100"
    }`;

  return (
    <nav
      className={`sticky top-0 z-50 transition-all ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm py-2"
          : "bg-white py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <div className="p-2 bg-orange-500 rounded-xl">
            <ShoppingCart className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">ReSellHub</span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-8">
          <Link href="/" className={navClass("/")}>
            Home
          </Link>
          <Link href="/products" className={navClass("/products")}>
            Products
          </Link>
          <Link href="/categories" className={navClass("/categories")}>
            Categories
          </Link>
          <Link href="/about" className={navClass("/about")}>
            About
          </Link>
          <Link href="/contact" className={navClass("/contact")}>
            Contact
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <>
              <Link href="/auth/signin">
                <Button className="bg-orange-500 text-white hover:bg-orange-600">
                  Sign In
                </Button>
              </Link>

              <Link href="/auth/signup">
                <Button variant="bordered">Sign Up</Button>
              </Link>
            </>
          ) : (
            <div className="relative">
              {/* USER BUTTON */}
              <button
                onClick={() => setDropdown(!dropdown)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100"
              >
                <Image
                  src={user?.image || "https://ui-avatars.com/api/?name=User"}
                  alt="user"
                  width={40}
                  height={40}
                  className="rounded-full"
                />

                <div className="hidden lg:block text-left">
                  <p className="text-sm font-semibold">{user?.name}</p>
                  <p className="text-[11px] text-slate-500">{user?.email}</p>
                </div>
              </button>

              {/* DROPDOWN */}
              {dropdown && (
                <div className="absolute right-0 mt-3 w-56 bg-white border rounded-xl shadow-lg overflow-hidden">
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm font-semibold">Account</p>
                    <p className="text-xs text-slate-500 truncate">
                      {user?.email}
                    </p>
                  </div>

                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>

                  <Link
                    href="/my-profile"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Link>

                  <Link
                    href="/settings"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-6 space-y-2 bg-white border-t">
          <Link href="/" className={mobileClass("/")}>
            Home
          </Link>
          <Link href="/products" className={mobileClass("/products")}>
            Products
          </Link>
          <Link href="/categories" className={mobileClass("/categories")}>
            Categories
          </Link>
          <Link href="/about" className={mobileClass("/about")}>
            About
          </Link>
          <Link href="/contact" className={mobileClass("/contact")}>
            Contact
          </Link>

          <div className="pt-4 border-t">
            {!user ? (
              <div className="grid grid-cols-2 gap-3">
                <Link href="/auth/signin">
                  <Button className="w-full">Login</Button>
                </Link>

                <Link href="/auth/signup">
                  <Button variant="bordered" className="w-full">
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-3 text-red-500"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
