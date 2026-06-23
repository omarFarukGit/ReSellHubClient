import React from "react";
import BuyerOrdersPage from "./ByerOrderPage";
import { getUserSession } from "@/lib/core/session";

const OrderPage = async () => {
  const user = await getUserSession();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/my-orders/${user?.id}`,
  );
  const data = await res.json();
  const orders = data.data;
  console.log(orders);
  return (
    <div>
      <BuyerOrdersPage orders={orders} user={user} />
    </div>
  );
};

export default OrderPage;
