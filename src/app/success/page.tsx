import { stripe } from "@/lib/stripe";
import Link from "next/link";
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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8 border border-slate-200">
        {/* HEADER */}
        <div className="text-center mb-6">
          <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 text-2xl">
            ✓
          </div>

          <h1 className="text-2xl font-bold text-orange-600 mt-3">
            Payment Successful
          </h1>

          <p className="text-slate-500 text-sm">Thank you for your purchase</p>
        </div>

        {/* ORDER DETAILS */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between border-b pb-2">
            <span className="text-slate-500">Transaction ID</span>
            <span className="font-medium text-slate-900">{transactionId}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="text-slate-500">Order ID</span>
            <span className="font-medium text-slate-900">{orderId}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="text-slate-500">Product</span>
            <span className="font-medium text-slate-900">{productName}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="text-slate-500">Amount</span>
            <span className="font-semibold text-orange-600">{amount}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="text-slate-500">Date</span>
            <span className="font-medium text-slate-900">{date}</span>
          </div>

          <div className="flex justify-between pt-2">
            <span className="text-slate-500">Status</span>
            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
              SUCCESS
            </span>
          </div>
        </div>

        {/* BUTTON */}
        <div className="mt-6">
          <Link
            href="/"
            className="block text-center bg-orange-500 text-white py-3 rounded-xl font-medium hover:bg-orange-600 transition shadow-md"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
