import { Skeleton } from "@/components/ui/skeleton";

export default function CarDetailLoading() {
  return (
    <div className="container py-6 md:py-12">
      <div className="grid gap-6">
        {/* Breadcrumbs skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Header skeleton */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-32" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        {/* Main content skeleton */}
        <div className="grid md:grid-cols-[1.5fr_1fr] gap-6">
          {/* Left column */}
          <div className="space-y-6">
            {/* Car images skeleton */}
            <div className="aspect-video bg-muted rounded-lg" />

            {/* Tabs skeleton */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <Skeleton className="h-10 w-24" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>

            {/* Environmental info skeleton */}
            <div className="space-y-4 border-t pt-4">
              <Skeleton className="h-6 w-48" />
              <div className="grid gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Key specs skeleton */}
            <div className="rounded-lg border divide-y">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="p-4 flex items-center gap-4">
                  <Skeleton className="h-6 w-6" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                </div>
              ))}
            </div>

            {/* Price info skeleton */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <Skeleton className="h-5 w-5" />
              </div>
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Seller info skeleton */}
            <div className="space-y-4 border-t pt-4">
              <div className="flex justify-between items-start">
                <Skeleton className="h-6 w-24" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-32" />
              </div>
            </div>

            {/* Action buttons skeleton */}
            <div className="grid gap-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
