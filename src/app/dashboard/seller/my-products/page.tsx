import { getUserSession } from "@/lib/core/session";
import Image from "next/image";
import React from "react";

// export const products = [
//   {
//     id: 1,
//     name: "Apple iPhone 13 Pro",
//     price: 85000,
//     location: "Dhaka, Bangladesh",
//     image: "https://images.unsplash.com/photo-1632661674596-79e4f1b6a3a7",
//     category: "Electronics",
//     condition: "Used - Like New",
//     description: "Lightly used iPhone 13 Pro, 128GB, battery health 90%.",
//     status: "available",
//   },
//   {
//     id: 2,
//     name: "MacBook Air M1",
//     price: 95000,
//     location: "Chattogram, Bangladesh",
//     image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
//     category: "Electronics",
//     condition: "Used",
//     description: "M1 MacBook Air, very smooth performance, charger included.",
//     status: "available",
//   },
//   {
//     id: 3,
//     name: "Nike Air Jordan Sneakers",
//     price: 6500,
//     location: "Dhaka, Bangladesh",
//     image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
//     category: "Fashion",
//     condition: "New",
//     description: "Original Nike Air Jordan shoes, size 42.",
//     status: "available",
//   },
//   {
//     id: 4,
//     name: "Wooden Study Table",
//     price: 4200,
//     location: "Sylhet, Bangladesh",
//     image: "https://images.unsplash.com/photo-1582582429416-9c4a6c4d0f0b",
//     category: "Furniture",
//     condition: "Used",
//     description: "Strong wooden table, perfect for students.",
//     status: "sold",
//   },
//   {
//     id: 5,
//     name: "Sony Headphones WH-1000XM4",
//     price: 22000,
//     location: "Rajshahi, Bangladesh",
//     image: "https://images.unsplash.com/photo-1518441902117-f0a4e2c3a9f5",
//     category: "Electronics",
//     condition: "Used - Excellent",
//     description: "Noise cancelling premium headphones, very good condition.",
//     status: "available",
//   },
//   {
//     id: 6,
//     name: "Gaming Chair RGB",
//     price: 13500,
//     location: "Khulna, Bangladesh",
//     image: "https://images.unsplash.com/photo-1616627982184-3f6c2d7c8a2e",
//     category: "Gaming",
//     condition: "New",
//     description: "Comfortable RGB gaming chair with adjustable height.",
//     status: "available",
//   },
// ];

const statusBadge = (status: string) => {
  switch (status) {
    case "available":
      return "bg-blue-100 text-blue-700";
    case "sold":
      return "bg-green-100 text-green-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "rejected":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const ProductsPage = async () => {
  const user = await getUserSession();

  const res = await fetch(
    `http://localhost:3001/api/v1/products/seller/${user?.id}`,
  );
  const data = await res.json();
  const products = data.data;
  console.log(products);

  return (
    <div className="p-6 md:p-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <p className="text-sm text-gray-500">
          Manage all listed products in your marketplace
        </p>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Condition</th>
              <th className="p-4">Status</th>
              <th className="p-4">Location</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* Product */}
                <td className="p-4 flex items-center gap-3">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    className="w-10 h-10 rounded object-cover"
                    width={200}
                    height={200}
                  />
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-xs text-gray-500">
                      {product.description.slice(0, 40)}...
                    </p>
                  </div>
                </td>

                {/* Category */}
                <td className="p-4">{product.category}</td>

                {/* Price */}
                <td className="p-4 font-semibold">
                  ৳ {product.price.toLocaleString()}
                </td>

                {/* Condition */}
                <td className="p-4">{product.condition}</td>

                {/* Status */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge(
                      product.status,
                    )}`}
                  >
                    {product.status}
                  </span>
                </td>

                {/* Location */}
                <td className="p-4 text-gray-600">{product.location}</td>

                {/* Actions */}
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-3 text-xs">
                    <button className="text-blue-600 hover:underline">
                      View
                    </button>
                    <button className="text-green-600 hover:underline">
                      Edit
                    </button>
                    <button className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex justify-between mt-4 text-xs text-gray-500">
        <span>Total Products: {products.length}</span>
        <span>Showing all records</span>
      </div>
    </div>
  );
};

export default ProductsPage;
