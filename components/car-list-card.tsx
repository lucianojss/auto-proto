import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { PriceRatingIndicator } from "@/components/price-rating-indicator"
import type { CarData } from "@/data/cars"
import { generateCarSlug } from "@/utils/slugs"

interface ListViewCardProps {
  car: CarData
}

export function ListViewCard({ car }: ListViewCardProps) {
  const carSlug = generateCarSlug(car)

  return (
    <div className="rounded-lg border overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="relative md:w-1/3 lg:w-1/4">
          <div className="aspect-video md:h-full">
            <Image
              src={car.images[0] || `/placeholder.svg?height=200&width=300&text=Car+${car.id}`}
              alt={`${car.make} ${car.model}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
            >
              <Heart className="h-4 w-4" />
              <span className="sr-only">Add to favorites</span>
            </Button>
            <div className="absolute left-2 top-2">
              <PriceRatingIndicator rating={car.priceRating} />
            </div>
          </div>
        </div>
        <div className="p-4 md:p-6 flex-1">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">{`${car.make} ${car.model} (${car.year})`}</h3>
              <div className="mt-1 text-sm text-muted-foreground">
                {`${car.mileage.toLocaleString()} miles · ${car.fuelType} · ${car.transmission}`}
              </div>
              <div className="mt-4 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{car.location}</span>
                <span className="text-sm text-muted-foreground">·</span>
                <span className="text-sm text-muted-foreground">{car.dealer}</span>
              </div>
            </div>
            <div className="flex flex-col items-start md:items-end">
              <div className="text-2xl font-bold">£{car.price.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">£{car.monthlyPayment} per month</div>
              <Link href={`/car/${carSlug}`}>
                <Button className="mt-4 w-full md:w-auto">View details</Button>
              </Link>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground line-clamp-2">{car.description}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {car.features.map((feature, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

