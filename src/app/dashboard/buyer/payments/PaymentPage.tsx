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
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full min-w-[950px] text-sm">
          {/* HEAD */}
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Order ID</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Method</th>
              {/* <th className="p-4">Transaction ID</th> */}
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {payments.map((pay: any) => (
              <tr
                key={pay._id}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* PRODUCT */}
                <td className="p-4 flex items-center gap-3">
                  <Image
                    src={pay.productImage}
                    className="w-10 h-10 rounded object-cover"
                    alt={pay.productName}
                    width={200}
                    height={200}
                  />
                  <span className="font-medium">{pay.productName}</span>
                </td>

                {/* ORDER ID */}
                <td className="p-4 text-gray-600">#{pay._id}</td>

                {/* AMOUNT */}
                <td className="p-4 font-semibold">$ {pay.productPrice}</td>

                {/* METHOD */}
                <td className="p-4 capitalize text-gray-600">Card</td>

                {/* TXN ID */}
                {/* <td className="p-4 text-gray-500 text-xs">
                  {pay.transactionId}
                </td> */}

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
                <td className="p-4 text-gray-600">
                  {new Date(pay.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="flex justify-between text-xs text-gray-500">
        <span>Total Transactions: {payments.length}</span>
        <span>Buyer Payment Center</span>
      </div>
    </div>
  );
}
