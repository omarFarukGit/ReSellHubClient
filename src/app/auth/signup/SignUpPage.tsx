"use client";

import React, { useState } from "react";
import {
  Card,
  Description,
  FieldError,
  Separator,
  Button,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { EyeOff, Eye } from "lucide-react";

const SignUpPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams?.get("redirect") ?? "/";

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const [loading, setLoading] = useState(false);

  const createUserProfile = async (payload: any) => {
    await fetch("/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const user = Object.fromEntries(formData.entries());

      const payload = {
        name: user.name as string,
        email: user.email as string,
        password: user.password as string,
        photo: user.photo as string,
        phone: user.phone as string,
        location: user.location as string,
        role,
      };

      const { data, error } = await authClient.signUp.email({
        email: payload.email,
        password: payload.password,
        name: payload.name,
        image: "https://i.ibb.co/fdmzM1Kr/profile-icon.png",

        fetchOptions: {
          body: {
            role: payload.role,
            phone: payload.phone,
            location: payload.location,
            status: "active",
          },
        },
      });

      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }

      if (data) {
        await createUserProfile({
          name: payload.name,
          email: payload.email,
          photo: payload.photo || "",
          role: payload.role,
          phone: payload.phone || "",
          location: payload.location || "",
          status: "active",
          verified: false,
        });

        toast.success("Account created successfully 🚀");
        router.push(redirectTo);
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const signInGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* =====================================================
            LEFT SIDE - FORM
        ====================================================== */}
        <div className="flex items-center justify-center bg-gray-50 px-5 py-10 dark:bg-zinc-950">
          <Card
            className="
              w-full
              max-w-xl
              border
              border-gray-200
              bg-white
              p-8
              shadow-xl
              dark:border-zinc-800
              dark:bg-zinc-900
              dark:shadow-black/30
            "
          >
            {/* Header */}
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Create Account
              </h2>

              <p className="mt-2 text-gray-500 dark:text-zinc-400">
                Join ResellHub marketplace
              </p>
            </div>

            {/* =================================================
                FORM
            ================================================== */}
            <Form onSubmit={onSubmit} className="space-y-5">
              {/* Full Name */}
              {/* Full Name */}
              <TextField isRequired name="name" className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700 dark:text-zinc-200">
                  Full Name
                </Label>

                <Input
                  placeholder="Md. Rakib Hasan"
                  className="
      h-12
      w-full
      rounded-xl
      border
      border-gray-200
      bg-gray-50
      px-4
      text-sm
      text-gray-900
      shadow-sm
      outline-none
      transition-all
      duration-200
      placeholder:text-gray-400

      hover:border-orange-300
      hover:bg-white

      focus:border-orange-500
      focus:bg-white
      focus:ring-4
      focus:ring-orange-500/10

      dark:border-zinc-700
      dark:bg-zinc-800/80
      dark:text-white
      dark:placeholder:text-zinc-500

      dark:hover:border-orange-500/50
      dark:hover:bg-zinc-800

      dark:focus:border-orange-500
      dark:focus:bg-zinc-800
      dark:focus:ring-orange-500/10
    "
                />

                <FieldError className="text-xs text-red-500" />
              </TextField>

              {/* Email */}
              <TextField isRequired name="email" className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700 dark:text-zinc-200">
                  Email Address
                </Label>

                <Input
                  type="email"
                  placeholder="rakib@gmail.com"
                  className="
      h-12
      w-full
      rounded-xl
      border
      border-gray-200
      bg-gray-50
      px-4
      text-sm
      text-gray-900
      shadow-sm
      outline-none
      transition-all
      duration-200
      placeholder:text-gray-400

      hover:border-orange-300
      hover:bg-white

      focus:border-orange-500
      focus:bg-white
      focus:ring-4
      focus:ring-orange-500/10

      dark:border-zinc-700
      dark:bg-zinc-800/80
      dark:text-white
      dark:placeholder:text-zinc-500

      dark:hover:border-orange-500/50
      dark:hover:bg-zinc-800

      dark:focus:border-orange-500
      dark:focus:bg-zinc-800
      dark:focus:ring-orange-500/10
    "
                />

                <FieldError className="text-xs text-red-500" />
              </TextField>

              {/* Password */}
              <TextField name="password" isRequired className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700 dark:text-zinc-200">
                  Password
                </Label>

                <div className="group relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="
        h-12
        w-full
        rounded-xl
        border
        border-gray-200
        bg-gray-50
        px-4
        pr-12
        text-sm
        text-gray-900
        shadow-sm
        outline-none
        transition-all
        duration-200
        placeholder:text-gray-400

        hover:border-orange-300
        hover:bg-white

        focus:border-orange-500
        focus:bg-white
        focus:ring-4
        focus:ring-orange-500/10

        dark:border-zinc-700
        dark:bg-zinc-800/80
        dark:text-white
        dark:placeholder:text-zinc-500

        dark:hover:border-orange-500/50
        dark:hover:bg-zinc-800

        dark:focus:border-orange-500
        dark:focus:bg-zinc-800
        dark:focus:ring-orange-500/10
      "
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="
        absolute
        right-3
        top-1/2
        flex
        h-8
        w-8
        -translate-y-1/2
        items-center
        justify-center
        rounded-lg
        text-gray-400
        transition-all

        hover:bg-orange-50
        hover:text-orange-500

        dark:text-zinc-400
        dark:hover:bg-orange-500/10
        dark:hover:text-orange-400
      "
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <Description className="text-xs text-gray-500 dark:text-zinc-500">
                  Minimum 8 characters recommended
                </Description>

                <FieldError className="text-xs text-red-500" />
              </TextField>

              {/* Phone + Location */}
              <div className="grid gap-5 md:grid-cols-2">
                {/* Phone */}
                <TextField isRequired name="phone" className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700 dark:text-zinc-200">
                    Phone Number
                  </Label>

                  <Input
                    required
                    type="tel"
                    placeholder="+8801712345678"
                    className="
        h-12
        w-full
        rounded-xl
        border
        border-gray-200
        bg-gray-50
        px-4
        text-sm
        text-gray-900
        shadow-sm
        outline-none
        transition-all
        duration-200
        placeholder:text-gray-400

        hover:border-orange-300
        hover:bg-white

        focus:border-orange-500
        focus:bg-white
        focus:ring-4
        focus:ring-orange-500/10

        dark:border-zinc-700
        dark:bg-zinc-800/80
        dark:text-white
        dark:placeholder:text-zinc-500

        dark:hover:border-orange-500/50
        dark:hover:bg-zinc-800

        dark:focus:border-orange-500
        dark:focus:bg-zinc-800
        dark:focus:ring-orange-500/10
      "
                  />

                  <FieldError className="text-xs text-red-500" />
                </TextField>

                {/* Location */}
                <TextField isRequired name="location" className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700 dark:text-zinc-200">
                    Location
                  </Label>

                  <Input
                    placeholder="Dhaka, Bangladesh"
                    className="
        h-12
        w-full
        rounded-xl
        border
        border-gray-200
        bg-gray-50
        px-4
        text-sm
        text-gray-900
        shadow-sm
        outline-none
        transition-all
        duration-200
        placeholder:text-gray-400

        hover:border-orange-300
        hover:bg-white

        focus:border-orange-500
        focus:bg-white
        focus:ring-4
        focus:ring-orange-500/10

        dark:border-zinc-700
        dark:bg-zinc-800/80
        dark:text-white
        dark:placeholder:text-zinc-500

        dark:hover:border-orange-500/50
        dark:hover:bg-zinc-800

        dark:focus:border-orange-500
        dark:focus:bg-zinc-800
        dark:focus:ring-orange-500/10
      "
                  />

                  <FieldError className="text-xs text-red-500" />
                </TextField>
              </div>

              {/* =================================================
                  ROLE
              ================================================== */}
              <div>
                <Label className="text-gray-700 dark:text-zinc-200">
                  Select Role
                </Label>

                <div className="mt-3 grid grid-cols-2 gap-4">
                  {/* Buyer */}
                  <div
                    onClick={() => setRole("buyer")}
                    className={`
                      cursor-pointer
                      rounded-2xl
                      border
                      p-4
                      text-center
                      transition-all

                      ${
                        role === "buyer"
                          ? `
                            border-orange-500
                            bg-orange-50
                            shadow-sm
                            dark:border-orange-500
                            dark:bg-orange-500/10
                          `
                          : `
                            border-gray-200
                            hover:border-orange-300
                            dark:border-zinc-700
                            dark:hover:border-orange-500
                          `
                      }
                    `}
                  >
                    <div className="mb-2 text-3xl">🛒</div>

                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Buyer
                    </h3>

                    <p className="mt-1 text-xs text-gray-500 dark:text-zinc-400">
                      Purchase products
                    </p>
                  </div>

                  {/* Seller */}
                  <div
                    onClick={() => setRole("seller")}
                    className={`
                      cursor-pointer
                      rounded-2xl
                      border
                      p-4
                      text-center
                      transition-all

                      ${
                        role === "seller"
                          ? `
                            border-orange-500
                            bg-orange-50
                            shadow-sm
                            dark:border-orange-500
                            dark:bg-orange-500/10
                          `
                          : `
                            border-gray-200
                            hover:border-orange-300
                            dark:border-zinc-700
                            dark:hover:border-orange-500
                          `
                      }
                    `}
                  >
                    <div className="mb-2 text-3xl">🏪</div>

                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Seller
                    </h3>

                    <p className="mt-1 text-xs text-gray-500 dark:text-zinc-400">
                      Sell your products
                    </p>
                  </div>
                </div>
              </div>

              {/* Create Account */}
              <Button
                type="submit"
                isDisabled={loading}
                className="
                  h-12
                  w-full
                  bg-orange-500
                  font-semibold
                  text-white
                  hover:bg-orange-600
                  dark:bg-orange-500
                  dark:hover:bg-orange-600
                "
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </Form>

            {/* =================================================
                DIVIDER
            ================================================== */}
            <div className="my-6 flex items-center gap-3">
              <Separator className="flex-1 bg-gray-200 dark:bg-zinc-700" />

              <span className="whitespace-nowrap text-sm text-gray-500 dark:text-zinc-500">
                Or continue with
              </span>

              <Separator className="flex-1 bg-gray-200 dark:bg-zinc-700" />
            </div>

            {/* =================================================
                GITHUB
            ================================================== */}
            {/* GitHub */}
            <Button
              onClick={signInGoogle}
              className="
                h-12
                w-full
                border
                border-gray-300
                bg-white
                text-black
                hover:bg-gray-50
                dark:border-zinc-700
                dark:bg-zinc-800
                dark:text-white
                dark:hover:bg-zinc-700
              "
            >
              <FaGoogle size={18} />
              Continue with Google
            </Button>

            {/* Login */}
            <p className="mt-6 text-center text-sm text-gray-600 dark:text-zinc-400">
              Already have an account?{" "}
              <Link
                href={`/auth/signin?redirect=${redirectTo}`}
                className="
                  font-semibold
                  text-orange-600
                  hover:text-orange-700
                  dark:text-orange-400
                  dark:hover:text-orange-300
                "
              >
                Login
              </Link>
            </p>
          </Card>
        </div>

        {/* =====================================================
            RIGHT SIDE - HERO
        ====================================================== */}
        <div
          className="
            relative
            hidden
            overflow-hidden
            bg-gradient-to-br
            from-orange-500
            via-orange-600
            to-orange-700
            p-12
            text-white
            lg:flex
            flex-col
            justify-between
          "
        >
          {/* Decorative Circle */}
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10" />

          <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-black/10" />

          {/* Content */}
          <div className="relative z-10">
            <h1 className="text-4xl font-bold">ResellHub</h1>

            <p className="mt-2 text-orange-100">Buy • Sell • Trade</p>

            <h2 className="mt-24 text-5xl font-bold leading-tight">
              Start Selling
              <br />
              Smarter Today
            </h2>

            <p className="mt-6 max-w-md text-lg text-orange-100">
              Join thousands of buyers and sellers on Bangladesh&apos;s trusted
              marketplace.
            </p>
          </div>

          {/* Stats */}
          <div className="relative z-10 grid grid-cols-3 gap-6">
            <div>
              <h3 className="text-4xl font-bold">10K+</h3>

              <p className="text-orange-100">Products</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold">5K+</h3>

              <p className="text-orange-100">Users</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold">99%</h3>

              <p className="text-orange-100">Trust Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
