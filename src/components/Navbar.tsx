"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import NavbarWishlist from "./NavbarWislist";
import { ModeToggle } from "./ModeToggle";

type UserType = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string | null;
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user as UserType | undefined;

  const handleSignOut = async () => {
    await authClient.signOut();
    setDropdown(false);
    setIsMenuOpen(false);
    router.push("/");
  };

  const closeMobileMenu = () => setIsMenuOpen(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Role based dashboard
  const getDashboardLink = () => {
    if (!user) return "/dashboard/buyer";

    const role = user.role;

    if (role === "admin") return "/dashboard/admin";
    if (role === "seller") return "/dashboard/seller";

    return "/dashboard/buyer";
  };

  // Role based profile
  const getProfileLink = () => {
    if (!user) return "/profile";

    const role = user.role;

    if (role === "admin") return "/dashboard/admin/profile";
    if (role === "seller") return "/dashboard/seller/profile";

    return "/dashboard/buyer/profile";
  };

  // Desktop nav class
  const navClass = (path: string) =>
    `font-medium transition-colors ${
      pathname === path
        ? "text-orange-500"
        : "text-slate-700 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400"
    }`;

  // Mobile nav class
  const mobileClass = (path: string) =>
    `block px-4 py-3 rounded-xl font-medium transition ${
      pathname === path
        ? "bg-orange-50 text-orange-500 dark:bg-orange-500/10 dark:text-orange-400"
        : "text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
    }`;

  return (
    <nav
      className={`
        sticky top-0 z-50
        border-b
        transition-all duration-300
        ${
          scrolled
            ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm"
            : "bg-white dark:bg-slate-950"
        }
        border-slate-200 dark:border-slate-800
      `}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="ReSellHub"
            width={100}
            height={100}
            className="w-auto h-12 dark:bg-white rounded-full object-contain"
          />
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
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

        {/* DESKTOP RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-3">
          {/* Wishlist */}
          {user?.role === "buyer" && <NavbarWishlist />}

          {/* Theme Toggle */}
          <ModeToggle />

          {!user ? (
            <>
              {/* Sign In */}
              <Link href="/auth/signin">
                <Button className="bg-orange-500 text-white hover:bg-orange-600">
                  Sign In
                </Button>
              </Link>

              {/* Sign Up */}
              <Link href="/auth/signup">
                <Button
                  className="
                    border-slate-300
                    text-slate-700
                    hover:bg-slate-100

                    dark:border-slate-700
                    dark:text-slate-200
                    dark:hover:bg-slate-800
                  "
                >
                  Sign Up
                </Button>
              </Link>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              {/* USER BUTTON */}
              <button
                onClick={() => setDropdown(!dropdown)}
                className="
                  flex items-center gap-2
                  p-1.5
                  rounded-full
                  cursor-pointer
                  transition-colors
                  hover:bg-slate-100
                  dark:hover:bg-slate-800
                "
              >
                <Image
                  src={user.image || "https://ui-avatars.com/api/?name=User"}
                  alt={user.name || "User"}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover"
                  unoptimized
                />

                <div className="hidden lg:block text-left">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {user.name}
                  </p>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {user.email}
                  </p>
                </div>
              </button>

              {/* DROPDOWN */}
              {dropdown && (
                <div
                  className="
                    absolute right-0 top-full mt-3
                    w-60
                    overflow-hidden
                    rounded-xl
                    border
                    shadow-xl
                    bg-white
                    border-slate-200

                    dark:bg-slate-900
                    dark:border-slate-700
                  "
                >
                  {/* Account Header */}
                  <div
                    className="
                      px-4 py-3
                      border-b
                      border-slate-200
                      dark:border-slate-700
                    "
                  >
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      Account
                    </p>

                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {user.email}
                    </p>
                  </div>

                  {/* Dashboard */}
                  <Link
                    href={getDashboardLink()}
                    onClick={() => setDropdown(false)}
                    className="
                      flex items-center gap-3
                      px-4 py-3
                      text-slate-700
                      hover:bg-slate-50

                      dark:text-slate-200
                      dark:hover:bg-slate-800
                      transition-colors
                    "
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>

                  {/* Profile */}
                  <Link
                    href={getProfileLink()}
                    onClick={() => setDropdown(false)}
                    className="
                      flex items-center gap-3
                      px-4 py-3
                      text-slate-700
                      hover:bg-slate-50

                      dark:text-slate-200
                      dark:hover:bg-slate-800
                      transition-colors
                    "
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Link>

                  {/* Logout */}
                  <button
                    onClick={handleSignOut}
                    className="
                      flex w-full items-center gap-3
                      px-4 py-3
                      text-red-500
                      hover:bg-red-50

                      dark:hover:bg-red-500/10
                      transition-colors
                    "
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MOBILE ACTIONS */}
        <div className="md:hidden flex items-center gap-2">
          {/* Dark / Light Mode */}
          <ModeToggle />

          {/* Mobile Menu Button */}
          <button
            className="
              p-2
              rounded-lg
              text-slate-800
              hover:bg-slate-100

              dark:text-white
              dark:hover:bg-slate-800

              transition-colors
            "
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div
          className="
            md:hidden
            px-4 pb-6 pt-3
            space-y-2
            border-t
            bg-white
            border-slate-200

            dark:bg-slate-950
            dark:border-slate-800
          "
        >
          {/* Navigation */}
          <Link href="/" className={mobileClass("/")} onClick={closeMobileMenu}>
            Home
          </Link>

          <Link
            href="/products"
            className={mobileClass("/products")}
            onClick={closeMobileMenu}
          >
            Products
          </Link>

          <Link
            href="/categories"
            className={mobileClass("/categories")}
            onClick={closeMobileMenu}
          >
            Categories
          </Link>

          <Link
            href="/about"
            className={mobileClass("/about")}
            onClick={closeMobileMenu}
          >
            About
          </Link>

          <Link
            href="/contact"
            className={mobileClass("/contact")}
            onClick={closeMobileMenu}
          >
            Contact
          </Link>

          {/* Dashboard */}
          {user && (
            <Link
              href={getDashboardLink()}
              onClick={closeMobileMenu}
              className="
                flex items-center gap-3
                px-4 py-3
                rounded-xl
                text-slate-800
                hover:bg-slate-100

                dark:text-slate-200
                dark:hover:bg-slate-800
                transition-colors
              "
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
          )}

          {/* Mobile Actions */}
          <div
            className="
              pt-4 mt-3
              border-t
              border-slate-200
              dark:border-slate-800
            "
          >
            {!user ? (
              <div className="grid grid-cols-2 gap-3">
                <Link href="/auth/signin" onClick={closeMobileMenu}>
                  <Button className="w-full bg-orange-500 text-white hover:bg-orange-600">
                    Sign In
                  </Button>
                </Link>

                <Link href="/auth/signup" onClick={closeMobileMenu}>
                  <Button
                    className="
                      w-full
                      border-slate-300
                      text-slate-700
                      hover:bg-slate-100

                      dark:border-slate-700
                      dark:text-slate-200
                      dark:hover:bg-slate-800
                    "
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            ) : (
              <button
                onClick={handleSignOut}
                className="
                  flex items-center gap-3
                  w-full
                  px-4 py-3
                  rounded-xl
                  text-red-500
                  hover:bg-red-50

                  dark:hover:bg-red-500/10
                  transition-colors
                "
              >
                <LogOut className="w-4 h-4" />
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
