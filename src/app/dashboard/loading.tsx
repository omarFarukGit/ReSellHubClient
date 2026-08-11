import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <Skeleton className="h-10 w-80" />
        <Skeleton className="h-5 w-96" />
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="flex items-center justify-between rounded-xl border p-6"
          >
            <div className="space-y-3">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-9 w-16" />
            </div>

            <Skeleton className="h-14 w-14 rounded-xl" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Requests */}
        <div className="space-y-5 rounded-xl border p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-7 w-56" />
            <Skeleton className="h-5 w-20" />
          </div>

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>

              <Skeleton className="h-8 w-20 rounded-full" />
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="space-y-5 rounded-xl border p-6">
          <Skeleton className="h-7 w-40" />

          <Skeleton className="h-11 w-full rounded-md" />
          <Skeleton className="h-11 w-full rounded-md" />
          <Skeleton className="h-11 w-full rounded-md" />
        </div>
      </div>

      {/* Recommended Properties */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <Skeleton className="h-7 w-60" />
          <Skeleton className="h-5 w-24" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="overflow-hidden rounded-xl border">
              <Skeleton className="h-52 w-full" />

              <div className="space-y-3 p-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />

                <div className="flex justify-between pt-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-9 w-24 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
