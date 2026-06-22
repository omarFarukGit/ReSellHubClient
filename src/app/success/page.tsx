import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

export default async function Success({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const { session_id } = await searchParams;

  if (!session_id) {
    return redirect("/");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["payment_intent"],
  });

  if (session.status === "open") {
    return redirect("/");
  }

  const orderId = session.metadata?.orderId || "#MQOMBLOZ";

  const transactionId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id || "TXN-096631954";

  const productName = session.metadata?.productName || "MacBook Pro M1 2021";

  const amount = session.amount_total
    ? `$${(session.amount_total / 100).toFixed(2)}`
    : "$1188.00";

  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl">
            ✓
          </div>

          <h1 className="text-2xl font-bold text-green-600 mt-3">
            Payment Successful
          </h1>

          <p className="text-gray-500 text-sm">Thank you for your purchase</p>
        </div>

        {/* Order Details */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Transaction ID</span>
            <span className="font-medium">{transactionId}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Order ID</span>
            <span className="font-medium">{orderId}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Product</span>
            <span className="font-medium">{productName}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Amount</span>
            <span className="font-semibold text-blue-600">{amount}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Date</span>
            <span className="font-medium">{date}</span>
          </div>

          <div className="flex justify-between pt-2">
            <span className="text-gray-500">Status</span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
              SUCCESS
            </span>
          </div>
        </div>

        {/* Button */}
        <div className="mt-6">
          <a
            href="/"
            className="block text-center bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
