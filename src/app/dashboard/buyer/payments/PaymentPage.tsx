"use client";

import React from "react";
import PaymentNotFound from "./PaymentNotFound";
import Image from "next/image";

type PaymentStatus = "paid" | "pending" | "failed" | "refunded";

const statusBadge = (status: PaymentStatus) => {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "failed":
      return "bg-red-100 text-red-700";
    case "refunded":
      return "bg-blue-100 text-blue-700";
  }
};

export default function BuyerPaymentsPage({ payments }: any) {
  if (!payments || payments.length === 0) {
    return <PaymentNotFound />;
  }

  return (
    <div className="p-6 md:p-10 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Payment Status</h1>
        <p className="text-sm text-gray-500">
          Track all your transactions and payment history
        </p>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-xl bg-white shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-4">Product</th>

                <th className="hidden md:table-cell p-4">Order ID</th>

                <th className="hidden lg:table-cell p-4">Amount</th>

                <th className="hidden lg:table-cell p-4">Method</th>

                <th className="hidden xl:table-cell p-4">Transaction ID</th>

                <th className="p-4">Status</th>

                <th className="hidden lg:table-cell p-4">Date</th>
              </tr>
            </thead>

            <tbody>
              {payments.length > 0 ? (
                payments.map((pay: any) => (
                  <tr
                    key={pay._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    {/* PRODUCT */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={pay.productImage}
                          className="h-10 w-10 rounded object-cover"
                          alt={pay.productName}
                          width={200}
                          height={200}
                        />

                        <div>
                          <p className="font-medium">{pay.productName}</p>

                          {/* Mobile Info */}
                          <div className="md:hidden text-xs text-gray-500 space-y-1">
                            <p>$ {pay.productPrice}</p>
                            <p>#{pay._id}</p>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* ORDER ID */}
                    <td className="hidden md:table-cell p-4 text-gray-600">
                      #{pay._id}
                    </td>

                    {/* AMOUNT */}
                    <td className="hidden lg:table-cell p-4 font-semibold">
                      $ {pay.productPrice}
                    </td>

                    {/* METHOD */}
                    <td className="hidden lg:table-cell p-4 capitalize text-gray-600">
                      Card
                    </td>

                    {/* TXN ID */}
                    <td className="hidden xl:table-cell p-4 text-xs text-gray-500">
                      {pay.transactionId}
                    </td>

                    {/* STATUS */}
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge(
                          pay.paymentStatus,
                        )}`}
                      >
                        {pay.paymentStatus}
                      </span>
                    </td>

                    {/* DATE */}
                    <td className="hidden lg:table-cell p-4 text-gray-600">
                      {new Date(pay.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-gray-500">
                    No payment history found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex flex-col gap-2 text-xs text-gray-500 md:flex-row md:justify-between">
        <span>Total Transactions: {payments.length}</span>
        <span>Buyer Payment Center</span>
      </div>
    </div>
  );
}
