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

  const productName =
    session.metadata?.productName || "MacBook Pro M1 2021";

  const amount = session.amount_total
    ? `$${(session.amount_total / 100).toFixed(2)}`
    : "$1188.00";

  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const orderData = {
    buyerInfo: {
      userId: session.metadata?.buyerId,
      name: session.metadata?.buyerName,
      email: session.metadata?.buyerEmail,
      phone: session.metadata?.phone,
      address: session.metadata?.address,
    },

    sellerInfo: {
      userId: session.metadata?.sellerId,
      name: session.metadata?.sellerName,
      email: session.metadata?.sellerEmail,
    },

    productId: session.metadata?.productId,
    productName: session.metadata?.productName,
    productPrice: session.metadata?.productPrice,
    productImage: session.metadata?.productImage,

    transactionId,
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      <div className="w-full max-w-xl">
        {/* SUCCESS CARD */}
        <div
          className="
            overflow-hidden rounded-3xl
            border border-slate-200
            bg-white shadow-xl
            dark:border-slate-800
            dark:bg-slate-900
          "
        >
          {/* TOP SUCCESS SECTION */}
          <div
            className="
              border-b border-slate-200
              bg-orange-50 px-6 py-8
              text-center
              dark:border-slate-800
              dark:bg-orange-950/20
            "
          >
            {/* SUCCESS ICON */}
            <div
              className="
                mx-auto flex h-16 w-16
                items-center justify-center
                rounded-full
                bg-orange-100
                text-3xl font-bold
                text-orange-600
                dark:bg-orange-500/10
                dark:text-orange-500
              "
            >
              ✓
            </div>

            <h1
              className="
                mt-4 text-2xl font-bold
                text-orange-600
                dark:text-orange-500
                md:text-3xl
              "
            >
              Payment Successful
            </h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Thank you for your purchase!
            </p>
          </div>

          {/* ORDER DETAILS */}
          <div className="px-6 py-7 md:px-8">
            <h2 className="mb-5 text-lg font-semibold">
              Order Details
            </h2>

            <div className="space-y-0 text-sm">
              {/* Transaction ID */}
              <div
                className="
                  flex flex-col gap-1 border-b
                  border-slate-200 py-4
                  sm:flex-row sm:items-center sm:justify-between
                  dark:border-slate-800
                "
              >
                <span className="text-slate-500 dark:text-slate-400">
                  Transaction ID
                </span>

                <span
                  className="
                    max-w-full break-all
                    font-medium text-slate-900
                    dark:text-white
                    sm:max-w-[60%] sm:text-right
                  "
                >
                  {transactionId}
                </span>
              </div>

              {/* Order ID */}
              <div
                className="
                  flex flex-col gap-1 border-b
                  border-slate-200 py-4
                  sm:flex-row sm:items-center sm:justify-between
                  dark:border-slate-800
                "
              >
                <span className="text-slate-500 dark:text-slate-400">
                  Order ID
                </span>

                <span className="font-medium text-slate-900 dark:text-white">
                  {orderId}
                </span>
              </div>

              {/* Product */}
              <div
                className="
                  flex flex-col gap-1 border-b
                  border-slate-200 py-4
                  sm:flex-row sm:items-center sm:justify-between
                  dark:border-slate-800
                "
              >
                <span className="text-slate-500 dark:text-slate-400">
                  Product
                </span>

                <span
                  className="
                    font-medium text-slate-900
                    dark:text-white
                    sm:text-right
                  "
                >
                  {productName}
                </span>
              </div>

              {/* Amount */}
              <div
                className="
                  flex flex-col gap-1 border-b
                  border-slate-200 py-4
                  sm:flex-row sm:items-center sm:justify-between
                  dark:border-slate-800
                "
              >
                <span className="text-slate-500 dark:text-slate-400">
                  Amount
                </span>

                <span
                  className="
                    text-lg font-bold
                    text-orange-600
                    dark:text-orange-500
                  "
                >
                  {amount}
                </span>
              </div>

              {/* Date */}
              <div
                className="
                  flex flex-col gap-1 border-b
                  border-slate-200 py-4
                  sm:flex-row sm:items-center sm:justify-between
                  dark:border-slate-800
                "
              >
                <span className="text-slate-500 dark:text-slate-400">
                  Date
                </span>

                <span className="font-medium text-slate-900 dark:text-white">
                  {date}
                </span>
              </div>

              {/* Status */}
              <div
                className="
                  flex items-center
                  justify-between
                  py-4
                "
              >
                <span className="text-slate-500 dark:text-slate-400">
                  Payment Status
                </span>

                <span
                  className="
                    rounded-full
                    bg-green-100
                    px-3 py-1
                    text-xs font-semibold
                    text-green-700
                    dark:bg-green-500/10
                    dark:text-green-400
                  "
                >
                  ✓ SUCCESS
                </span>
              </div>
            </div>

            {/* BUTTON */}
            <Link
              href="/"
              className="
                mt-6 block w-full
                rounded-xl
                bg-orange-500
                px-4 py-3
                text-center
                font-semibold text-white
                shadow-sm
                transition
                hover:bg-orange-600
                dark:bg-orange-500
                dark:hover:bg-orange-400
              "
            >
              Back to Home
            </Link>

            {/* SMALL MESSAGE */}
            <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-500">
              Your payment has been successfully processed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}