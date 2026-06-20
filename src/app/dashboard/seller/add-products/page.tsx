"use client";


import { useState } from "react";

export default function CreateProductPage({
  user,
}: {
  user: any;
}) {
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
          }
        );

        const data = await res.json();

        if (data.success) {
          uploadedUrls.push(data.data.url);
        }
      }

      setImages((prev) => [...prev, ...uploadedUrls]);
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const product = Object.fromEntries(formData.entries());

    const payload = {
      ...product,

      price: Number(product.price),

      negotiable:
        formData.get("negotiable") === "on",

      images,

      sellerId: user._id,
      sellerName: user.name,

      status: "pending",

      featured: false,
      views: 0,
    };

    // const res = await createProduct(payload);

    console.log(res);
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-10">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Sell Your Product
          </h1>

          <p className="text-zinc-500 mt-2">
            Create a listing and reach thousands
            of buyers.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Images */}
          <div className="rounded-2xl bg-white border p-6">
            <h2 className="font-semibold text-xl mb-5">
              Product Images
            </h2>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full"
            />

            {uploading && (
              <p className="mt-3 text-orange-500">
                Uploading...
              </p>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt=""
                  className="h-32 w-full rounded-xl object-cover border"
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="rounded-2xl bg-white border p-6">
            <h2 className="font-semibold text-xl mb-5">
              Product Details
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              <input
                name="name"
                placeholder="Product Name"
                required
                className="border rounded-xl px-4 py-3"
              />

              <select
                name="category"
                className="border rounded-xl px-4 py-3"
              >
                <option>Electronics</option>
                <option>Mobile Phones</option>
                <option>Laptops</option>
                <option>Fashion</option>
                <option>Furniture</option>
                <option>Vehicles</option>
              </select>

              <input
                name="brand"
                placeholder="Brand"
                className="border rounded-xl px-4 py-3"
              />

              <input
                name="model"
                placeholder="Model"
                className="border rounded-xl px-4 py-3"
              />
            </div>
          </div>

          {/* Condition */}
          <div className="rounded-2xl bg-white border p-6">
            <h2 className="font-semibold text-xl mb-5">
              Condition
            </h2>

            <select
              name="condition"
              className="w-full border rounded-xl px-4 py-3"
            >
              <option value="new">
                Brand New
              </option>
              <option value="like-new">
                Like New
              </option>
              <option value="good">
                Good
              </option>
              <option value="fair">
                Fair
              </option>
            </select>
          </div>

          {/* Price */}
          <div className="rounded-2xl bg-white border p-6">
            <h2 className="font-semibold text-xl mb-5">
              Pricing
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              <input
                type="number"
                name="price"
                required
                placeholder="Price"
                className="border rounded-xl px-4 py-3"
              />

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="negotiable"
                />

                Negotiable
              </label>
            </div>
          </div>

          {/* Location */}
          <div className="rounded-2xl bg-white border p-6">
            <h2 className="font-semibold text-xl mb-5">
              Location
            </h2>

            <input
              name="location"
              placeholder="Dhaka"
              required
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* Description */}
          <div className="rounded-2xl bg-white border p-6">
            <h2 className="font-semibold text-xl mb-5">
              Description
            </h2>

            <textarea
              name="description"
              rows={6}
              required
              placeholder="Write details about your product..."
              className="w-full border rounded-xl p-4"
            />
          </div>

          {/* Seller */}
          <div className="rounded-2xl bg-white border p-6">
            <h2 className="font-semibold text-xl mb-5">
              Seller Information
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              <input
                value={user?.name}
                disabled
                className="border rounded-xl px-4 py-3"
              />

              <input
                value={user?.email}
                disabled
                className="border rounded-xl px-4 py-3"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={uploading}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-medium"
            >
              Publish Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}