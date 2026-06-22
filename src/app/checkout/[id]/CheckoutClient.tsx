"use client";

import { Product } from "@/types/product";
import { useState } from "react";

export default function CheckoutClient(product: Product) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
  });

  const tax = product.price * 0.08;
  const total = product.price + tax;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/payment/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        productId: product._id,
      }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-10">Checkout</h1>

      <form onSubmit={handleCheckout} className="grid lg:grid-cols-3 gap-8">
        {/* Delivery Info */}
        <div className="lg:col-span-2 border rounded-2xl p-8">
          <h2 className="text-3xl font-semibold mb-8">Delivery Information</h2>

          <input
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border p-3 mb-3 rounded-xl"
            required
          />

          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-3 mb-3 rounded-xl"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 mb-3 rounded-xl"
            required
          />

          <input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border p-3 mb-3 rounded-xl"
            required
          />
        </div>

        {/* Order Summary */}
        <div className="border rounded-2xl p-8 h-fit">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          <h3 className="font-semibold">{product.title}</h3>
          <p className="text-sm text-gray-500">{product.condition}</p>

          <hr className="my-4" />

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${product.price}</span>
          </div>

          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-bold mt-4">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl"
          >
            Pay ${total.toFixed(2)}
          </button>
        </div>
      </form>
    </div>
  );
}
