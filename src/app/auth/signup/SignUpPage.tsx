"use client";

import React from "react";
import { Card, Description, Separator } from "@heroui/react";
import { Button, Form, Input, Label, TextField } from "@heroui/react";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { FaGithub } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";

const SignUpPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get("redirect") ?? "/";

  const [role, setRole] = React.useState<"buyer" | "seller">("buyer");
  const [loading, setLoading] = React.useState(false);

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
        image: payload.photo,
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
        // 🔥 SAVE USER PROFILE IN DB
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

  const signInGithub = async () => {
    await authClient.signIn.social({
      provider: "github",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="flex items-center justify-center bg-gray-50 px-5 py-10">
          <Card className="w-full max-w-xl p-8 shadow-xl border-0">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold">Create Account</h2>
              <p className="text-gray-500 mt-2">Join ResellHub marketplace</p>
            </div>

            <Form onSubmit={onSubmit} className="space-y-5">
              <TextField isRequired name="name">
                <Label>Full Name</Label>
                <Input placeholder="Md. Rakib Hasan" className="h-12" />
              </TextField>

              <TextField isRequired name="email">
                <Label>Email</Label>
                <Input placeholder="rakib@gmail.com" className="h-12" />
              </TextField>

              <TextField isRequired name="password">
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="********"
                  className="h-12"
                />
                <Description>Minimum 8 characters recommended</Description>
              </TextField>

              <TextField name="photo" hidden>
                <Label>Profile Photo URL</Label>
                <Input
                  placeholder="https://example.com/photo.jpg"
                  className="h-12"
                />
              </TextField>

              <div className="grid md:grid-cols-2 gap-4">
                <TextField name="phone">
                  <Label>Phone Number</Label>
                  <Input placeholder="+8801712345678" className="h-12" />
                </TextField>

                <TextField name="location">
                  <Label>Location</Label>
                  <Input placeholder="Dhaka, Bangladesh" className="h-12" />
                </TextField>
              </div>

              {/* ROLE */}
              <div>
                <Label>Select Role</Label>

                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div
                    onClick={() => setRole("buyer")}
                    className={`cursor-pointer rounded-2xl border p-4 text-center transition-all ${
                      role === "buyer"
                        ? "border-orange-500 bg-orange-50 shadow-sm"
                        : "border-gray-200 hover:border-orange-300"
                    }`}
                  >
                    <div className="text-3xl mb-2">🛒</div>
                    <h3 className="font-semibold">Buyer</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Purchase products
                    </p>
                  </div>

                  <div
                    onClick={() => setRole("seller")}
                    className={`cursor-pointer rounded-2xl border p-4 text-center transition-all ${
                      role === "seller"
                        ? "border-orange-500 bg-orange-50 shadow-sm"
                        : "border-gray-200 hover:border-orange-300"
                    }`}
                  >
                    <div className="text-3xl mb-2">🏪</div>
                    <h3 className="font-semibold">Seller</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Sell your products
                    </p>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                isDisabled={loading}
                className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </Form>

            <div className="my-6 flex items-center gap-3">
              <Separator className="flex-1" />
              <span className="text-sm text-gray-500">Or continue with</span>
              <Separator className="flex-1" />
            </div>

            <Button
              onClick={signInGithub}
              className="w-full h-12 border bg-white hover:bg-gray-50 text-black"
            >
              <FaGithub className="text-lg text-black" />
              Continue with GitHub
            </Button>

            <p className="mt-6 text-center text-sm">
              Already have an account?{" "}
              <Link
                href={`/auth/signin?redirect=${redirectTo}`}
                className="font-semibold text-orange-600"
              >
                Login
              </Link>
            </p>
          </Card>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 p-12 text-white">
          <div>
            <h1 className="text-4xl font-bold">ResellHub</h1>

            <p className="mt-2 text-orange-100">Buy • Sell • Trade</p>

            <h2 className="mt-24 text-5xl font-bold leading-tight">
              Start Selling
              <br />
              Smarter Today
            </h2>

            <p className="mt-6 max-w-md text-orange-100 text-lg">
              Join thousands of buyers and sellers on Bangladesh is trusted
              marketplace.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
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
