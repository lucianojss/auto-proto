"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShieldCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { PriceHistoryGraph } from "@/components/price-history-graph"
import type { CarData } from "@/data/cars"

interface CarDetailTabsProps {
  car: CarData
}

export function CarDetailTabs({ car }: CarDetailTabsProps) {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid grid-cols-3 w-full">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="features">Features</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4 pt-4">
        <div className="grid gap-4">
          <p>{car.description}</p>
          <div className="grid gap-2">
            <h3 className="font-semibold">Equipment and details</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Colour: {car.color}</Badge>
              <Badge variant="outline">Doors: {car.doors}</Badge>
              <Badge variant="outline">{car.driveType}</Badge>
              <Badge variant="outline">One owner</Badge>
              <Badge variant="outline">Isofix</Badge>
              <Badge variant="outline">Sat. nav.</Badge>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="features" className="space-y-4 pt-4">
        <div className="grid gap-4">
          <h3 className="font-semibold">Features</h3>
          <div className="grid grid-cols-2 gap-2">
            {car.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>
      <TabsContent value="history" className="space-y-4 pt-4">
        <div className="grid gap-4">
          <h3 className="font-semibold">Price History</h3>
          <div className="border rounded-lg p-4 bg-card">
            <div className="text-sm font-medium mb-2">Price changes over time</div>
            <div className="h-[250px] w-full">
              {car.priceHistory && car.priceHistory.length > 0 ? (
                <PriceHistoryGraph data={car.priceHistory} />
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  No price history available
                </div>
              )}
            </div>
          </div>
          {car.priceHistory && car.priceHistory.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Last {car.priceHistory.length} price changes for this car</h4>
              <div className="border rounded-lg divide-y">
                {car.priceHistory.map((item, index) => (
                  <div key={index} className="flex justify-between p-3">
                    <span className="font-medium">{item.date}:</span>
                    <span
                      className={`font-medium ${
                        index > 0 && item.price < car.priceHistory[index - 1].price
                          ? "text-green-600 dark:text-green-500"
                          : index > 0 && item.price > car.priceHistory[index - 1].price
                            ? "text-red-600 dark:text-red-500"
                            : ""
                      }`}
                    >
                      £{item.price.toLocaleString()}
                      {index > 0 && (
                        <span className="ml-2 text-xs">
                          {item.price < car.priceHistory[index - 1].price
                            ? `(-£${(car.priceHistory[index - 1].price - item.price).toLocaleString()})`
                            : item.price > car.priceHistory[index - 1].price
                              ? `(+£${(item.price - car.priceHistory[index - 1].price).toLocaleString()})`
                              : ""}
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  )
}

