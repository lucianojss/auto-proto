import { getCarImages } from "./car-images"
import { getRandomInteriorImage } from "./car-interior-images"

// Define price rating types
export type PriceRating = "super" | "good" | "fair" | "pricey" | "expensive"

// Define car data interface
export interface CarData {
  id: number
  make: string
  model: string
  variant: string
  year: number
  mileage: number
  fuelType: string
  transmission: string
  price: number
  monthlyPayment: number
  location: string
  dealer: string
  priceRating: PriceRating
  description: string
  features: string[]
  color: string
  doors: number
  driveType: string
  bodyType: string
  engineSize: string
  horsePower: number
  mpg: number
  co2: number
  lastUpdated: string
  images: string[]
  priceHistory: {
    date: string
    price: number
  }[]
  otherSites: number
  timeOnSale: number
}

// Generate sample car data
export function generateCarData(): CarData[] {
  const makes = ["Audi", "BMW", "Ford", "Mercedes", "Toyota", "Volkswagen", "Honda", "Nissan"]
  const models = ["A3", "3 Series", "Focus", "C-Class", "Corolla", "Golf", "Civic", "Qashqai"]
  const fuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric"]
  const transmissions = ["Automatic", "Manual"]
  const locations = ["London", "Manchester", "Birmingham", "Leeds", "Glasgow", "Edinburgh", "Bristol", "Liverpool"]
  const dealers = [
    "Premium Auto",
    "City Motors",
    "Highway Cars",
    "Elite Vehicles",
    "AutoNation",
    "Car Kingdom",
    "Drive Time",
    "Motor World",
  ]
  const priceRatings: PriceRating[] = ["super", "good", "fair", "pricey", "expensive"]
  const features = [
    "Bluetooth",
    "Navigation",
    "Leather Seats",
    "Sunroof",
    "Parking Sensors",
    "Heated Seats",
    "Climate Control",
    "Cruise Control",
    "Alloy Wheels",
    "Keyless Entry",
    "Backup Camera",
    "Apple CarPlay",
    "Android Auto",
    "Lane Assist",
    "Blind Spot Monitor",
  ]
  const colors = ["Black", "White", "Silver", "Blue", "Red", "Grey", "Green", "Brown"]
  const bodyTypes = ["Hatchback", "Sedan", "SUV", "Coupe", "Estate", "Convertible", "MPV", "Pickup"]
  const driveTypes = ["Front-wheel drive", "Rear-wheel drive", "All-wheel drive", "4-wheel drive"]

  return Array.from({ length: 8 }, (_, i) => {
    // Generate 3-5 random features for each car
    const numFeatures = Math.floor(Math.random() * 3) + 3
    const carFeatures = [...features].sort(() => 0.5 - Math.random()).slice(0, numFeatures)

    const make = makes[i % makes.length]
    const model = models[i % models.length]
    const year = 2020 - (i % 5)
    const price = 15000 + i * 2000
    const mileage = 10000 + i * 5000
    const color = colors[i % colors.length]
    const bodyType = bodyTypes[i % bodyTypes.length]
    const driveType = driveTypes[i % driveTypes.length]
    const engineSize = ["1.0L", "1.5L", "2.0L", "2.5L", "3.0L"][i % 5]
    const horsePower = [90, 110, 150, 180, 220, 250, 300, 350][i % 8]
    const mpg = 35 + Math.random() * 30
    const co2 = 90 + i * 10
    const doors = [3, 4, 5][i % 3]
    const otherSites = Math.floor(Math.random() * 10) + 1
    const timeOnSale = Math.floor(Math.random() * 30) + 1

    // Generate price history (3-5 entries)
    const priceHistoryEntries = Math.floor(Math.random() * 3) + 3
    const priceHistory = Array.from({ length: priceHistoryEntries }, (_, j) => {
      const date = new Date()
      date.setDate(date.getDate() - (priceHistoryEntries - j))
      const dateStr = date.getDate() + " " + date.toLocaleString("default", { month: "short" })

      // First entry is original price, subsequent entries may be lower
      const historyPrice =
        j === 0
          ? price + Math.floor(Math.random() * 1000) + 500
          : j === priceHistoryEntries - 1
            ? price
            : price + Math.floor(Math.random() * 800) - 400

      return {
        date: dateStr,
        price: historyPrice,
      }
    }).sort((a, b) => {
      // Sort by date (day of month)
      const dayA = Number.parseInt(a.date.split(" ")[0])
      const dayB = Number.parseInt(b.date.split(" ")[0])
      return dayA - dayB
    })

    // Get exterior images
    const exteriorImages = getCarImages(make, model)

    // Get 1-2 interior images
    const interiorImages = [getRandomInteriorImage(), Math.random() > 0.5 ? getRandomInteriorImage() : null].filter(
      Boolean,
    ) as string[]

    // Combine exterior and interior images
    const images = [...exteriorImages.slice(0, 3), ...interiorImages]

    // Create variant with trim level
    const trimLevel = make === "BMW" ? "M Sport" : make === "Mercedes" ? "AMG Line" : make === "Audi" ? "S Line" : "SE"
    const variant = `${engineSize} ${trimLevel} ${doors}dr`

    return {
      id: i + 1,
      make,
      model,
      variant,
      year,
      mileage,
      fuelType: fuelTypes[i % fuelTypes.length],
      transmission: transmissions[i % transmissions.length],
      price,
      monthlyPayment: Math.round(price / 48),
      location: locations[i % locations.length],
      dealer: dealers[i % dealers.length],
      priceRating: priceRatings[i % priceRatings.length],
      description: `This ${make} ${model} is in excellent condition with full service history. It comes with ${carFeatures.join(", ")} and more. Perfect for city driving and long journeys.`,
      features: carFeatures,
      color,
      doors,
      driveType,
      bodyType,
      engineSize,
      horsePower,
      mpg: Number.parseFloat(mpg.toFixed(1)),
      co2,
      lastUpdated: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
      images,
      priceHistory,
      otherSites,
      timeOnSale,
    }
  })
}

// Export the car data
export const cars = generateCarData()

