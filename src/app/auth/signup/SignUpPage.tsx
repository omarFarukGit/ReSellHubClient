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

  // ✅ SAFE FIX (prevents Vercel build crash)
  const redirectTo = searchParams?.get("redirect") ?? "/";

  const [role, setRole] = React.useState<"buyer" | "seller">("buyer");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    // ✅ FIX: proper payload
    const payload = {
      name: user.name as string,
      email: user.email as string,
      password: user.password as string,
      image: user.image as string,
      role,
    };

    const { data, error } = await authClient.signUp.email({
      email: payload.email,
      password: payload.password,
      name: payload.name,
      image: payload.image,
      fetchOptions: {
        body: {
          role: payload.role,
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

        {/* LEFT SIDE FORM */}
        <div className="flex items-center justify-center bg-gray-50 px-5 py-10">
          <Card className="w-full max-w-md p-8 shadow-xl">

            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold">Create Account</h2>
              <p className="text-gray-500">Join ResellHub marketplace</p>
            </div>

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
                <Description>8+ chars recommended</Description>
                <FieldError />
              </TextField>

              {/* ROLE SELECT */}
              <div>
                <Label>Select Role</Label>

                <div className="grid grid-cols-2 gap-3 mt-3">

                  <div
                    onClick={() => setRole("buyer")}
                    className={`cursor-pointer rounded-xl border p-3 transition ${
                      role === "buyer"
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200"
                    }`}
                  >
                    🛒 Buyer
                  </div>

                  <div
                    onClick={() => setRole("seller")}
                    className={`cursor-pointer rounded-xl border p-3 transition ${
                      role === "seller"
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200"
                    }`}
                  >
                    🏪 Seller
                  </div>

                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-orange-500 text-white"
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

            {/* GITHUB LOGIN */}
            <Button
              onClick={signIn}
              className="w-full h-12 border bg-transparent"
            >
              <FaGithub />
              Continue with GitHub
            </Button>

            {/* LOGIN LINK */}
            <p className="mt-6 text-center text-sm">
              Already have account?{" "}
              <Link
                href={`/auth/signin?redirect=${redirectTo}`}
                className="text-orange-600 font-semibold"
              >
                Login
              </Link>
            </p>

          </Card>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-orange-500 to-orange-700 p-12 text-white">

          <div>
            <h1 className="text-3xl font-bold">ResellHub</h1>
            <p className="text-orange-100">Buy • Sell • Trade</p>

            <h2 className="mt-20 text-5xl font-bold">
              Start Selling Smarter Today
            </h2>

            <p className="mt-6 text-orange-100">
              Join thousands of users on trusted marketplace.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
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