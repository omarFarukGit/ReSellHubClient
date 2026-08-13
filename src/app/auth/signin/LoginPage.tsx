"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import { toast } from "react-toastify";
import { FaGithub } from "react-icons/fa";
import { ShoppingBag, Eye, EyeOff } from "lucide-react";

import { authClient } from "@/lib/auth-client";

const demoUsers = {
  seller: {
    email: "seller@gamil.com",
    password: "getOnly1",
  },
  buyer: {
    email: "buyer@gmail.com",
    password: "getOnly1",
  },
  admin: {
    email: "admin@example.com",
    password: "getOnly1",
  },
};

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirectTo = searchParams?.get("redirect") ?? "/";

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email as string,
      password: user.password as string,
    });

    setLoading(false);

    if (data) {
      toast.success("Login successful");
      router.push(redirectTo);
    }

    if (error) {
      toast.error(error.message);
    }
  };

  const signIn = async () => {
    await authClient.signIn.social({
      provider: "github",
    });
  };

  const handleDemoLogin = (role: keyof typeof demoUsers) => {
    const user = demoUsers[role];

    setEmail(user.email);
    setPassword(user.password);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* ================= LEFT SIDE ================= */}
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 p-12 text-white lg:flex flex-col justify-between">

          <div className="relative z-10">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                <ShoppingBag size={28} />
              </div>

              <div>
                <h1 className="text-3xl font-bold">
                  ResellHub
                </h1>

                <p className="text-orange-100">
                  Buy • Sell • Trade
                </p>
              </div>
            </div>

            {/* Hero Text */}
            <h2 className="mt-20 text-5xl font-bold leading-tight">
              Buy & Sell Smarter.
            </h2>

            <p className="mt-6 max-w-md text-lg text-orange-100">
              Discover trusted products and verified sellers.
            </p>
          </div>

          {/* Bottom Text */}
          <div className="relative z-10 text-sm text-orange-100">
            © 2026 ResellHub. All rights reserved.
          </div>

          {/* Decorative circles */}
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10" />
          <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-black/10" />
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-5 py-10 dark:bg-zinc-950">

          <Card
            className="
              w-full max-w-md
              border border-gray-200
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
                Welcome Back
              </h2>

              <p className="mt-2 text-gray-500 dark:text-zinc-400">
                Sign in to your account
              </p>
            </div>

            {/* ================= DEMO LOGIN ================= */}
            <div className="space-y-3">
              <p className="text-center text-sm font-medium text-gray-500 dark:text-zinc-400">
                Quick Demo Login
              </p>

              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleDemoLogin("seller")}
                  className="
                    border-gray-300
                    bg-white
                    text-gray-700
                    hover:bg-gray-100
                    dark:border-zinc-700
                    dark:bg-zinc-800
                    dark:text-zinc-200
                    dark:hover:bg-zinc-700
                  "
                >
                  Seller
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleDemoLogin("buyer")}
                  className="
                    border-gray-300
                    bg-white
                    text-gray-700
                    hover:bg-gray-100
                    dark:border-zinc-700
                    dark:bg-zinc-800
                    dark:text-zinc-200
                    dark:hover:bg-zinc-700
                  "
                >
                  Buyer
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleDemoLogin("admin")}
                  className="
                    border-gray-300
                    bg-white
                    text-gray-700
                    hover:bg-gray-100
                    dark:border-zinc-700
                    dark:bg-zinc-800
                    dark:text-zinc-200
                    dark:hover:bg-zinc-700
                  "
                >
                  Admin
                </Button>
              </div>
            </div>

            {/* ================= FORM ================= */}
            <Form onSubmit={onSubmit} className="mt-6 space-y-5">

              {/* Email */}
              <TextField name="email" type="email" isRequired>
                <Label className="text-gray-700 dark:text-zinc-200">
                  Email
                </Label>

                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="
                    bg-white
                    text-gray-900
                    dark:bg-zinc-800
                    dark:text-white
                  "
                />

                <FieldError />
              </TextField>

              {/* Password */}
              <TextField name="password" isRequired>
                <Label className="text-gray-700 dark:text-zinc-200">
                  Password
                </Label>

                <div className="relative">
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className="
                      w-full
                      pr-10
                      bg-white
                      text-gray-900
                      dark:bg-zinc-800
                      dark:text-white
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      text-gray-500
                      hover:text-gray-700
                      dark:text-zinc-400
                      dark:hover:text-white
                    "
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                <FieldError />
              </TextField>

              {/* Login Button */}
              <Button
                type="submit"
                isDisabled={loading}
                className="
                  w-full
                  bg-orange-500
                  text-white
                  hover:bg-orange-600
                  dark:bg-orange-500
                  dark:hover:bg-orange-600
                "
              >
                {loading ? "Signing In..." : "Login"}
              </Button>
            </Form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200 dark:bg-zinc-700" />

              <span className="text-sm text-gray-500 dark:text-zinc-500">
                OR
              </span>

              <div className="h-px flex-1 bg-gray-200 dark:bg-zinc-700" />
            </div>

            {/* GitHub */}
            <Button
              onClick={signIn}
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
              <FaGithub size={18} />
              Continue with GitHub
            </Button>

            {/* Signup */}
            <p className="mt-6 text-center text-sm text-gray-600 dark:text-zinc-400">
              Don't have an account?{" "}

              <Link
                href="/auth/signup"
                className="
                  font-medium
                  text-orange-600
                  hover:text-orange-700
                  dark:text-orange-400
                  dark:hover:text-orange-300
                "
              >
                Sign up
              </Link>
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;