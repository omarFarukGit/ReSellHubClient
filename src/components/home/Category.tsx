"use client";

import { ShoppingBag, Smartphone, Car, Home, Gamepad2, Shirt } from "lucide-react";

const categories = [
  { name: "Electronics", icon: Smartphone },
  { name: "Fashion", icon: Shirt },
  { name: "Vehicles", icon: Car },
  { name: "Home & Living", icon: Home },
  { name: "Gaming", icon: Gamepad2 },
  { name: "Others", icon: ShoppingBag },
];

const CategorySection = () => {
  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          Browse Categories
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((cat, index) => {
            const Icon = cat.icon;

            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-5 rounded-xl border hover:shadow-md hover:scale-105 transition cursor-pointer bg-gray-50"
              >
                <Icon className="w-8 h-8 text-orange-500 mb-2" />
                <p className="text-sm font-medium text-gray-700">
                  {cat.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;