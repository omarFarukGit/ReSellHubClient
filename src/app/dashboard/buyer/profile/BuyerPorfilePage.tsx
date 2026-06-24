"use client";

import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";

// const initialBuyer = {
//   id: "buyer_123",
//   name: "Abu Bakar",
//   email: "abu.bakar@gmail.com",
//   phone: "+880 18XXXXXXXX",
//   location: "Dhaka, Bangladesh",
//   avatar: "https://i.pravatar.cc/150?img=12",
//   joinDate: "2026-01-10",

//   totalOrders: 12,
//   totalSpent: "৳ 1,45,000",
//   status: "Active",
// };

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
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = await uploadImage(file);

    setForm((prev:any) => ({
      ...prev,
      avatar: imageUrl,
    }));
  };

  // SAVE TO DATABASE
  // const handleSave = async () => {
  //   setSaving(true);

  //   const res = await fetch("/api/buyer/profile", {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(form),
  //   });

  //   const data = await res.json();

  //   setBuyer(data);
  //   setSaving(false);
  //   setOpen(false);
  // };
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
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8">
      {/* PROFILE HEADER */}
      <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center gap-6">
        <Image
          src={buyer.image || "https://i.pravatar.cc/150?img=12"}
          className="w-24 h-24 rounded-full object-cover border"
          width={200}
          height={200}
          alt="updated profile"
        />

        <div className="space-y-1">
          <h1 className="text-2xl font-bold">{buyer.name}</h1>
          <p className="text-gray-500">{buyer.email}</p>
          <p className="text-gray-500">{buyer.phone || "+880 18XXXXXXXX"}</p>
          <p className="text-gray-500">{buyer.location}</p>

          <div className="flex gap-2 mt-2 flex-wrap">
            <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
              {buyer.status}
            </span>

            <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
              Buyer Account
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Orders</p>
          <h2 className="text-2xl font-bold">{buyer.totalOrders}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Spent</p>
          <h2 className="text-2xl font-bold">{buyer.totalSpent}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Member Since</p>
          <h2 className="text-md font-bold">{buyer.joinDate}</h2>
        </div>
      </div>

      {/* ACCOUNT INFO */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-bold mb-2">Account Info</h2>
        <div className="text-sm text-gray-600 space-y-2">
          <p>📍 Location: {buyer.location}</p>
          <p>📧 Email: {buyer.email}</p>
          <p>📞 Phone: {buyer.phone}</p>
        </div>
      </div>

      {/* EDIT MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md p-6 rounded-xl space-y-3">
            <h2 className="text-xl font-bold">Edit Profile</h2>

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

            {/* IMAGE UPLOAD */}
            <div>
              <input type="file" accept="image/*" onChange={handleFileChange} />

              {uploading && (
                <p className="text-xs text-blue-500">Uploading image...</p>
              )}

              {form.avatar && (
                <Image
                  src={form.avatar}
                  className="w-16 h-16 rounded-full mt-2"
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
                className="px-4 py-2 border rounded cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={() => handleSave(user.id)}
                disabled={saving}
                className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer"
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
