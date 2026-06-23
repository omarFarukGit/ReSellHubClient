"use client";

import { UsersTableProps } from "@/types/userType";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const statusBadge = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-700";
    case "blocked":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const roleBadge = (role: string) => {
  switch (role) {
    case "seller":
      return "bg-blue-100 text-blue-700";
    case "buyer":
      return "bg-purple-100 text-purple-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export default function AdminUsersPage({ users }: UsersTableProps) {
  const router = useRouter();
  const deleteUser = async (userId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/${userId}`,
        {
          method: "DELETE",
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error("delte user failed ❌");
        return;
      }

      toast.success("delete user successfully ✅");

      router.refresh(); // 🔥 page data refresh
    } catch (error) {
      toast.error("Something went wrong ❌");
    }
  };
  const statusChangeUser = async (userId: string, currentStatus: string) => {
    try {
      const payload = {
        status: currentStatus === "active" ? "blocked" : "active",
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error("User status change failed ❌");
        return;
      }

      toast.success(
        `User ${
          payload.status === "blocked" ? "blocked" : "unblocked"
        } successfully ✅`,
      );

      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong ❌");
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="text-sm text-gray-500">Manage all buyers and sellers</p>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full min-w-[800px] text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Joined</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* User */}
                <td className="p-4 font-medium">{user.name}</td>

                {/* Email */}
                <td className="p-4 text-gray-600">{user.email}</td>

                {/* Role */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${roleBadge(
                      user.role,
                    )}`}
                  >
                    {user.role}
                  </span>
                </td>

                {/* Status */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge(
                      user.status,
                    )}`}
                  >
                    {user.status}
                  </span>
                </td>

                {/* Joined */}
                <td className="p-4 text-gray-600">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>

                {/* Actions */}
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-3 text-xs">
                    <button className="text-blue-600 hover:underline">
                      View
                    </button>

                    <button
                      onClick={() => statusChangeUser(user._id, user.status)}
                      className={
                        user.status === "active"
                          ? "text-red-600 hover:underline"
                          : "text-green-600 hover:underline"
                      }
                    >
                      {user.status === "active" ? "Block" : "Unblock"}
                    </button>

                    <button
                      className="text-gray-600 hover:underline"
                      onClick={() => deleteUser(user._id)}
                    >
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
      <div className="flex justify-between text-xs text-gray-500">
        <span>Total Users: {users.length}</span>
        <span>Showing all records</span>
      </div>
    </div>
  );
}
