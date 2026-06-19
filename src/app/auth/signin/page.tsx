"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  Separator,
  TextField,
} from "@heroui/react";

import { toast } from "react-toastify";
import { FaGithub } from "react-icons/fa";

import {
  ShoppingBag,
  CheckCircle2,
  ShieldCheck,
  Package,
  Eye,
  EyeOff,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirect") || "/";

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

  return (
    <div className="min-h-screen bg-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Side */}
        <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 p-12 text-white">
          {/* Blur Effects */}
          <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-60 w-60 rounded-full bg-white/10 blur-3xl" />

          {/* Logo */}
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                <ShoppingBag size={28} />
              </div>

              <div>
                <h1 className="text-3xl font-bold">ResellHub</h1>
                <p className="text-orange-100">Buy • Sell • Trade</p>
              </div>
            </div>

            <div className="mt-20">
              <h2 className="text-5xl font-bold leading-tight">
                Buy & Sell
                <br />
                Smarter.
              </h2>

              <p className="mt-6 max-w-lg text-lg text-orange-100">
                Discover trusted products, connect with verified sellers, and
                enjoy a safer marketplace experience.
              </p>
            </div>

            {/* Features */}
            <div className="mt-12 space-y-5">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={22} />
                <span>Verified Sellers</span>
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck size={22} />
                <span>Secure Transactions</span>
              </div>

              <div className="flex items-center gap-3">
                <Package size={22} />
                <span>Thousands of Listings</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="relative z-10 grid grid-cols-3 gap-6">
            <div>
              <h3 className="text-3xl font-bold">10K+</h3>
              <p className="text-orange-100">Products</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">5K+</h3>
              <p className="text-orange-100">Users</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">99%</h3>
              <p className="text-orange-100">Trust Rate</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center bg-gray-50 px-5 py-10">
          <Card className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">
            {/* Mobile Logo */}
            <div className="mb-8 text-center lg:hidden">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500 text-white">
                <ShoppingBag size={28} />
              </div>

              <h1 className="mt-4 text-3xl font-bold">ResellHub</h1>
            </div>

            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>

              <p className="mt-2 text-gray-500">Sign in to your account</p>
            </div>

            <Form onSubmit={onSubmit} className="space-y-4">
              <TextField
                isRequired
                name="email"
                type="email"
                className="w-full"
              >
                <Label>Email Address</Label>

                <Input placeholder="john@example.com" />

                <FieldError />
              </TextField>

              <TextField
                isRequired
                name="password"
                type={showPassword ? "text" : "password"}
                className="w-full"
              >
                <Label>Password</Label>

                <div className="relative w-full">
                  <Input
                    placeholder="Enter your password"
                    className="w-full pr-10"
                    type={showPassword ? "text" : "password"}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <Description>Enter your account password</Description>

                <FieldError />
              </TextField>

              <div className="flex w-full items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600">
                  <input type="checkbox" />
                  Remember me
                </label>

                <Link
                  href="/forgot-password"
                  className="font-medium text-orange-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                isDisabled={loading}
                className="h-12 w-full bg-orange-500 text-white hover:bg-orange-600"
              >
                {loading ? "Signing In..." : "Login"}
              </Button>
            </Form>

            <div className="my-6 flex items-center gap-3">
              <Separator className="flex-1" />

              <span className="text-sm text-gray-500">Or continue with</span>

              <Separator className="flex-1" />
            </div>

            <Button onClick={signIn} variant="outline" className="h-12 w-full">
              <FaGithub className="text-lg" />
              Continue with GitHub
            </Button>

            <p className="mt-6 text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href={`/auth/signup?redirect=${redirectTo}`}
                className="font-semibold text-orange-600 hover:underline"
              >
                Create Account
              </Link>
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
