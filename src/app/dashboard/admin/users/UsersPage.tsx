"use client";

import { UsersTableProps } from "@/types/userType";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const statusBadge = (status: string) => {
  switch (status) {
    case "active":
      return `
        bg-green-100 text-green-700
        dark:bg-green-500/10 dark:text-green-400
      `;

    case "blocked":
      return `
        bg-red-100 text-red-700
        dark:bg-red-500/10 dark:text-red-400
      `;

    default:
      return `
        bg-gray-100 text-gray-600
        dark:bg-gray-800 dark:text-gray-400
      `;
  }
};

const roleBadge = (role: string) => {
  switch (role) {
    case "seller":
      return `
        bg-blue-100 text-blue-700
        dark:bg-blue-500/10 dark:text-blue-400
      `;

    case "buyer":
      return `
        bg-purple-100 text-purple-700
        dark:bg-purple-500/10 dark:text-purple-400
      `;

    default:
      return `
        bg-gray-100 text-gray-600
        dark:bg-gray-800 dark:text-gray-400
      `;
  }
};

export default function AdminUsersPage({
  users,
}: UsersTableProps) {
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

  const statusChangeUser = async (
    userId: string,
    currentStatus: string,
  ) => {
    try {
      const payload = {
        status:
          currentStatus === "active"
            ? "blocked"
            : "active",
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
          payload.status === "blocked"
            ? "blocked"
            : "unblocked"
        } successfully ✅`,
      );

      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong ❌");
    }
  };

  return (
    <div
      className="
        min-h-screen
        space-y-6
        bg-gray-50
        p-4
        transition-colors
        duration-300

        dark:bg-gray-950

        md:p-6
        lg:p-8
      "
    >
      {/* Header */}
      <div
        className="
          flex
          flex-col
          gap-2
          md:flex-row
          md:items-center
          md:justify-between
        "
      >
        <div>
          <h1
            className="
              text-2xl
              font-bold
              text-gray-900

              dark:text-white
            "
          >
            Users Management
          </h1>

          <p
            className="
              text-sm
              text-gray-500

              dark:text-gray-400
            "
          >
            Manage all buyers and sellers
          </p>
        </div>

        <div
          className="
            text-sm
            text-gray-500

            dark:text-gray-400
          "
        >
          Total Users:{" "}
          <span className="font-semibold text-orange-500">
            {users.length}
          </span>
        </div>
      </div>

      {/* Table Card */}
      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-gray-200
          bg-white
          shadow-sm
          transition-colors
          duration-300

          dark:border-gray-800
          dark:bg-gray-900
        "
      >
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm">
            {/* Table Header */}
            <thead
              className="
                bg-gray-50

                dark:bg-gray-800
              "
            >
              <tr>
                <th
                  className="
                    p-4
                    text-left
                    font-semibold
                    text-gray-700

                    dark:text-gray-300
                  "
                >
                  User
                </th>

                <th
                  className="
                    p-4
                    text-left
                    font-semibold
                    text-gray-700

                    dark:text-gray-300
                  "
                >
                  Email
                </th>

                <th
                  className="
                    hidden
                    p-4
                    text-left
                    font-semibold
                    text-gray-700

                    dark:text-gray-300

                    md:table-cell
                  "
                >
                  Role
                </th>

                <th
                  className="
                    hidden
                    p-4
                    text-left
                    font-semibold
                    text-gray-700

                    dark:text-gray-300

                    lg:table-cell
                  "
                >
                  Status
                </th>

                <th
                  className="
                    hidden
                    p-4
                    text-left
                    font-semibold
                    text-gray-700

                    dark:text-gray-300

                    xl:table-cell
                  "
                >
                  Joined
                </th>

                <th
                  className="
                    p-4
                    text-right
                    font-semibold
                    text-gray-700

                    dark:text-gray-300
                  "
                >
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr
                    key={user._id}
                    className="
                      border-t
                      border-gray-100
                      transition-colors
                      hover:bg-gray-50

                      dark:border-gray-800
                      dark:hover:bg-gray-800/50
                    "
                  >
                    {/* User */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-indigo-100
                            font-semibold
                            text-indigo-700

                            dark:bg-indigo-500/10
                            dark:text-indigo-400
                          "
                        >
                          {user.name
                            ?.charAt(0)
                            ?.toUpperCase()}
                        </div>

                        <div>
                          <p
                            className="
                              font-medium
                              text-gray-900

                              dark:text-white
                            "
                          >
                            {user.name}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td
                      className="
                        break-all
                        p-4
                        text-gray-600

                        dark:text-gray-400
                      "
                    >
                      {user.email}
                    </td>

                    {/* Role */}
                    <td
                      className="
                        hidden
                        p-4

                        md:table-cell
                      "
                    >
                      <span
                        className={`
                          rounded-full
                          px-3
                          py-1
                          text-xs
                          font-medium
                          ${roleBadge(user.role)}
                        `}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* Status */}
                    <td
                      className="
                        hidden
                        p-4

                        lg:table-cell
                      "
                    >
                      <span
                        className={`
                          rounded-full
                          px-3
                          py-1
                          text-xs
                          font-medium
                          ${statusBadge(user.status)}
                        `}
                      >
                        {user.status}
                      </span>
                    </td>

                    {/* Joined */}
                    <td
                      className="
                        hidden
                        p-4
                        text-gray-600

                        dark:text-gray-400

                        xl:table-cell
                      "
                    >
                      {new Date(
                        user.createdAt,
                      ).toLocaleDateString()}
                    </td>

                    {/* Actions */}
                    <td className="p-4">
                      <div
                        className="
                          flex
                          flex-col
                          items-end
                          gap-1

                          sm:flex-row
                          sm:justify-end
                        "
                      >
                        {/* Block / Unblock */}
                        <button
                          onClick={() =>
                            statusChangeUser(
                              user._id,
                              user.status,
                            )
                          }
                          className={`
                            rounded-lg
                            px-3
                            py-1.5
                            font-medium
                            transition

                            ${
                              user.status === "active"
                                ? `
                                  text-red-600
                                  hover:bg-red-50

                                  dark:text-red-400
                                  dark:hover:bg-red-500/10
                                `
                                : `
                                  text-green-600
                                  hover:bg-green-50

                                  dark:text-green-400
                                  dark:hover:bg-green-500/10
                                `
                            }
                          `}
                        >
                          {user.status === "active"
                            ? "Block"
                            : "Unblock"}
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() =>
                            deleteUser(user._id)
                          }
                          className="
                            rounded-lg
                            px-3
                            py-1.5
                            font-medium
                            text-gray-700
                            transition
                            hover:bg-gray-100

                            dark:text-gray-300
                            dark:hover:bg-gray-800
                          "
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="
                      py-16
                      text-center
                      text-gray-500

                      dark:text-gray-400
                    "
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div
        className="
          flex
          flex-col
          gap-2
          text-sm
          text-gray-500

          dark:text-gray-400

          md:flex-row
          md:items-center
          md:justify-between
        "
      >
        <span>
          Total Users: {users.length}
        </span>

        <span>
          Showing all records
        </span>
      </div>
    </div>
  );
}