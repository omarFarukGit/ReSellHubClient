"use client";

import React from "react";
import { Button } from "@heroui/react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            About ResellHub
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            A trusted marketplace for buying and selling used & new products.
          </p>
        </div>

        {/* Main Section */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Who We Are
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              ResellHub is a modern resale marketplace built to connect buyers
              and sellers in a simple, secure, and fast way. We make it easy for
              anyone to list products, find great deals, and trade safely
              online.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Our mission is to create a trusted circular economy where unused
              items get a second life and everyone benefits from smarter
              shopping.
            </p>
          </div>

          {/* Stats Card */}
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4">Why Choose Us?</h3>

            <div className="space-y-4">
              <div>
                <p className="text-gray-500">Active Users</p>
                <p className="text-2xl font-bold text-orange-500">10,000+</p>
              </div>

              <div>
                <p className="text-gray-500">Products Listed</p>
                <p className="text-2xl font-bold text-orange-500">25,000+</p>
              </div>

              <div>
                <p className="text-gray-500">Safe Transactions</p>
                <p className="text-2xl font-bold text-orange-500">100%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-2">Easy Listing</h3>
            <p className="text-gray-600 text-sm">
              Post your product in just a few clicks with images and details.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-2">Secure Trade</h3>
            <p className="text-gray-600 text-sm">
              Safe communication and verified users for trusted transactions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-2">Best Deals</h3>
            <p className="text-gray-600 text-sm">
              Discover affordable products from real sellers near you.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            Start Buying & Selling Today
          </h2>

          <Link href="/products">
            <Button className="bg-orange-500 text-white px-6 py-3 rounded-xl">
              Explore Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
