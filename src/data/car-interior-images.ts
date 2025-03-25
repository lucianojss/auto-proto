// Collection of car interior images from Unsplash
export const carInteriorImages = [
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=2072&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1549399542-7e8f2e928464?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583267746897-2cf415887172?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581540222194-0def2dda95b8?q=80&w=2070&auto=format&fit=crop",
]

// Get a random interior image
export function getRandomInteriorImage(): string {
  const randomIndex = Math.floor(Math.random() * carInteriorImages.length)
  return carInteriorImages[randomIndex]
}

