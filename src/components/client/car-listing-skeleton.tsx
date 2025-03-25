import { Skeleton } from "@/components/ui/skeleton";

export function CarListingSkeleton() {
  return (
    <section>
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="space-y-2">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-6 w-64" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-24" />
        </div>
      </div>

      <div className="flex flex-col gap-6 pt-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col sm:flex-row gap-6">
            <Skeleton className="h-48 w-full sm:w-72 rounded-lg" />
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Skeleton className="h-10 w-32" />
      </div>
    </section>
  );
}
