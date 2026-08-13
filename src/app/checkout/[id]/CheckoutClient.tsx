"use client";

import { IProduct } from "@/types/product";
import { useState } from "react";

interface CheckoutClientProps {
  product: IProduct;
}

export default function CheckoutClient({ product }: CheckoutClientProps) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
  });

  const tax = product.price * 0.08;
  const total = product.price + tax;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product,
          customerInfo: formData,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white md:px-6 md:py-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Checkout
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Complete your delivery information and proceed with payment.
          </p>
        </div>

        <form
          onSubmit={handleCheckout}
          className="grid gap-6 lg:grid-cols-3 lg:gap-8"
        >
          {/* LEFT FORM */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900 md:p-8 lg:col-span-2">
            <div className="mb-7">
              <h2 className="text-xl font-semibold md:text-2xl">
                Delivery Information
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Enter your information to receive your order.
              </p>
            </div>

            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-1.5 block text-sm font-medium"
                >
                  Full Name
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="
                    w-full rounded-xl border border-slate-200
                    bg-white px-4 py-3 text-sm text-slate-900
                    outline-none transition
                    placeholder:text-slate-400
                    focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10
                    dark:border-slate-700 dark:bg-slate-950
                    dark:text-white dark:placeholder:text-slate-500
                    dark:focus:border-orange-500
                  "
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-1.5 block text-sm font-medium"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  placeholder="+880 1712-345678"
                  value={formData.phone}
                  onChange={handleChange}
                  className="
                    w-full rounded-xl border border-slate-200
                    bg-white px-4 py-3 text-sm text-slate-900
                    outline-none transition
                    placeholder:text-slate-400
                    focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10
                    dark:border-slate-700 dark:bg-slate-950
                    dark:text-white dark:placeholder:text-slate-500
                    dark:focus:border-orange-500
                  "
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="
                    w-full rounded-xl border border-slate-200
                    bg-white px-4 py-3 text-sm text-slate-900
                    outline-none transition
                    placeholder:text-slate-400
                    focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10
                    dark:border-slate-700 dark:bg-slate-950
                    dark:text-white dark:placeholder:text-slate-500
                    dark:focus:border-orange-500
                  "
                  required
                />
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="mb-1.5 block text-sm font-medium"
                >
                  Delivery Address
                </label>

                <input
                  id="address"
                  name="address"
                  placeholder="Enter your delivery address"
                  value={formData.address}
                  onChange={handleChange}
                  className="
                    w-full rounded-xl border border-slate-200
                    bg-white px-4 py-3 text-sm text-slate-900
                    outline-none transition
                    placeholder:text-slate-400
                    focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10
                    dark:border-slate-700 dark:bg-slate-950
                    dark:text-white dark:placeholder:text-slate-500
                    dark:focus:border-orange-500
                  "
                  required
                />
              </div>
            </div>
          </div>

          {/* RIGHT SUMMARY */}
          <div className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900 md:p-8">
            <h2 className="text-xl font-bold md:text-2xl">
              Order Summary
            </h2>

            {/* Product */}
            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                {product.title}
              </h3>

              <p className="mt-1 text-sm capitalize text-slate-500 dark:text-slate-400">
                Condition: {product.condition}
              </p>
            </div>

            <div className="my-5 h-px bg-slate-200 dark:bg-slate-800" />

            {/* Subtotal */}
            <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
              <span>Subtotal</span>
              <span className="font-medium text-slate-900 dark:text-white">
                ${product.price.toLocaleString()}
              </span>
            </div>

            {/* Tax */}
            <div className="mt-3 flex justify-between text-sm text-slate-600 dark:text-slate-400">
              <span>Tax (8%)</span>
              <span className="font-medium text-slate-900 dark:text-white">
                ${tax.toFixed(2)}
              </span>
            </div>

            <div className="my-5 h-px bg-slate-200 dark:bg-slate-800" />

            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold">Total</span>

              <span className="text-2xl font-bold text-orange-600 dark:text-orange-500">
                ${total.toFixed(2)}
              </span>
            </div>

            {/* Checkout Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                mt-7 flex w-full cursor-pointer items-center
                justify-center gap-2 rounded-xl
                bg-orange-500 px-4 py-3.5
                font-semibold text-white shadow-sm
                transition
                hover:bg-orange-600
                disabled:cursor-not-allowed
                disabled:bg-orange-300
                dark:hover:bg-orange-500
                dark:disabled:bg-orange-900
              "
            >
              {loading ? (
                <>
                  <svg
                    className="h-5 w-5 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      className="opacity-25"
                    />

                    <path
                      fill="currentColor"
                      className="opacity-75"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>

                  Processing Payment...
                </>
              ) : (
                <>Pay ${total.toFixed(2)}</>
              )}
            </button>

            <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-500">
              You will be redirected to the secure payment page.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}