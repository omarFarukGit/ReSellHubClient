"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const categories = [
  "Electronics",
  "Fashion",
  "Furniture",
  "Books",
  "Sports",
  "Vehicles",
];

const ProductFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");

  const [category, setCategory] = useState(searchParams.get("category") || "");

  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");

  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  const handleFilter = () => {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (category) params.set("category", category);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);

    router.push(`/products?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");

    router.push("/products");
  };

  return (
    <div className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900 p-4 max-w-7xl mx-auto mb-10">
      <div className="grid gap-4 md:grid-cols-5">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white"
        >
          <option value="">All Categories</option>

          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white"
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white"
        />

        <div className="flex gap-2">
          <button
            onClick={handleFilter}
            className="flex-1 rounded-lg bg-orange-500 px-4 py-2 font-medium text-white cursor-pointer"
          >
            Filter
          </button>

          <button
            onClick={clearFilters}
            className="rounded-lg border border-zinc-700 px-4 py-2 text-white cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
