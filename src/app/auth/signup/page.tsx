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
          role: user.role,
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md p-7 sm:p-9 border border-gray-200 rounded-3xl shadow-xl backdrop-blur-sm">
        {/* HEADER */}
        <div className="text-center mb-7">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Create Account
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Start your journey with Study Nook
          </p>
        </div>

        {/* FORM */}
        <Form onSubmit={onSubmit} className="flex flex-col gap-4">
          {/* NAME */}
          <TextField isRequired name="name" type="text">
            <Label className="text-sm font-medium">Name</Label>
            <Input placeholder="Enter your name" className="h-11" />
            <FieldError />
          </TextField>

          {/* IMAGE */}
          <TextField name="image" type="url" className="hidden">
            <Label>Image</Label>
            <Input />
          </TextField>

          {/* EMAIL */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Enter valid email address";
              }
              return null;
            }}
          >
            <Label className="text-sm font-medium">Email</Label>
            <Input placeholder="john@example.com" className="h-11" />
            <FieldError />
          </TextField>

          {/* PASSWORD */}
          <TextField
            isRequired
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) return "Minimum 8 characters";

              if (!/[A-Z]/.test(value)) return "1 uppercase required";

              if (!/[0-9]/.test(value)) return "1 number required";

              return null;
            }}
          >
            <Label className="text-sm font-medium">Password</Label>

            <Input placeholder="Enter strong password" className="h-11" />

            <Description className="text-xs text-gray-500">
              Use 8+ chars, 1 uppercase, 1 number
            </Description>

            <FieldError />
          </TextField>

          {/* ROLE SELECT (MODERN CARDS) */}
          <div>
            <Label className="text-sm font-medium">Select Role</Label>

            <input type="hidden" name="role" value={role} />

            <div className="grid grid-cols-2 gap-3 mt-3">
              {/* BUYER */}
              <Card
                onClick={() => setRole("buyer")}
                className={`cursor-pointer p-4 rounded-2xl border transition-all duration-200 hover:scale-[1.02]
                  ${
                    role === "buyer"
                      ? "border-orange-500 bg-orange-50 shadow-md"
                      : "border-gray-200 hover:border-orange-300"
                  }
                `}
              >
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-900">
                    🛒 Buyer
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    Purchase products
                  </span>
                </div>
              </Card>

              {/* SELLER */}
              <Card
                onClick={() => setRole("seller")}
                className={`cursor-pointer p-4 rounded-2xl border transition-all duration-200 hover:scale-[1.02]
                  ${
                    role === "seller"
                      ? "border-orange-500 bg-orange-50 shadow-md"
                      : "border-gray-200 hover:border-orange-300"
                  }
                `}
              >
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-900">
                    🏪 Seller
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    Sell products
                  </span>
                </div>
              </Card>
            </div>
          </div>

          {/* BUTTON */}
          <Button
            type="submit"
            className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-all"
          >
            Create Account
          </Button>
        </Form>

        {/* DIVIDER */}
        <div className="flex items-center gap-3 my-7">
          <Separator className="flex-1" />
          <span className="text-xs text-gray-400">Or continue with</span>
          <Separator className="flex-1" />
        </div>

        {/* GITHUB */}
        <Button
          onClick={signIn}
          className="w-full h-11 rounded-xl border hover:bg-gray-50"
        >
          <FaGithub className="text-lg" />
          <span className="ml-2">GitHub</span>
        </Button>

        {/* LOGIN */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href={`/signin?redirect=${redirectTo}`}
              className="text-orange-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default SignUpPage;
