import { Modal } from "@/components/ui/Modal";
import { CarData, getCarById } from "@/data/cars";
import { getCarIdFromSlug } from "@/utils/slugs";

const CarDetailModal = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const carId = getCarIdFromSlug(slug);
  const car = await getCarById(carId);

  return <Modal car={car as CarData} />;
};

export default CarDetailModal;
