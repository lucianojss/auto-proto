"use client"

import type React from "react"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Search, X } from "lucide-react"
import { useCallback, useState } from "react"

interface FilterFormProps {
  uniqueMakes: string[]
  modelsForSelectedMake: string[]
  initialValues: {
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

export function FilterForm({ uniqueMakes, modelsForSelectedMake, initialValues }: FilterFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // State for real-time slider values
  const [priceRange, setPriceRange] = useState<[number, number]>([
    initialValues.minPrice ? Number.parseInt(initialValues.minPrice) : 0,
    initialValues.maxPrice ? Number.parseInt(initialValues.maxPrice) : 50000,
  ])

  const [mileage, setMileage] = useState<number>(initialValues.mileage ? Number.parseInt(initialValues.mileage) : 0)

  // Check if any filters are applied
  const hasFilters = Object.values(initialValues).some((value) => value !== undefined)

  // Create a mutable copy of the search params
  const createQueryString = useCallback(
    (params: Record<string, string | null>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString())

      // Update the search params based on the provided params
      Object.entries(params).forEach(([key, value]) => {
        if (value === null) {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, value)
        }
      })

      return newSearchParams.toString()
    },
    [searchParams],
  )

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // The individual form elements handle their own navigation
  }

  // Handle make change
  const handleMakeChange = (value: string) => {
    // When make changes, we need to reset the model
    router.push(
      `/?${createQueryString({
        make: value,
        model: null, // Reset model when make changes
      })}`,
    )
  }

  // Handle model change
  const handleModelChange = (value: string) => {
    router.push(
      `/?${createQueryString({
        model: value,
      })}`,
    )
  }

  // Handle price range change (real-time update)
  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange([values[0], values[1]])
  }

  // Handle price range commit (when user releases slider)
  const handlePriceRangeCommit = (values: number[]) => {
    router.push(
      `/?${createQueryString({
        minPrice: values[0].toString(),
        maxPrice: values[1].toString(),
      })}`,
    )
  }

  // Handle mileage change (real-time update)
  const handleMileageChange = (values: number[]) => {
    setMileage(values[0])
  }

  // Handle mileage commit (when user releases slider)
  const handleMileageCommit = (values: number[]) => {
    router.push(
      `/?${createQueryString({
        mileage: values[0].toString(),
      })}`,
    )
  }

  // Handle fuel type change
  const handleFuelTypeChange = (value: string) => {
    router.push(
      `/?${createQueryString({
        fuelType: value,
      })}`,
    )
  }

  // Handle transmission change
  const handleTransmissionChange = (value: string) => {
    router.push(
      `/?${createQueryString({
        transmission: value,
      })}`,
    )
  }

  // Handle year range change
  const handleYearFromChange = (value: string) => {
    router.push(
      `/?${createQueryString({
        yearFrom: value,
      })}`,
    )
  }

  const handleYearToChange = (value: string) => {
    router.push(
      `/?${createQueryString({
        yearTo: value,
      })}`,
    )
  }

  // Reset all filters
  const handleResetFilters = () => {
    router.push("/")
  }

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Format mileage
  const formatMileage = (value: number) => {
    return `${value.toLocaleString()} miles`
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Reset filters button - only show when filters are applied */}
      {hasFilters && (
        <div className="mb-4">
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center text-muted-foreground hover:text-foreground"
            onClick={handleResetFilters}
          >
            <X className="mr-2 h-4 w-4" />
            Reset all filters
          </Button>
        </div>
      )}

      <Tabs defaultValue="search" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="search">Search</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        <TabsContent value="search" className="space-y-4 pt-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="make">Make</Label>
              <Select defaultValue={initialValues.make} onValueChange={handleMakeChange}>
                <SelectTrigger id="make">
                  <SelectValue placeholder="Any make" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueMakes.map((make) => (
                    <SelectItem key={make} value={make.toLowerCase()}>
                      {make}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="model">Model</Label>
              <Select
                disabled={!initialValues.make}
                defaultValue={initialValues.model}
                onValueChange={handleModelChange}
              >
                <SelectTrigger id="model">
                  <SelectValue placeholder={initialValues.make ? "Select model" : "Select make first"} />
                </SelectTrigger>
                <SelectContent>
                  {modelsForSelectedMake.map((model) => (
                    <SelectItem key={model} value={model.toLowerCase()}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Label>Price range</Label>
                <span className="text-sm font-medium text-primary">
                  {formatCurrency(priceRange[0])} -{" "}
                  {priceRange[1] >= 50000 ? formatCurrency(priceRange[1]) + "+" : formatCurrency(priceRange[1])}
                </span>
              </div>
              <div className="pt-4 pb-2 px-1">
                <Slider
                  defaultValue={priceRange}
                  max={100000}
                  step={1000}
                  onValueChange={handlePriceRangeChange}
                  onValueCommit={handlePriceRangeCommit}
                  className="mt-6" // Add margin to make room for the tooltip
                />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                <span>{formatCurrency(0)}</span>
                <span>{formatCurrency(100000)}+</span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="location" placeholder="Enter postcode" className="pl-8" />
              </div>
            </div>
            <Button type="submit" className="w-full">
              <Search className="mr-2 h-4 w-4" />
              Search cars
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="advanced" className="space-y-4 pt-4">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="year-from">Year from</Label>
                <Select defaultValue={initialValues.yearFrom} onValueChange={handleYearFromChange}>
                  <SelectTrigger id="year-from">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 20 }, (_, i) => 2023 - i).map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="year-to">Year to</Label>
                <Select defaultValue={initialValues.yearTo} onValueChange={handleYearToChange}>
                  <SelectTrigger id="year-to">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 20 }, (_, i) => 2023 - i).map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fuel-type">Fuel type</Label>
              <Select defaultValue={initialValues.fuelType} onValueChange={handleFuelTypeChange}>
                <SelectTrigger id="fuel-type">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="petrol">Petrol</SelectItem>
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="electric">Electric</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="transmission">Transmission</Label>
              <Select defaultValue={initialValues.transmission} onValueChange={handleTransmissionChange}>
                <SelectTrigger id="transmission">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="automatic">Automatic</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Label>Mileage</Label>
                <span className="text-sm font-medium text-primary">{formatMileage(mileage)}</span>
              </div>
              <div className="pt-4 pb-2 px-1">
                <Slider
                  defaultValue={[mileage]}
                  max={150000}
                  step={5000}
                  onValueChange={handleMileageChange}
                  onValueCommit={handleMileageCommit}
                  className="mt-6" // Add margin to make room for the tooltip
                />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                <span>0 miles</span>
                <span>150,000+ miles</span>
              </div>
            </div>
            <Button type="submit" className="w-full">
              <Search className="mr-2 h-4 w-4" />
              Advanced search
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </form>
  )
}

