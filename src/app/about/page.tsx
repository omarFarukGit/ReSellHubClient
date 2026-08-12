"use client";

import { Button } from "@heroui/react";
import Link from "next/link";

const features = [
  {
    title: "Easy Listing",
    desc: "Post your product in just a few clicks with images and details.",
  },
  {
    title: "Secure Trade",
    desc: "Safe communication and verified users for trusted transactions.",
  },
  {
    title: "Best Deals",
    desc: "Discover affordable products from real sellers near you.",
  },
];

const stats = [
  {
    label: "Active Users",
    value: "10,000+",
  },
  {
    label: "Products Listed",
    value: "25,000+",
  },
  {
    label: "Safe Transactions",
    value: "100%",
  },
];

export default function AboutPage() {
  return (
    <div
      className="
        min-h-screen
        bg-gray-50
        px-6 py-16
        transition-colors duration-300

        dark:bg-gray-950
      "
    >
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <span
            className="
              text-sm
              font-semibold
              uppercase
              tracking-wider
              text-orange-500
              dark:text-orange-400
            "
          >
            About ResellHub
          </span>

          <h1
            className="
              mt-2
              text-4xl
              font-bold
              text-gray-900
              dark:text-white
              md:text-5xl
            "
          >
            About ResellHub
          </h1>

          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              text-lg
              text-gray-600
              dark:text-gray-400
            "
          >
            A trusted marketplace for buying and selling used & new products.
          </p>
        </div>

        {/* Main Section */}
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* About Content */}
          <div>
            <span
              className="
                text-sm
                font-semibold
                text-orange-500
                dark:text-orange-400
              "
            >
              Our Story
            </span>

            <h2
              className="
                mb-4
                mt-2
                text-2xl
                font-semibold
                text-gray-800
                dark:text-white
              "
            >
              Who We Are
            </h2>

            <p
              className="
                mb-4
                leading-relaxed
                text-gray-600
                dark:text-gray-400
              "
            >
              ResellHub is a modern resale marketplace built to connect buyers
              and sellers in a simple, secure, and fast way. We make it easy for
              anyone to list products, find great deals, and trade safely
              online.
            </p>

            <p
              className="
                leading-relaxed
                text-gray-600
                dark:text-gray-400
              "
            >
              Our mission is to create a trusted circular economy where unused
              items get a second life and everyone benefits from smarter
              shopping.
            </p>
          </div>

          {/* Stats Card */}
          <div
            className="
              rounded-2xl
              border
              border-gray-100
              bg-white
              p-6
              shadow-lg
              transition-all duration-300

              hover:-translate-y-1
              hover:shadow-xl

              dark:border-gray-800
              dark:bg-gray-900
            "
          >
            <h3
              className="
                mb-6
                text-xl
                font-semibold
                text-gray-900
                dark:text-white
              "
            >
              Why Choose Us?
            </h3>

            <div className="space-y-5">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="
                    rounded-xl
                    border
                    border-gray-100
                    bg-gray-50
                    p-4
                    transition-colors

                    dark:border-gray-800
                    dark:bg-gray-800/50
                  "
                >
                  <p
                    className="
                      text-sm
                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    {item.label}
                  </p>

                  <p
                    className="
                      mt-1
                      text-2xl
                      font-bold
                      text-orange-500
                      dark:text-orange-400
                    "
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="
                group
                rounded-2xl
                border
                border-gray-100
                bg-white
                p-6
                shadow-sm
                transition-all duration-300

                hover:-translate-y-1
                hover:border-orange-200
                hover:shadow-lg

                dark:border-gray-800
                dark:bg-gray-900
                dark:hover:border-orange-500/30
              "
            >
              {/* Orange Accent */}
              <div
                className="
                  mb-4
                  h-1
                  w-10
                  rounded-full
                  bg-orange-500
                  transition-all duration-300
                  group-hover:w-16
                  dark:bg-orange-400
                "
              />

              <h3
                className="
                  mb-2
                  text-lg
                  font-semibold
                  text-gray-800
                  dark:text-white
                "
              >
                {feature.title}
              </h3>

              <p
                className="
                  text-sm
                  leading-6
                  text-gray-600
                  dark:text-gray-400
                "
              >
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="
            mt-16
            rounded-2xl
            border
            border-orange-100
            bg-orange-50
            px-6 py-10
            text-center

            dark:border-orange-500/20
            dark:bg-orange-500/5
          "
        >
          <h2
            className="
              mb-4
              text-2xl
              font-semibold
              text-gray-900
              dark:text-white
            "
          >
            Start Buying & Selling Today
          </h2>

          <p
            className="
              mx-auto
              mb-6
              max-w-xl
              text-sm
              text-gray-600
              dark:text-gray-400
            "
          >
            Discover great products, connect with trusted sellers, and start
            your ResellHub journey today.
          </p>

          <Link href="/products">
            <Button
              className="
                rounded-xl
                bg-orange-500
                px-6 py-3
                font-semibold
                text-white
                shadow-sm
                transition-all duration-300

                hover:-translate-y-0.5
                hover:bg-orange-600
                hover:shadow-md

                dark:bg-orange-600
                dark:hover:bg-orange-500
              "
            >
              Explore Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
