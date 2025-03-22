"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, X } from "lucide-react"
import { CarViewToggle } from "@/components/client/car-view-toggle"
import { GridViewCard } from "@/components/car-grid-card"
import { ListViewCard } from "@/components/car-list-card"
import type { CarData } from "@/data/cars"
import { useRouter, useSearchParams } from "next/navigation"

type ViewMode = "grid" | "list"

interface CarListingProps {
  cars: CarData[]
}

export function CarListing({ cars }: CarListingProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const router = useRouter()
  const searchParams = useSearchParams()

  // Check if any filters are applied
  const hasFilters = searchParams.toString().length > 0

  // Reset all filters
  const handleResetFilters = () => {
    router.push("/")
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              {cars.length > 0 ? "Featured used cars" : "No cars found"}
            </h2>
            <p className="text-muted-foreground">
              {cars.length > 0
                ? `Browse our selection of ${cars.length} quality used cars.`
                : "Try adjusting your filters to see more results."}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {hasFilters && (
              <Button variant="outline" size="sm" onClick={handleResetFilters} className="mr-2">
                <X className="mr-2 h-4 w-4" />
                Reset filters
              </Button>
            )}
            <div className="flex items-center mr-2">
              <CarViewToggle onViewModeChange={setViewMode} />
            </div>
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
          viewMode === "grid" ? (
            <div className="grid gap-6 pt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {cars.map((car) => (
                <GridViewCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 pt-8">
              {cars.map((car) => (
                <ListViewCard key={car.id} car={car} />
              ))}
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">No cars match your current filters.</p>
              <Button onClick={handleResetFilters}>
                <X className="mr-2 h-4 w-4" />
                Clear all filters
              </Button>
            </div>
          </div>
        )}

        {cars.length > 0 && (
          <div className="mt-10 flex justify-center">
            <Button variant="outline" size="lg">
              View all cars
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

