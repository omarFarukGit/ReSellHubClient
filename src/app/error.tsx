"use client";

import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">Oops!</h1>

        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Something went wrong
        </h2>

        <p className="text-gray-600 mb-6">
          We encountered an unexpected error while processing your request.
          Please try again or return to the homepage.
        </p>

        {process.env.NODE_ENV === "development" && (
          <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg mb-6">
            {error.message}
          </p>
        )}

        <div className="flex justify-center gap-4">
          <button
            onClick={() => reset()}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
