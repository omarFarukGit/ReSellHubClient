"use client";

import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function BuyerProfilePage({ user }: any) {
  const [buyer, setBuyer] = useState(user);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(user);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // 🔥 ImageBB Upload
  const uploadImage = async (file: File) => {
    setUploading(true);

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
    setUploading(false);

    return data.data.url;
  };

  // file select handler
  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = await uploadImage(file);

    setForm((prev: any) => ({
      ...prev,
      avatar: imageUrl,
    }));
  };

  // SAVE TO DATABASE
  const handleSave = async (userId: string) => {
    try {
      setSaving(true);

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
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Update failed");
      }

      setBuyer(data.data);
      setOpen(false);

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen space-y-8 bg-gray-50 p-6 text-gray-900 transition-colors dark:bg-gray-950 dark:text-gray-100 md:p-10">
      {/* PROFILE HEADER */}
      <div className="flex flex-col items-center gap-6 rounded-xl border border-gray-200 bg-white p-6 shadow dark:border-gray-800 dark:bg-gray-900 md:flex-row">
        <Image
          src={buyer.image || "https://i.pravatar.cc/150?img=12"}
          className="h-24 w-24 rounded-full border border-gray-200 object-cover dark:border-gray-700"
          width={200}
          height={200}
          alt="updated profile"
        />

        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {buyer.name}
          </h1>

          <p className="text-gray-500 dark:text-gray-400">
            {buyer.email}
          </p>

          <p className="text-gray-500 dark:text-gray-400">
            {buyer.phone || "+880 18XXXXXXXX"}
          </p>

          <p className="text-gray-500 dark:text-gray-400">
            {buyer.location}
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700 dark:bg-green-950/50 dark:text-green-400">
              {buyer.status}
            </span>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
              Buyer Account
            </span>
          </div>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="ml-auto cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          Edit Profile
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Orders
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {buyer.totalOrders}
          </h2>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Spent
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {buyer.totalSpent}
          </h2>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Member Since
          </p>

          <h2 className="text-md font-bold text-gray-900 dark:text-white">
            {buyer.joinDate}
          </h2>
        </div>
      </div>

      {/* ACCOUNT INFO */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-2 font-bold text-gray-900 dark:text-white">
          Account Info
        </h2>

        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <p>📍 Location: {buyer.location}</p>
          <p>📧 Email: {buyer.email}</p>
          <p>📞 Phone: {buyer.phone}</p>
        </div>
      </div>

      {/* EDIT MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md space-y-3 rounded-xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-900">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Edit Profile
            </h2>

            <input
              className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              placeholder="Name"
            />

            <input
              className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              placeholder="Email"
            />

            <input
              className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
              placeholder="Phone"
            />

            <input
              className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
              value={form.location}
              onChange={(e) =>
                setForm({ ...form, location: e.target.value })
              }
              placeholder="Location"
            />

            {/* IMAGE UPLOAD */}
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100 dark:text-gray-400 dark:file:bg-blue-950/50 dark:file:text-blue-400"
              />

              {uploading && (
                <p className="mt-2 text-xs text-blue-500 dark:text-blue-400">
                  Uploading image...
                </p>
              )}

              {form.avatar && (
                <Image
                  src={form.avatar}
                  className="mt-2 h-16 w-16 rounded-full border border-gray-200 object-cover dark:border-gray-700"
                  width={200}
                  height={200}
                  alt="updated profile"
                />
              )}
            </div>

            {/* BUTTONS */}
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setOpen(false)}
                className="cursor-pointer rounded border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Cancel
              </button>

              <button
                onClick={() => handleSave(user.id)}
                disabled={saving || uploading}
                className="cursor-pointer rounded bg-green-600 px-4 py-2 text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}