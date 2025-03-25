import type { CarData } from "@/data/cars";

/**
 * Generate a URL-friendly slug for a car
 */
export function generateCarSlug(car: CarData): string {
  // Create parts for the slug
  const parts = [
    car.id.toString(),
    car.make,
    car.model,
    car.engineSize || "",
    car.variant?.split(" ").slice(1, -1).join("-") || "",
    `${car.doors}dr`,
    car.fuelType,
    car.bodyType || "",
  ];

  // Filter out empty parts, join with hyphens, and convert to lowercase
  return parts.filter(Boolean).join("-").replace(/\s+/g, "-").toLowerCase();
}

/**
 * Extract the car ID from a slug
 */
export function getCarIdFromSlug(slug: string): number {
  // The ID is the first part of the slug before the first hyphen
  const idPart = slug.split("-")[0];
  return Number.parseInt(idPart, 10);
}
