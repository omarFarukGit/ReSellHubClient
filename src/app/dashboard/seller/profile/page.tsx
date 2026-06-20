"use client";

import React, { useState } from "react";

const initialSeller = {
  name: "Rakib Hasan",
  email: "rakib.seller@gmail.com",
  phone: "+880 17XXXXXXXX",
  location: "Dhaka, Bangladesh",
  role: "Verified Seller",
  joinDate: "2025-12-10",
  avatar: "https://i.pravatar.cc/150?img=12",

  // ➕ extra marketplace info
  rating: 4.7,
  totalSales: 42,
  revenue: "৳ 2,35,000",
  activeListings: 8,
  bio: "Verified seller with fast delivery and trusted service in electronics and fashion products.",
  verificationStatus: "verified",
};

export default function SellerProfilePage() {
  const [seller, setSeller] = useState(initialSeller);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialSeller);
  const [uploading, setUploading] = useState(false);

  // IMAGE UPLOAD (ImageBB)
  const uploadImage = async (file: File) => {
    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY`,
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

    setForm((prev) => ({
      ...prev,
      avatar: imageUrl,
    }));
  };

  const handleSave = () => {
    setSeller(form);
    setOpen(false);
  };

  return (
    <div className="p-6 md:p-10 space-y-8">
      {/* PROFILE HEADER */}
      <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center gap-6">
        <img
          src={seller.avatar}
          className="w-24 h-24 rounded-full object-cover border"
        />

        <div className="space-y-1">
          <h1 className="text-2xl font-bold">{seller.name}</h1>

          <p className="text-gray-500">{seller.email}</p>
          <p className="text-gray-500">{seller.phone}</p>
          <p className="text-gray-500">{seller.location}</p>

          {/* BADGES */}
          <div className="flex gap-2 mt-2 flex-wrap">
            <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
              {seller.role}
            </span>

            <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
              ⭐ {seller.rating} Rating
            </span>

            <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-700">
              {seller.verificationStatus}
            </span>
          </div>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Edit Profile
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Sales</p>
          <h2 className="text-2xl font-bold">{seller.totalSales}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Revenue</p>
          <h2 className="text-2xl font-bold">{seller.revenue}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Active Listings</p>
          <h2 className="text-2xl font-bold">{seller.activeListings}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Member Since</p>
          <h2 className="text-md font-bold">{seller.joinDate}</h2>
        </div>
      </div>

      {/* ABOUT */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-bold mb-2">About Seller</h2>
        <p className="text-gray-600 text-sm leading-6">{seller.bio}</p>
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
              <img
                src={form.avatar}
                className="w-16 h-16 rounded-full object-cover"
              />
            )}

            {/* ACTIONS */}
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded"
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
