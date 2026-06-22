import { getProductById } from "@/lib/api/products";
import CheckoutClient from "./CheckoutClient";

export default async function CheckoutPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const res = await getProductById(id);
  const product = res?.data;

  console.log(product, id, "pro");
  return <CheckoutClient product={product} />;
}
