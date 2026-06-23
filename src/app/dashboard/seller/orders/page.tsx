import React from "react";
import SellerOrdersPage from "./SellerOrderPage";
import { getUserSession } from "@/lib/core/session";

const OrderPage = async () => {
  const user = await getUserSession();

  const res = await fetch(
    `http://localhost:3001/api/v1/orders/seller-orders/${user?.id}`,
  );
  const data = await res.json();
  const orders = data.data;
  console.log(orders, "seller");
  return (
    <div>
      <SellerOrdersPage orders={orders} />
    </div>
  );
};

export default OrderPage;
