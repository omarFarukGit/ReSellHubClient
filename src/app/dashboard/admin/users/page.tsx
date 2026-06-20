"use client";

import React from "react";

const users = [
  {
    id: 1,
    name: "Rakib Hasan",
    email: "rakib@gmail.com",
    role: "buyer",
    status: "active",
    joined: "2026-06-10",
  },
  {
    id: 2,
    name: "Mehedi Hasan",
    email: "mehedi@gmail.com",
    role: "seller",
    status: "active",
    joined: "2026-06-12",
  },
  {
    id: 3,
    name: "Abu Bakar",
    email: "abu@gmail.com",
    role: "seller",
    status: "blocked",
    joined: "2026-06-15",
  },
  {
    id: 4,
    name: "Tanvir Ahmed",
    email: "tanvir@gmail.com",
    role: "buyer",
    status: "active",
    joined: "2026-06-18",
  },
];

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

export default function AdminUsersPage() {
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
                key={user.id}
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
                <td className="p-4 text-gray-600">{user.joined}</td>

                {/* Actions */}
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-3 text-xs">
                    <button className="text-blue-600 hover:underline">
                      View
                    </button>

                    {user.status === "active" ? (
                      <button className="text-red-600 hover:underline">
                        Block
                      </button>
                    ) : (
                      <button className="text-green-600 hover:underline">
                        Unblock
                      </button>
                    )}

                    <button className="text-gray-600 hover:underline">
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
