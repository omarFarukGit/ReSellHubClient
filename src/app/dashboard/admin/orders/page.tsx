import OrdersPage from "./OrderPage";

const page = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders`);
  const data = await res.json();
  const orders = data.data;
  console.log(orders);
  return (
    <div>
      <OrdersPage orders={orders} />
    </div>
  );
};

export default page;
