import React from "react";
import BuyerPaymentsPage from "./PaymentPage";
import { getUserSession } from "@/lib/core/session";

const Payment = async () => {
  const user = await getUserSession();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/my-orders/${user?.id}`,
  );
  const data = await res.json();
  const payments = data.data;
  console.log(payments, "payments");
  return (
    <div>
      <BuyerPaymentsPage payments={payments} />
    </div>
  );
};

export default Payment;
