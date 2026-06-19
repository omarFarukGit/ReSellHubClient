import React from "react";
import Card from "./Card";

const FetureProducts = () => {
  const products = [
    {
      id: 1,
      title: "Wooden Study Table",
      category: "Furniture",
      condition: "Fair",
      price: 8000,
      images: ["/products/table.jpg"],
      description:
        "Solid wood study table with drawer. Strong and durable for daily use.",
      status: "available",
    },
    {
      id: 2,
      title: "iPhone 13 Pro",
      category: "Electronics",
      condition: "Excellent",
      price: 85000,
      images: ["/products/iphone.jpg"],
      description:
        "Lightly used iPhone 13 Pro, no scratches, battery health 92%.",
      status: "available",
    },
    {
      id: 3,
      title: "Gaming Laptop RTX 3060",
      category: "Electronics",
      condition: "Good",
      price: 120000,
      images: ["/products/laptop.jpg"],
      description:
        "High performance gaming laptop suitable for AAA games and editing.",
      status: "available",
    },
    {
      id: 4,
      title: "Nike Running Shoes",
      category: "Fashion",
      condition: "New",
      price: 6500,
      images: ["/products/shoes.jpg"],
      description:
        "Brand new Nike shoes, comfortable for running and daily use.",
      status: "available",
    },
    {
      id: 5,
      title: "Smart Watch Series 6",
      category: "Electronics",
      condition: "Good",
      price: 4200,
      images: ["/products/watch.jpg"],
      description:
        "Smart watch with fitness tracking, heart rate monitor and notifications.",
      status: "available",
    },
    {
      id: 6,
      title: "Office Chair Ergonomic",
      category: "Furniture",
      condition: "Fair",
      price: 5500,
      images: ["/products/chair.jpg"],
      description: "Comfortable ergonomic office chair with adjustable height.",
      status: "available",
    },
  ];

  return (
    <section className="w-full py-14 bg-gray-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Featured Products
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Discover top deals from trusted sellers
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FetureProducts;
