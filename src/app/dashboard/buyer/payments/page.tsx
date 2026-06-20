"use client";

import React from "react";

type PaymentStatus = "paid" | "pending" | "failed" | "refunded";

interface Payment {
  id: number;
  orderId: number;
  productName: string;
  amount: number;
  method: "card" | "bkash" | "nagad" | "cash";
  status: PaymentStatus;
  transactionId: string;
  date: string;
}

const payments: Payment[] = [
  {
    id: 1,
    orderId: 101,
    productName: "iPhone 13 Pro",
    amount: 85000,
    method: "bkash",
    status: "paid",
    transactionId: "TXN123456",
    date: "2026-06-18",
  },
  {
    id: 2,
    orderId: 102,
    productName: "MacBook Air M1",
    amount: 95000,
    method: "card",
    status: "pending",
    transactionId: "TXN987654",
    date: "2026-06-17",
  },
  {
    id: 3,
    orderId: 103,
    productName: "Nike Sneakers",
    amount: 6500,
    method: "nagad",
    status: "failed",
    transactionId: "TXN555111",
    date: "2026-06-16",
  },
  {
    id: 4,
    orderId: 104,
    productName: "Gaming Chair",
    amount: 13500,
    method: "cash",
    status: "refunded",
    transactionId: "TXN222333",
    date: "2026-06-15",
  },
];

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

export default function BuyerPaymentsPage() {
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
              <th className="p-4">Transaction ID</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {payments.map((pay) => (
              <tr key={pay.id} className="border-t hover:bg-gray-50 transition">
                {/* PRODUCT */}
                <td className="p-4 font-medium">{pay.productName}</td>

                {/* ORDER ID */}
                <td className="p-4 text-gray-600">#{pay.orderId}</td>

                {/* AMOUNT */}
                <td className="p-4 font-semibold">
                  ৳ {pay.amount.toLocaleString()}
                </td>

                {/* METHOD */}
                <td className="p-4 capitalize text-gray-600">{pay.method}</td>

                {/* TXN ID */}
                <td className="p-4 text-gray-500 text-xs">
                  {pay.transactionId}
                </td>

                {/* STATUS */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge(
                      pay.status,
                    )}`}
                  >
                    {pay.status}
                  </span>
                </td>

                {/* DATE */}
                <td className="p-4 text-gray-600">{pay.date}</td>
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
