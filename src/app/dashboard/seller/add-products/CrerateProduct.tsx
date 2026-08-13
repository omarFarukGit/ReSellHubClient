"use client";

import { createProducts } from "@/lib/action/product";

import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CreateProductPage({ user }: any) {
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);

    try {
      const uploadedUrls: string[] = [];

      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
          {
            method: "POST",
            body: formData,
          },
        );

        const data = await res.json();

        if (data.success) {
          uploadedUrls.push(data.data.url);
        }
      }

      setImages((prev) => [...prev, ...uploadedUrls]);
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed ❌");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const product = Object.fromEntries(formData.entries());

    const payload = {
      title: product.name,
      category: product.category,
      condition: product.condition,
      price: Number(product.price),
      description: product.description,
      images,

      sellerInfo: {
        userId: user?.id,
        name: user?.name,
        email: user?.email,
        phone: user?.phone || "017XXXXXXXX",
      },
    };

    try {
      setLoading(true);

      const res = await createProducts(payload);

      if (res) {
        toast.success("Product created successfully ✅");

        form.reset();
        setImages([]);
      } else {
        toast.error("Failed to create product ❌");
      }
    } catch (error: unknown) {
      console.error(error);
      toast.error("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-10 text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-zinc-100">
      <div className="mx-auto max-w-5xl px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Sell Your Product</h1>

          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            Create a listing and reach thousands of buyers.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Images */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-5 text-xl font-semibold">Product Images</h2>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-2 text-sm text-zinc-700 file:mr-4 file:rounded-lg file:border-0 file:bg-orange-500 file:px-4 file:py-2 file:text-white hover:file:bg-orange-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            />

            {uploading && (
              <p className="mt-3 text-orange-500 dark:text-orange-400">
                Uploading images...
              </p>
            )}

            <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
              {images.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  alt="create image"
                  className="h-32 w-full rounded-xl border border-zinc-200 object-cover dark:border-zinc-700"
                  width={200}
                  height={200}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-5 text-xl font-semibold">Product Details</h2>

            <div className="grid gap-5 md:grid-cols-2">
              <input
                name="name"
                placeholder="Product Name"
                required
                className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-orange-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500"
              />

              <select
                name="category"
                className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-orange-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              >
                <option>Phone</option>
                <option>Computer</option>
                <option>Laptop</option>
                <option>Camera</option>
                <option>Watch</option>
                <option>Head Phone</option>
              </select>

              <input
                name="brand"
                placeholder="Brand"
                className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-orange-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500"
              />

              <input
                name="model"
                placeholder="Model"
                className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-orange-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500"
              />
            </div>
          </div>

          {/* Condition */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-5 text-xl font-semibold">Condition</h2>

            <select
              name="condition"
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-orange-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            >
              <option value="new">Brand New</option>
              <option value="like-new">Like New</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
            </select>
          </div>

          {/* Price */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-5 text-xl font-semibold">Pricing</h2>

            <div className="grid gap-5 md:grid-cols-2">
              <input
                type="number"
                name="price"
                required
                placeholder="Price"
                className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-orange-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500"
              />

              <label className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                <input
                  type="checkbox"
                  name="negotiable"
                  className="h-4 w-4 accent-orange-500"
                />
                Negotiable
              </label>
            </div>
          </div>

          {/* Location */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-5 text-xl font-semibold">Location</h2>

            <input
              name="location"
              placeholder="Dhaka"
              required
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-orange-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500"
            />
          </div>

          {/* Description */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-5 text-xl font-semibold">Description</h2>

            <textarea
              name="description"
              rows={6}
              required
              placeholder="Write details about your product..."
              className="w-full rounded-xl border border-zinc-200 bg-white p-4 text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-orange-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500"
            />
          </div>

          {/* Seller */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-5 text-xl font-semibold">Seller Information</h2>

            <div className="grid gap-5 md:grid-cols-2">
              <input
                value={user?.name}
                disabled
                className="rounded-xl border border-zinc-200 bg-zinc-100 px-4 py-3 text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
              />

              <input
                value={user?.email}
                disabled
                className="rounded-xl border border-zinc-200 bg-zinc-100 px-4 py-3 text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={uploading || loading}
              className="cursor-pointer rounded-xl bg-orange-500 px-8 py-3 font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-orange-600 dark:hover:bg-orange-700"
            >
              {loading ? "Publishing..." : "Publish Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
