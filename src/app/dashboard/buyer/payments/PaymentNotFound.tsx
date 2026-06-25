// app/payment/not-found.tsx

import Link from "next/link";
import { CreditCard, Home, ShoppingBag } from "lucide-react";

export default function PaymentNotFound() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="w-full max-w-2xl text-center">
        <div className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/10">
          <CreditCard className="h-14 w-14 text-red-500" />
        </div>

        <span className="mb-4 inline-block rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-600 dark:bg-red-500/10 dark:text-red-400">
          Payment Error
        </span>

        <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
          Payment Not Found
        </h1>

        <p className="mx-auto mb-8 max-w-xl text-lg text-slate-600 dark:text-slate-400">
          Sorry, we couldnot find any payment information associated with this
          transaction. The payment may have expired, been cancelled, or the
          payment link is invalid.
        </p>

        <div className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-3 font-semibold text-slate-900 dark:text-white">
            Possible Reasons
          </h3>

          <ul className="space-y-2 text-left text-slate-600 dark:text-slate-400">
            <li>• The payment session has expired.</li>
            <li>• The payment was already completed.</li>
            <li>• The payment link is incorrect.</li>
            <li>• The transaction was cancelled.</li>
          </ul>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-white transition hover:opacity-90"
          >
            <ShoppingBag size={18} />
            Browse Products
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 font-medium transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            <Home size={18} />
            Back Home
          </Link>
        </div>
      </div>
    </section>
  );
}
