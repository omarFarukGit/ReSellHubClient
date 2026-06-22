import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const {
    status,
    customer_details: { email: customerEmail },
    metadata,
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  const orderData = {
    buyerInfo: {
      userId: metadata?.buyerId,
      name: metadata?.buyerName,
      email: metadata?.buyerEmail,
    },
    sellerInfo: {
      userId: metadata?.sellerId,
      name: metadata?.sellerName,
      email: metadata?.sellerEmail,
    },
    productId: metadata?.productId,
    paymentStatus: "paid",
    orderStatus: "pending",
  };

  const createOrder = async (orderData: any) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      },
    );

    return res.json();
  };

  createOrder(orderData);

  if (status === "complete") {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{" "}
          {customerEmail}. If you have any questions, please email{" "}
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    );
  }
}
