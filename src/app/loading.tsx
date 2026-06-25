export default function Loading() {
  return (
    <div className="fixed  flex items-center justify-center bg-white min-h-[80vh] mx-auto w-full z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />

        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    </div>
  );
}
