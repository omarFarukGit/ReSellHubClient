import OrdersPage from "./OrderPage";

const Page = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }

  const data = await res.json();
  const orders = data?.data ?? [];

  return (
    <main
      className="
        min-h-screen
        bg-gray-50
        transition-colors duration-300
        dark:bg-gray-950
      "
    >
      <OrdersPage orders={orders} />
    </main>
  );
};

export default Page;