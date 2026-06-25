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

      await res.json();

      if (!res.ok) {
        toast.error("Delete user failed ❌");
        return;
      }

      toast.success("User deleted successfully ✅");
      router.refresh();
    } catch (error) {
      console.error(error);
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

      await res.json();

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
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
          <p className="text-sm text-gray-500">Manage all buyers and sellers</p>
        </div>

        <div className="text-sm text-gray-500">Total Users: {users.length}</div>
      </div>

      {/* Table Card */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="w-full">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left font-semibold text-gray-700">
                  User
                </th>

                <th className="p-4 text-left font-semibold text-gray-700">
                  Email
                </th>

                <th className="hidden md:table-cell p-4 text-left font-semibold text-gray-700">
                  Role
                </th>

                <th className="hidden lg:table-cell p-4 text-left font-semibold text-gray-700">
                  Status
                </th>

                <th className="hidden xl:table-cell p-4 text-left font-semibold text-gray-700">
                  Joined
                </th>

                <th className="p-4 text-right font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    {/* User */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
                          {user.name?.charAt(0)?.toUpperCase()}
                        </div>

                        <div>
                          <p className="font-medium text-gray-900">
                            {user.name}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="p-4 text-gray-600 break-all">
                      {user.email}
                    </td>

                    {/* Role */}
                    <td className="hidden md:table-cell p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${roleBadge(
                          user.role,
                        )}`}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="hidden lg:table-cell p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${statusBadge(
                          user.status,
                        )}`}
                      >
                        {user.status}
                      </span>
                    </td>

                    {/* Joined */}
                    <td className="hidden xl:table-cell p-4 text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>

                    {/* Actions */}
                    <td className="p-4">
                      <div className="flex flex-col items-end gap-1 sm:flex-row sm:justify-end">
                        <button className="rounded-lg px-2 py-1 text-blue-600 hover:bg-blue-50">
                          View
                        </button>

                        <button
                          onClick={() =>
                            statusChangeUser(user._id, user.status)
                          }
                          className={`rounded-lg px-2 py-1 ${
                            user.status === "active"
                              ? "text-red-600 hover:bg-red-50"
                              : "text-green-600 hover:bg-green-50"
                          }`}
                        >
                          {user.status === "active" ? "Block" : "Unblock"}
                        </button>

                        <button
                          onClick={() => deleteUser(user._id)}
                          className="rounded-lg px-2 py-1 text-gray-700 hover:bg-gray-100"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-2 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
        <span>Total Users: {users.length}</span>
        <span>Showing all records</span>
      </div>
    </div>
  );
}
