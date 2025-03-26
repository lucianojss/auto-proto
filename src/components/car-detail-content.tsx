import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Calendar,
  Car,
  Clock,
  ExternalLink,
  Fuel,
  MapPin,
  ShieldCheck,
  Tag,
} from "lucide-react";

import { CarDetailTabs } from "@/components/client/car-detail-tabs";
import { PriceRatingIndicator } from "@/components/price-rating-indicator";
import { CarData } from "@/data/cars";
import { CarImageGallery } from "@/components/client/car-image-gallery";
import Link from "next/link";
import { ShareButton } from "@/components/client/share-button";

interface CarDetailContentProps {
  car: CarData;
  slug: string;
  isModal?: boolean;
}

export function CarDetailContent({
  car,
  slug,
  isModal = false,
}: CarDetailContentProps) {
  // Adjust classes based on whether component is used in modal or page
  const gridLayoutClasses = isModal
    ? "grid gap-6 md:grid-cols-1"
    : "grid md:grid-cols-[1.5fr_1fr] gap-6";

  return (
    <div className="grid gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            {car.make} {car.model} {car.variant} {car.fuelType} {car.bodyType}
          </h1>
          <p className="text-muted-foreground">
            Last updated: {car.lastUpdated}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{car.location}</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={gridLayoutClasses}>
        {/* Left column */}
        <div className="space-y-6">
          {/* Car images */}
          <CarImageGallery
            images={car.images}
            make={car.make}
            model={car.model}
          />

          {/* Tabs */}
          <CarDetailTabs car={car} />
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Price info */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Price checked by AutoSearch</div>
                  <div className="text-sm text-muted-foreground">
                    {car.otherSites} websites scanned
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <PriceRatingIndicator rating={car.priceRating} />
            </div>
            <div className="text-3xl font-bold">
              € {car.price.toLocaleString()}
            </div>
            <Link href={car.dealerUrl}>
              <Button className="w-full">
                <ExternalLink className="mr-2 h-4 w-4" />
                See all details
              </Button>
            </Link>
          </div>

          {/* Seller info */}
          <div className="space-y-4 border-t pt-4">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold">Seller:</h3>
              <span className="font-medium">{car.dealer}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-primary">{car.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Time on sale: {car.timeOnSale.getDate()} days</span>
            </div>
          </div>

          {/* Key specs */}
          <Card className="overflow-hidden">
            <div className="grid divide-y">
              <div className="p-4 flex items-center gap-4">
                <Calendar className="h-6 w-6 text-primary" />
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">Year</div>
                  <div className="font-medium">{car.year}</div>
                </div>
              </div>
              <div className="p-4 flex items-center gap-4">
                <Car className="h-6 w-6 text-primary" />
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">Miles</div>
                  <div className="font-medium">
                    {car.mileage.toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="p-4 flex items-center gap-4">
                <Tag className="h-6 w-6 text-primary" />
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">
                    Trim level
                  </div>
                  <div className="font-medium">
                    {car.variant?.split(" ").pop() || "SE"}
                  </div>
                </div>
              </div>
              <div className="p-4 flex items-center gap-4">
                <Fuel className="h-6 w-6 text-primary" />
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">MPG</div>
                  <div className="font-medium">{car.mpg}</div>
                </div>
              </div>
              <div className="p-4 flex items-center gap-4">
                <Car className="h-6 w-6 text-primary" />
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">Gearbox</div>
                  <div className="font-medium">{car.transmission}</div>
                </div>
              </div>
              <div className="p-4 flex items-center gap-4">
                <Fuel className="h-6 w-6 text-primary" />
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">Engine</div>
                  <div className="font-medium">
                    {car.engineSize} {car.fuelType}
                    <div className="text-sm text-muted-foreground">
                      {car.horsePower} HP ({Math.round(car.horsePower * 0.7457)}{" "}
                      kW)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Action buttons */}
          <div className="grid gap-2">
            <ShareButton slug={slug} />
          </div>
        </div>
      </div>
    </div>
  );
}
