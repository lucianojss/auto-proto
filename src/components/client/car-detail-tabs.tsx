"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PriceHistoryGraph } from "@/components/price-history-graph";
import { CarData } from "@/data/cars";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

interface CarDetailTabsProps {
  car: CarData;
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
              <Badge variant="outline">Color: {car.color}</Badge>
              <Badge variant="outline">Doors: {car.doors}</Badge>
              <Badge variant="outline">{car.driveType}</Badge>
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
        <Card>
          <CardHeader>
            <CardTitle> Price changes over time</CardTitle>
          </CardHeader>
          <CardContent>
            {car.priceHistory && car.priceHistory.length > 0 ? (
              <PriceHistoryGraph data={car.priceHistory} />
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                No price history available
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
