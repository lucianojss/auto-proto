import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ExternalLink, Heart, MapPin, TrendingDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PriceRatingIndicator } from "@/components/price-rating-indicator";
import type { CarData } from "@/data/cars";
import { APP_ROUTES } from "@/lib/routes";
import { generateCarSlug } from "@/utils/slugs";

interface ListViewCardProps {
  car: CarData;
}

const CarImage = ({ car }: { car: CarData }) => (
  <div className="relative md:w-1/3">
    <div className="relative aspect-[4/3] md:aspect-auto md:h-full">
      <Image
        src={car.images[0]}
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
);

const CarInfo = ({ car }: { car: CarData }) => (
  <div>
    <h3 className="text-xl font-semibold">{`${car.make} ${car.model} (${car.year})`}</h3>
    <div className="mt-1 text-sm text-muted-foreground">
      {`${car.mileage.toLocaleString()} miles · ${car.fuelType} · ${
        car.transmission
      }`}
    </div>
    <div className="mt-4 flex items-center gap-2">
      <MapPin className="h-4 w-4 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">{car.location}</span>
      <span className="text-sm text-muted-foreground">·</span>
      <span className="text-sm text-muted-foreground">{car.dealer}</span>
    </div>
  </div>
);

const PriceInfo = ({ car }: { car: CarData }) => (
  <div className="flex flex-col items-start md:items-end space-y-1">
    <div className="text-sm text-muted-foreground">Price</div>
    <div className="text-3xl font-bold tracking-tight">
      €{car.price.toLocaleString()}
    </div>
    {car.priceHistory &&
      car.priceHistory.length > 0 &&
      car.price < car.priceHistory[0].price && <PriceDiscount car={car} />}
  </div>
);

const PriceDiscount = ({ car }: { car: CarData }) => (
  <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
    <TrendingDown className="h-4 w-4" />
    <span className="font-medium">
      Save €{(car.priceHistory[0].price - car.price).toLocaleString()} (
      {Math.round(
        ((car.priceHistory[0].price - car.price) / car.priceHistory[0].price) *
          100
      )}
      % off)
    </span>
  </div>
);

const FeatureBadges = ({ features }: { features: string[] }) => (
  <div className="flex flex-wrap gap-2">
    {features.map((feature, index) => (
      <Badge key={index} variant="secondary" className="text-xs">
        {feature}
      </Badge>
    ))}
  </div>
);

export function ListViewCard({ car }: ListViewCardProps) {
  const url = `${APP_ROUTES.CARS}/${generateCarSlug(car)}`;

  return (
    <Card className="p-0 overflow-hidden transition-all duration-200 hover:scale-[1.02] hover:shadow-lg">
      <div className="flex flex-col md:flex-row">
        <CarImage car={car} />
        <div className="flex-1 flex flex-col">
          <Link key={car.id} href={url}>
            <CardHeader className="p-4 md:p-6 pb-0">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <CarInfo car={car} />
                <PriceInfo car={car} />
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {car.description}
              </p>
              <div className="mt-4">
                <FeatureBadges features={car.features} />
              </div>
            </CardContent>
          </Link>
          <CardFooter className="p-2 flex justify-end">
            <Link
              href={car.dealerUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="link">
                <ExternalLink /> Visit {car.dealer}
              </Button>
            </Link>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
