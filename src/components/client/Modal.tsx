"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import { DialogHeader } from "../ui/dialog";
import { useRouter } from "next/navigation";
import { CarData } from "@/data/cars";
import {
  MapPin,
  Heart,
  ShieldCheck,
  Info,
  ExternalLink,
  Clock,
  Calendar,
  Car,
  Tag,
  Fuel,
  Flag,
  Share2,
} from "lucide-react";
import { CarDetailTabs } from "./car-detail-tabs";
import { CarImageGallery } from "./car-image-gallery";
import { PriceRatingIndicator } from "../price-rating-indicator";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

interface ModalProps {
  car: CarData;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ car, children }) => {
  const router = useRouter();

  const handleOpenChange = () => {
    router.back();
  };

  return (
    <Dialog open defaultOpen onOpenChange={handleOpenChange}>
      <DialogContent className="lg:max-w-screen-lg overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>
            {car.make} {car.model} {car.variant} {car.fuelType} {car.bodyType}
          </DialogTitle>
          <DialogDescription>Last Updated: {car.lastUpdated}</DialogDescription>
          <DialogDescription>{children}</DialogDescription>
        </DialogHeader>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
