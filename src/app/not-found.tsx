import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-primary">404</h1>

        <h2 className="mt-4 text-3xl font-bold text-gray-900">
          Page Not Found
        </h2>

        <p className="mt-3 text-gray-600">
          Sorry, the page you are looking for doesnot exist or has been moved.
          Explore ResellHub and discover great deals on quality pre-owned
          products.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-lg bg-primary px-6 py-3 font-medium text-white transition hover:opacity-90"
          >
            Back to Home
          </Link>

          <Link
            href="/products"
            className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Browse Products
          </Link>
        </div>

        <div className="mt-10 rounded-xl border bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-primary">ResellHub</span> — Buy,
            Sell & Discover Quality Pre-Owned Products.
          </p>
        </div>
      </div>
    </div>
  );
}
