import { Button } from "@/components/ui/button";

import { CarListingSkeleton } from "@/components/client/car-listing-skeleton";
import { getCarsDataWithPagination } from "@/data/cars";
import { Suspense } from "react";
import Link from "next/link";
import { ChevronDown, X } from "lucide-react";
import { ListViewCard } from "@/components/car-list-card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";

interface HomePageProps {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: HomePageProps) {
  const { page } = await searchParams;
  const pageNumber = parseInt(page ?? "1");
  const itemsPerPage = 10;
  const { data: cars, metadata } = await getCarsDataWithPagination(
    pageNumber,
    itemsPerPage
  );

  // Create URLSearchParams instance from current searchParams, excluding page
  const createPaginationUrl = (pageNum: number) => {
    return `/?page=${pageNum}`;
  };

  return (
    <Suspense fallback={<CarListingSkeleton />}>
      <section>
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              {cars.length > 0
                ? `${metadata.total} used cars were price-checked`
                : "No cars found"}
            </h2>
            <p className="text-muted-foreground">
              {cars.length > 0
                ? `Browse our selection of quality used cars.`
                : "Try adjusting your filters to see more results."}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Sort by
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              Filter
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {cars.length > 0 ? (
          <>
            <div className="flex flex-col gap-6 pt-8">
              {cars.map((car) => (
                <ListViewCard key={car.id} car={car} />
              ))}
            </div>
            <div className="mt-8">
              <Pagination>
                <PaginationContent>
                  {page > 1 && (
                    <PaginationItem>
                      <PaginationPrevious
                        href={createPaginationUrl(page - 1)}
                      />
                    </PaginationItem>
                  )}
                  {Array.from({ length: metadata.totalPages }).map(
                    (_, index) => (
                      <PaginationItem key={index + 1}>
                        <PaginationLink
                          href={createPaginationUrl(index + 1)}
                          isActive={page === index + 1}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}
                  {page < metadata.totalPages && (
                    <PaginationItem>
                      <PaginationNext href={createPaginationUrl(page + 1)} />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                No cars match your current filters.
              </p>
              <Button asChild>
                <Link href="/">
                  <X className="mr-2 h-4 w-4" />
                  Clear all filters
                </Link>
              </Button>
            </div>
          </div>
        )}
      </section>
    </Suspense>
  );
}
