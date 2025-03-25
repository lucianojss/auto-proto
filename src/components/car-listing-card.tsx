"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Heart,
  ExternalLink,
  Search,
  Calendar,
  Gauge,
  Fuel,
  Settings,
  Zap,
  MapPin,
  ArrowDownCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface CarListingCardProps {
  id: string
  title: string
  price: number
  originalPrice?: number
  image: string
  year: string
  mileage: number
  engine: string
  transmission: string
  power: string
  location: string
  daysLeft: number
  discount?: number
  verified?: boolean
  rating?: number
  maxRating?: number
  savings?: number
  dealerUrl?: string
  imageCount?: number
  currentImage?: number
  onFavorite?: (id: string) => void
  isFavorite?: boolean
}

export function CarListingCard({
  id,
  title,
  price,
  originalPrice,
  image,
  year,
  mileage,
  engine,
  transmission,
  power,
  location,
  daysLeft,
  discount,
  verified = false,
  rating = 0,
  maxRating = 5,
  savings,
  dealerUrl,
  imageCount = 1,
  currentImage = 1,
  onFavorite,
  isFavorite = false,
}: CarListingCardProps) {
  const formattedPrice = new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price)

  const formattedSavings = savings
    ? new Intl.NumberFormat("pt-PT", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }).format(savings)
    : null

  const formattedMileage = new Intl.NumberFormat("pt-PT").format(mileage)

  // Price rating component to ensure consistency between mobile and desktop
  const PriceRating = () => (
    <>
      <div className="text-2xl font-bold">{formattedPrice}</div>
      {rating > 0 && (
        <div className="mt-1">
          <span className="mr-2 text-sm font-medium text-green-600">Bom preço</span>
          <span className="inline-flex">
            {Array.from({ length: maxRating }).map((_, i) => (
              <div
                key={i}
                className={cn("mr-0.5 h-3 w-3 rounded-full", i < rating ? "bg-green-600" : "bg-green-200")}
              />
            ))}
          </span>
        </div>
      )}
      {savings && (
        <div className="mt-1 inline-flex items-center gap-1 rounded bg-green-600 px-3 py-1 text-white whitespace-nowrap">
          <ArrowDownCircle className="h-4 w-4" />
          <span>Poupa {formattedSavings}</span>
        </div>
      )}
    </>
  )

  return (
    <Card className="overflow-hidden border shadow-sm">
      {/* Header with verified badge and days left */}
      <div className="flex items-center justify-between bg-cyan-500 px-4 py-2 text-white">
        <div className="flex items-center gap-2">
          {verified && (
            <>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                <Badge className="h-4 w-4 rounded-full bg-white p-0" variant="outline" />
              </div>
              <span className="font-medium">Concessionário Verificado</span>
            </>
          )}
        </div>
        <div className="flex flex-col items-end text-sm sm:flex-row sm:items-center sm:gap-2">
          <span>{daysLeft} dias</span>
          {discount && (
            <span className="whitespace-nowrap">
              • {discount}%{" "}
              <Link href="#" className="underline">
                Ver alteração de preço
              </Link>
            </span>
          )}
        </div>
      </div>

      <div className="relative">
        {/* Car Image */}
        <div className="relative h-48 w-full sm:h-56">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          {/* Image counter */}
          <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded bg-black/70 px-2 py-1 text-xs text-white">
            <Search className="h-3 w-3" />
            <span>
              {currentImage}/{imageCount}
            </span>
          </div>

          {/* Favorite button */}
          <button
            onClick={() => onFavorite?.(id)}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md"
          >
            <Heart className={cn("h-5 w-5", isFavorite ? "fill-red-500 text-red-500" : "text-gray-500")} />
          </button>
        </div>

        <CardContent className="p-4">
          {/* Desktop layout */}
          <div className="hidden sm:block">
            {/* Top row: Car title, logo, and price */}
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-red-500 p-1">
                  <span className="text-lg font-bold text-white">m</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
              </div>
              <div className="flex flex-col items-end">
                <PriceRating />
              </div>
            </div>

            {/* Main car details in a single row */}
            <div className="mb-3 flex flex-wrap">
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-600">{year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-600">{formattedMileage} km</span>
                </div>
                <div className="flex items-center gap-2">
                  <Fuel className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-600">{engine}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-600">{transmission}</span>
                </div>
              </div>
            </div>

            {/* Power */}
            <div className="mb-3 flex items-center gap-2">
              <Zap className="h-5 w-5 text-gray-500" />
              <span className="text-gray-600">{power}</span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-5 w-5 text-gray-500" />
              <span>{location}</span>
            </div>
          </div>

          {/* Mobile layout - Top section with title and price, bottom section with details */}
          <div className="sm:hidden">
            {/* Top section with title and price */}
            <div className="mb-4 flex">
              {/* Left - Car title and logo */}
              <div className="flex items-start gap-2 max-w-[60%]">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-red-500 p-1">
                  <span className="text-lg font-bold text-white">m</span>
                </div>
                <h3 className="text-base font-semibold text-gray-800 line-clamp-2">{title}</h3>
              </div>

              {/* Right - Price information - Using the same component as desktop */}
              <div className="flex flex-col items-end ml-auto">
                <PriceRating />
              </div>
            </div>

            {/* Bottom section with car details */}
            <div className="space-y-2">
              {/* Main car details */}
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-600">{year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-600">{formattedMileage} km</span>
                </div>
                <div className="flex items-center gap-2">
                  <Fuel className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-600">{engine}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-600">{transmission}</span>
                </div>
              </div>

              {/* Power */}
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-gray-500" />
                <span className="text-gray-600">{power}</span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-5 w-5 text-gray-500" />
                <span>{location}</span>
              </div>
            </div>
          </div>
        </CardContent>

        {dealerUrl && (
          <CardFooter className="flex justify-end border-t p-2">
            <Link href={dealerUrl} className="flex items-center gap-1 text-sm text-cyan-500 hover:underline">
              Visite Matrizauto.pt
              <ExternalLink className="h-4 w-4" />
            </Link>
          </CardFooter>
        )}
      </div>
    </Card>
  )
}

