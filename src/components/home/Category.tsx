"use client";

import Link from "next/link";
import {
  Smartphone,
  Laptop,
  Computer,
  Camera,
  Watch,
  Headphones,
} from "lucide-react";

const categories = [
  { name: "Phone", icon: Smartphone },
  { name: "Computer", icon: Computer },
  { name: "Laptop", icon: Laptop },
  { name: "Camera", icon: Camera },
  { name: "Watch", icon: Watch },
  { name: "Head Phones", icon: Headphones },
];

const CategorySection = () => {
  return (
    <section className="w-full bg-white py-12 transition-colors dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4">
        {/* Heading */}
        <h2 className="mb-8 text-2xl font-bold text-gray-800 transition-colors dark:text-white md:text-3xl">
          Browse Categories
        </h2>

        {/* Categories */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {categories.map((cat) => {
            const Icon = cat.icon;

            return (
              <Link
                key={cat.name}
                href={`/products?category=${encodeURIComponent(cat.name)}`}
                className="
                  group
                  flex flex-col items-center justify-center
                  rounded-xl border
                  border-gray-200
                  bg-gray-50
                  p-5
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-orange-300
                  hover:bg-orange-50
                  hover:shadow-md

                  dark:border-gray-800
                  dark:bg-gray-900
                  dark:hover:border-orange-500/50
                  dark:hover:bg-gray-800
                "
              >
                {/* Icon */}
                <Icon
                  className="
                    mb-2 h-8 w-8
                    text-orange-500
                    transition-all duration-300
                    group-hover:scale-110
                    group-hover:text-orange-600
                    dark:text-orange-400
                    dark:group-hover:text-orange-300
                  "
                />

                {/* Category Name */}
                <p
                  className="
                    text-sm font-medium
                    text-gray-700
                    transition-colors
                    dark:text-gray-300
                    dark:group-hover:text-white
                  "
                >
                  {cat.name}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;