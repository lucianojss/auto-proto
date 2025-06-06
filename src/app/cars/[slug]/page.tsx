import { CarData, getCarById } from "@/data/cars";
import { notFound } from "next/navigation";
import { getCarIdFromSlug } from "@/utils/slugs";
import { Metadata } from "next";
import { CarDetailContent } from "@/components/car-detail-content";
import { APP_ROUTES } from "@/lib/routes";

/**
 * Params type for the car detail page.
 * This is a Promise that resolves to an object containing the slug.
 */
type Params = Promise<{ slug: string }>;

/**
 * Props for the CarDetailPage component.
 */
interface CarDetailPageProps {
  params: Params;
}

/**
 * Generates SEO metadata for the car detail page.
 * It fetches the car data based on the slug from the URL parameters,
 * and constructs the metadata for the page.
 *
 * @param param0 - The parameters object containing the slug.
 * @returns {Promise<Metadata>}
 */
export async function generateMetadata({
  params,
}: CarDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  const carId = getCarIdFromSlug(slug);
  const car = (await getCarById(carId)) as CarData;

  const title = `${car.make} ${car.model} in ${car.location}`;
  const description = `Car details ${car.make} ${car.model} ${car.variant} ${car.fuelType} in ${car.location}.`;

  return {
    title: `AutoSearch | ${title}`,
    description: `${description}`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}${APP_ROUTES.CARS}/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      title: title,
      description: description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${slug}`,
      siteName: "AutoSearch",
      locale: "en_US",
      images: [
        {
          url: car.images[0],
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: car.images[0],
    },
  };
}

/**
 * CarDetailPage component that renders the details of a specific car.
 * It fetches the car data based on the slug from the URL parameters,
 * and displays the car details using the CarDetailContent component.
 *
 * @param param0
 * @returns
 */
export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { slug } = await params;

  const carId = getCarIdFromSlug(slug);
  const car = await getCarById(carId);

  if (!car) {
    notFound();
  }

  return (
    <div className="container py-6 md:py-12">
      <CarDetailContent car={car} slug={slug} />
    </div>
  );
}
