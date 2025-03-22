import type { PriceRating } from "@/data/cars"

interface PriceRatingIndicatorProps {
  rating: PriceRating
}

export function PriceRatingIndicator({ rating }: PriceRatingIndicatorProps) {
  const ratingConfig = {
    super: {
      label: "Super price",
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-950",
      dots: 5,
    },
    good: {
      label: "Good price",
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-950",
      dots: 4,
    },
    fair: {
      label: "Fair price",
      color: "text-emerald-600",
      bgColor: "bg-emerald-100 dark:bg-emerald-950",
      dots: 3,
    },
    pricey: {
      label: "A bit pricey",
      color: "text-amber-600",
      bgColor: "bg-amber-100 dark:bg-amber-950",
      dots: 2,
    },
    expensive: {
      label: "Expensive",
      color: "text-red-600",
      bgColor: "bg-red-100 dark:bg-red-950",
      dots: 1,
    },
  }

  const config = ratingConfig[rating]

  return (
    <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${config.bgColor}`}>
      <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
      <div className="flex gap-0.5 ml-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full ${i < config.dots ? config.color.replace("text", "bg") : "bg-gray-200 dark:bg-gray-700"}`}
          />
        ))}
      </div>
    </div>
  )
}

