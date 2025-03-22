import { Button } from "@/components/ui/button"
import { Heart, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { PriceRatingIndicator } from "@/components/price-rating-indicator"
import type { CarData } from "@/data/cars"
import { generateCarSlug } from "@/utils/slugs"

interface GridViewCardProps {
  car: CarData
}

export function GridViewCard({ car }: GridViewCardProps) {
  const carSlug = generateCarSlug(car)

  return (
    <Link href={`/car/${carSlug}`} className="group relative overflow-hidden rounded-lg border">
      <div className="aspect-video w-full overflow-hidden">
        <Image
          src={car.images[0] || `/placeholder.svg?height=200&width=300&text=Car+${car.id}`}
          alt={`${car.make} ${car.model}`}
          width={300}
          height={200}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
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
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold">{`${car.make} ${car.model} (${car.year})`}</h3>
        </div>
        <div className="mt-1 text-sm text-muted-foreground">
          {`${car.mileage.toLocaleString()} miles · ${car.fuelType} · ${car.transmission}`}
        </div>
        <div className="mt-2 font-semibold">£{car.price.toLocaleString()}</div>
        <div className="mt-1 text-xs text-muted-foreground">£{car.monthlyPayment} per month</div>
        <div className="mt-3 flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{car.location}</span>
        </div>
        <div className="mt-1 text-xs text-muted-foreground">
          <span className="font-medium">Dealer:</span> {car.dealer}
        </div>
      </div>
    </Link>
  )
}

