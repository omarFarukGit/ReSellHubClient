"use client";

import Image from "next/image";
import React, { useState } from "react";


export default function AdminProfile({ user }: any) {
  const [admin, setAdmin] = useState(user);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(user);
  const [uploading, setUploading] = useState(false);

  // IMAGE UPLOAD (ImageBB)
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = await uploadImage(file);

    setForm((prev: any) => ({
      ...prev,
      avatar: imageUrl,
    }));
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

      setAdmin(data.data);
      setOpen(false);

      alert("Profile updated successfully");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8">
      {/* PROFILE HEADER */}
      <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center gap-6">
        <Image
          src={admin.image || "https://i.pravatar.cc/150?img=12"}
          className="w-24 h-24 rounded-full object-cover border"
          width={200}
          height={200}
          alt={admin.name}
        />

        <div className="space-y-1">
          <h1 className="text-2xl font-bold">{admin.name}</h1>

          <p className="text-gray-500">{admin.email}</p>
          <p className="text-gray-500">{admin.phone || "+880 17XXXXXXXX"}</p>
          <p className="text-gray-500">{admin.location}</p>

          {/* BADGES */}
          <div className="flex gap-2 mt-2 flex-wrap">
            <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
              {admin.role}
            </span>

            <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
              ⭐ {admin.rating} Rating
            </span>

            <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-700">
              {"verified"}
            </span>
          </div>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          Edit Profile
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Sales</p>
          <h2 className="text-2xl font-bold">{admin.totalSales}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Revenue</p>
          <h2 className="text-2xl font-bold">{admin.revenue}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Active Listings</p>
          <h2 className="text-2xl font-bold">{admin.activeListings}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Member Since</p>
          <h2 className="text-md font-bold">{admin.joinDate}</h2>
        </div>
      </div>

      {/* ABOUT */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-bold mb-2">About admin</h2>
        <p className="text-gray-600 text-sm leading-6">
          {admin.bio || "added your bio"}
        </p>
      </div>

      {/* EDIT MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md p-6 rounded-xl space-y-3">
            <h2 className="text-xl font-bold">Update Profile</h2>

            <input
              className="w-full border p-2 rounded"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              className="w-full border p-2 rounded"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              className="w-full border p-2 rounded"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <input
              className="w-full border p-2 rounded"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />

            <input
              className="w-full border p-2 rounded"
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              placeholder="Bio"
            />

            {/* IMAGE UPLOAD */}
            <input type="file" accept="image/*" onChange={handleFileChange} />

            {uploading && <p className="text-xs text-blue-500">Uploading...</p>}

            {form.avatar && (
              <Image
                src={form.avatar}
                className="w-16 h-16 rounded-full object-cover"
                width={200}
                height={200}
                alt={admin.name}
              />
            )}

            {/* ACTIONS */}
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 border rounded cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={() => handleSave(user.id)}
                className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
