import { Button } from "@/components/ui/button";
import { getCarsDataWithPagination } from "@/data/cars";
import Link from "next/link";
import { X } from "lucide-react";
import { ListViewCard } from "@/components/car-list-card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import { APP_ROUTES } from "@/lib/routes";

type searchParams = Promise<{ page?: string }>;

interface HomePageProps {
  searchParams: searchParams;
}

/**
 * Generates SEO metadata for the cars page.
 * @returns An object containing the title and description for the page.
 */
export async function generateMetadata(): Promise<{
  title: string;
  description: string;
}> {
  return {
    title: "AutoSearch | Cars",
    description: "Browse our selection of quality used cars.",
  };
}

export default async function Home({ searchParams }: HomePageProps) {
  const { page } = await searchParams;
  const pageNumber = parseInt(page ?? "1");
  const { data: cars, metadata } = await getCarsDataWithPagination(
    pageNumber,
    10
  );

  const createPaginationUrl = (pageNum: number) => {
    return `${APP_ROUTES.CARS}?page=${pageNum}`;
  };

  return (
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
      </div>

      <div className="flex flex-col gap-6 pt-8">
        {cars.map((car) => (
          <ListViewCard key={car.id} car={car} />
        ))}
      </div>
      <div className="mt-8">
        <Pagination>
          <PaginationContent>
            {pageNumber > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  href={createPaginationUrl(pageNumber - 1)}
                />
              </PaginationItem>
            )}
            {Array.from({ length: metadata.totalPages }).map((_, index) => (
              <PaginationItem key={index + 1}>
                <PaginationLink
                  href={createPaginationUrl(index + 1)}
                  isActive={pageNumber === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            {pageNumber < metadata.totalPages && (
              <PaginationItem>
                <PaginationNext href={createPaginationUrl(pageNumber + 1)} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
}
