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

import {
  ShoppingBag,
  Eye,
  EyeOff,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // SAFE FIX (SSR issue fix)
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

  return (
    <div className="min-h-screen bg-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 p-12 text-white">
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
                <ShoppingBag size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-bold">ResellHub</h1>
                <p className="text-orange-100">Buy • Sell • Trade</p>
              </div>
            </div>

            <h2 className="mt-20 text-5xl font-bold leading-tight">
              Buy & Sell Smarter.
            </h2>

            <p className="mt-6 text-orange-100">
              Discover trusted products and verified sellers.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center bg-gray-50 px-5 py-10">
          <Card className="w-full max-w-md p-8 shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold">Welcome Back</h2>
              <p className="text-gray-500">Sign in to your account</p>
            </div>

            <Form onSubmit={onSubmit} className="space-y-4">
              <TextField name="email" type="email" isRequired>
                <Label>Email</Label>
                <Input placeholder="john@example.com" />
                <FieldError />
              </TextField>

              <TextField name="password" isRequired>
                <Label>Password</Label>

                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className="pr-10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <FieldError />
              </TextField>

              <Button
                type="submit"
                isDisabled={loading}
                className="w-full bg-orange-500 text-white"
              >
                {loading ? "Signing In..." : "Login"}
              </Button>
            </Form>

            <div className="my-6 text-center text-sm text-gray-500">OR</div>

            <Button
              onClick={signIn}
              className=" w-full h-12 border bg-white hover:bg-gray-50 text-black"
            >
              <FaGithub />
              Continue with GitHub
            </Button>

            <p className="mt-6 text-center text-sm">
              Dont have account?{" "}
              <Link href="/auth/signup" className="text-orange-600">
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
