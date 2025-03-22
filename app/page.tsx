import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { SiteLayout } from "@/components/site-layout"
import { CarListing } from "@/components/client/car-listing"
import { cars } from "@/data/cars"
import { Breadcrumb, type BreadcrumbItem } from "@/components/breadcrumb"
import { FilterForm } from "@/components/client/filter-form"

interface HomePageProps {
  searchParams: {
    make?: string
    model?: string
    minPrice?: string
    maxPrice?: string
    fuelType?: string
    transmission?: string
    yearFrom?: string
    yearTo?: string
    mileage?: string
  }
}

export default function Home({ searchParams }: HomePageProps) {
  // Filter cars based on search parameters
  const filteredCars = cars.filter((car) => {
    // Filter by make
    if (searchParams.make && car.make.toLowerCase() !== searchParams.make.toLowerCase()) {
      return false
    }

    // Filter by model
    if (searchParams.model && car.model.toLowerCase() !== searchParams.model.toLowerCase()) {
      return false
    }

    // Filter by price range
    if (searchParams.minPrice && car.price < Number.parseInt(searchParams.minPrice)) {
      return false
    }
    if (searchParams.maxPrice && car.price > Number.parseInt(searchParams.maxPrice)) {
      return false
    }

    // Filter by fuel type
    if (searchParams.fuelType && car.fuelType.toLowerCase() !== searchParams.fuelType.toLowerCase()) {
      return false
    }

    // Filter by transmission
    if (searchParams.transmission && car.transmission.toLowerCase() !== searchParams.transmission.toLowerCase()) {
      return false
    }

    // Filter by year range
    if (searchParams.yearFrom && car.year < Number.parseInt(searchParams.yearFrom)) {
      return false
    }
    if (searchParams.yearTo && car.year > Number.parseInt(searchParams.yearTo)) {
      return false
    }

    // Filter by mileage
    if (searchParams.mileage && car.mileage > Number.parseInt(searchParams.mileage)) {
      return false
    }

    return true
  })

  // Generate breadcrumb items based on search parameters
  const breadcrumbItems: BreadcrumbItem[] = []

  if (searchParams.make) {
    breadcrumbItems.push({
      label: `${searchParams.make}`,
      href: `/?make=${searchParams.make.toLowerCase()}`,
      isCurrent: !searchParams.model,
    })

    if (searchParams.model) {
      breadcrumbItems.push({
        label: `${searchParams.model}`,
        href: `/?make=${searchParams.make.toLowerCase()}&model=${searchParams.model.toLowerCase()}`,
        isCurrent: true,
      })
    }
  }

  // Get unique makes and models for filter dropdowns
  const uniqueMakes = Array.from(new Set(cars.map((car) => car.make))).sort()

  // Get models for the selected make
  const modelsForSelectedMake = searchParams.make
    ? Array.from(
        new Set(
          cars.filter((car) => car.make.toLowerCase() === searchParams.make.toLowerCase()).map((car) => car.model),
        ),
      ).sort()
    : []

  return (
    <SiteLayout>
      {/* Show breadcrumbs only if filters are applied */}
      {breadcrumbItems.length > 0 && (
        <div className="container py-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      )}

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  {searchParams.make
                    ? searchParams.model
                      ? `${searchParams.make} ${searchParams.model} Cars`
                      : `${searchParams.make} Cars`
                    : "Find your perfect used car"}
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  {filteredCars.length} cars available
                  {searchParams.make ? ` from ${searchParams.make}` : ""}
                  {searchParams.model ? ` ${searchParams.model} models` : ""}
                </p>
              </div>
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                <Button size="lg" className="w-full sm:w-auto">
                  Search now
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Sell your car
                </Button>
              </div>
            </div>
            <div className="mx-auto w-full max-w-[500px] lg:max-w-none">
              <Card>
                <CardContent className="p-6">
                  <FilterForm
                    uniqueMakes={uniqueMakes}
                    modelsForSelectedMake={modelsForSelectedMake}
                    initialValues={searchParams}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <CarListing cars={filteredCars} />

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Why choose us?</h2>
              <p className="text-muted-foreground">
                We're committed to providing the best car buying experience possible.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Trusted dealers</h3>
                  <p className="text-muted-foreground">All our dealers are vetted and reviewed by our community.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Price comparison</h3>
                  <p className="text-muted-foreground">We show you how each car compares to the market price.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Vehicle history</h3>
                  <p className="text-muted-foreground">Every car comes with a full history check.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Secure payments</h3>
                  <p className="text-muted-foreground">Our secure platform ensures your transaction is safe.</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[300px] w-full overflow-hidden rounded-lg sm:h-[400px]">
                <Image
                  src="/placeholder.svg?height=400&width=600&text=Happy+Customers"
                  alt="Happy customers with their new car"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}

