export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex min-h-screen w-full items-center justify-center bg-white/90 backdrop-blur-sm transition-colors dark:bg-gray-950/90">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-orange-500 dark:border-gray-700 dark:border-t-orange-500" />

        {/* Loading Text */}
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Loading...
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Please wait a moment
        </p>
      </div>
    </div>
  );
}