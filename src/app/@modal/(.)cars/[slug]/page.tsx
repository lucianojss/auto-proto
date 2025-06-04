import { CarDetailContent } from "@/components/car-detail-content";
import { Modal } from "@/components/client/Modal";
import { CarData, getCarById } from "@/data/cars";
import { getCarIdFromSlug } from "@/utils/slugs";

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
