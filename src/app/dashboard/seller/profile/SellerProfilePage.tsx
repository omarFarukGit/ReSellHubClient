"use client";

import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function SellerProfilePage({ user }: any) {
  const [seller, setSeller] = useState(user);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(user);
  const [uploading, setUploading] = useState(false);

  // IMAGE UPLOAD (ImageBB)
  const uploadImage = async (file: File) => {
    setUploading(true);

    try {
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

      return data.data.url;
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      const imageUrl = await uploadImage(file);

      setForm((prev: any) => ({
        ...prev,
        avatar: imageUrl,
      }));
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed");
    }
  };

  const handleSave = async (userId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            phone: form.phone,
            location: form.location,
            image: form.avatar,
            bio: form.bio,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Update failed");
      }

      setSeller(data.data);
      setOpen(false);

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen space-y-8 bg-gray-50 p-6 text-gray-900 transition-colors dark:bg-gray-950 dark:text-gray-100 md:p-10">

      {/* PROFILE HEADER */}
      <div className="flex flex-col items-center gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900 md:flex-row">
        <Image
          src={seller.image || "https://i.pravatar.cc/150?img=12"}
          className="h-24 w-24 rounded-full border-2 border-gray-200 object-cover dark:border-gray-700"
          width={200}
          height={200}
          alt={seller.name}
        />

        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {seller.name}
          </h1>

          <p className="text-gray-500 dark:text-gray-400">
            {seller.email}
          </p>

          <p className="text-gray-500 dark:text-gray-400">
            {seller.phone || "+880 17XXXXXXXX"}
          </p>

          <p className="text-gray-500 dark:text-gray-400">
            {seller.location}
          </p>

          {/* BADGES */}
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700 dark:bg-green-950 dark:text-green-400">
              {seller.role}
            </span>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700 dark:bg-blue-950 dark:text-blue-400">
              ⭐ {seller.rating} Rating
            </span>

            <span className="rounded-full bg-purple-100 px-3 py-1 text-xs text-purple-700 dark:bg-purple-950 dark:text-purple-400">
              ✓ Verified
            </span>
          </div>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="ml-auto rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          Edit Profile
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Sales */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Sales
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
            {seller.totalSales}
          </h2>
        </div>

        {/* Revenue */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Revenue
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
            {seller.revenue}
          </h2>
        </div>

        {/* Active Listings */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Active Listings
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
            {seller.activeListings}
          </h2>
        </div>

        {/* Member Since */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Member Since
          </p>

          <h2 className="mt-2 text-lg font-bold text-gray-900 dark:text-white">
            {seller.joinDate}
          </h2>
        </div>
      </div>

      {/* ABOUT */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-2 font-bold text-gray-900 dark:text-white">
          About Seller
        </h2>

        <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">
          {seller.bio || "Add your bio"}
        </p>
      </div>

      {/* EDIT MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-700 dark:bg-gray-900">

            <h2 className="mb-5 text-xl font-bold text-gray-900 dark:text-white">
              Update Profile
            </h2>

            {/* Name */}
            <input
              className="mb-3 w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
              value={form.name || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              placeholder="Name"
            />

            {/* Email */}
            <input
              className="mb-3 w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
              value={form.email || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              placeholder="Email"
            />

            {/* Phone */}
            <input
              className="mb-3 w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
              value={form.phone || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
              placeholder="Phone"
            />

            {/* Location */}
            <input
              className="mb-3 w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
              value={form.location || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  location: e.target.value,
                })
              }
              placeholder="Location"
            />

            {/* Bio */}
            <textarea
              rows={4}
              className="mb-3 w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
              value={form.bio || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  bio: e.target.value,
                })
              }
              placeholder="Bio"
            />

            {/* IMAGE UPLOAD */}
            <div className="rounded-xl border border-dashed border-gray-300 p-4 dark:border-gray-700">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Profile Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100 dark:text-gray-400 dark:file:bg-blue-950 dark:file:text-blue-400"
              />

              {uploading && (
                <p className="mt-2 text-xs text-blue-500">
                  Uploading image...
                </p>
              )}

              {form.avatar && (
                <div className="mt-4">
                  <Image
                    src={form.avatar}
                    className="h-20 w-20 rounded-full border-2 border-gray-200 object-cover dark:border-gray-700"
                    width={200}
                    height={200}
                    alt={seller.name}
                  />
                </div>
              )}
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 pt-5">
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Cancel
              </button>

              <button
                disabled={uploading}
                onClick={() => handleSave(user.id)}
                className="rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {uploading ? "Uploading..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}