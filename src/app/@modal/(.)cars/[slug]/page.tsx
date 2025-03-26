import { CarDetailContent } from "@/components/car-detail-content";
import { CarDetailTabs } from "@/components/client/car-detail-tabs";
import { CarImageGallery } from "@/components/client/car-image-gallery";
import { Modal } from "@/components/client/Modal";
import { PriceRatingIndicator } from "@/components/price-rating-indicator";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CarData, getCarById } from "@/data/cars";
import { getCarIdFromSlug } from "@/utils/slugs";
import {
  ShieldCheck,
  Info,
  ExternalLink,
  MapPin,
  Clock,
  Calendar,
  Car,
  Tag,
  Fuel,
  Flag,
  Share2,
} from "lucide-react";

const CarDetailModal = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const carId = getCarIdFromSlug(slug);
  const car = (await getCarById(carId)) as CarData;

  return (
    <Modal car={car}>
      <CarDetailContent car={car} slug={slug} />
    </Modal>
  );
};

export default CarDetailModal;
