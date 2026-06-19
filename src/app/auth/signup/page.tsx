"use client";

import React from "react";
import { Card, Separator } from "@heroui/react";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { FaGithub } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";

const SignUpPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [role, setRole] = React.useState("buyer");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      email: user.email as string,
      password: user.password as string,
      name: user.name as string,
      image: user.image as string,
      fetchOptions: {
        body: {
          role: user.role, // ✅ FIXED
        },
      },
    });

    if (data) {
      toast.success("Account created successfully 🚀");
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
        {/* Left SIDE */}
        <div className="flex items-center justify-center bg-gray-50 px-5 py-10">
          <Card className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">
            {/* HEADER */}
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900">
                Create Account
              </h2>

              <p className="mt-2 text-gray-500">Join ResellHub marketplace</p>
            </div>

            {/* FORM */}
            <Form onSubmit={onSubmit} className="space-y-4">
              <TextField isRequired name="name">
                <Label>Name</Label>
                <Input placeholder="Your name" />
                <FieldError />
              </TextField>

              <TextField isRequired name="email">
                <Label>Email</Label>
                <Input placeholder="john@example.com" />
                <FieldError />
              </TextField>

              <TextField isRequired name="password">
                <Label>Password</Label>
                <Input type="password" placeholder="Create password" />
                <Description>8+ chars, 1 uppercase, 1 number</Description>
                <FieldError />
              </TextField>

              {/* ROLE SELECT (LOGIN STYLE MATCHED CLEAN CARDS) */}
              <div>
                <Label>Select Role</Label>

                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div
                    onClick={() => setRole("buyer")}
                    className={`cursor-pointer rounded-2xl border p-4 transition-all
                      ${
                        role === "buyer"
                          ? "border-orange-500 bg-orange-50 shadow-md"
                          : "border-gray-200 hover:border-orange-300"
                      }`}
                  >
                    <p className="font-semibold">🛒 Buyer</p>
                    <p className="text-xs text-gray-500">Purchase products</p>
                  </div>

                  <div
                    onClick={() => setRole("seller")}
                    className={`cursor-pointer rounded-2xl border p-4 transition-all
                      ${
                        role === "seller"
                          ? "border-orange-500 bg-orange-50 shadow-md"
                          : "border-gray-200 hover:border-orange-300"
                      }`}
                  >
                    <p className="font-semibold">🏪 Seller</p>
                    <p className="text-xs text-gray-500">Sell products</p>
                  </div>
                </div>
              </div>

              {/* BUTTON */}
              <Button
                type="submit"
                className="w-full h-12 bg-orange-500 text-white hover:bg-orange-600"
              >
                Create Account
              </Button>
            </Form>

            {/* DIVIDER */}
            <div className="my-6 flex items-center gap-3">
              <Separator className="flex-1" />
              <span className="text-sm text-gray-500">Or continue</span>
              <Separator className="flex-1" />
            </div>

            {/* GITHUB */}
            <Button
              onClick={signIn}
              className="h-12 w-full border bg-transparent text-orange-500"
            >
              <FaGithub />
              Continue with GitHub
            </Button>

            {/* LOGIN LINK */}
            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href={`/signin?redirect=${redirectTo}`}
                className="text-orange-600 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </Card>
        </div>
        {/* Right SIDE (MATCH LOGIN STYLE) */}
        <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 p-12 text-white">
          <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-60 w-60 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10">
            <h1 className="text-3xl font-bold">ResellHub</h1>
            <p className="text-orange-100">Buy • Sell • Trade</p>

            <h2 className="mt-20 text-5xl font-bold leading-tight">
              Start Selling <br /> Smarter Today
            </h2>

            <p className="mt-6 max-w-lg text-lg text-orange-100">
              Join thousands of buyers and sellers on a trusted marketplace.
            </p>

            <div className="mt-12 space-y-5">
              <p>✔ Verified Community</p>
              <p>✔ Secure Transactions</p>
              <p>✔ Fast Listings</p>
            </div>
          </div>

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
              <p className="text-orange-100">Trust</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
