// Define image sets for different car makes and models with real Unsplash images
export const carImages: Record<string, string[]> = {
  "Audi A3": [
    "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?q=80&w=2074&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?q=80&w=2074&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583267746897-2cf415887172?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=2072&auto=format&fit=crop",
  ],
  "BMW 3 Series": [
    "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1549399542-7e8f2e928464?q=80&w=2070&auto=format&fit=crop",
  ],
  "Ford Focus": [
    "https://images.unsplash.com/photo-1551830820-330a71b99659?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1612544448445-b8232cff3b6a?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581540222194-0def2dda95b8?q=80&w=2070&auto=format&fit=crop",
  ],
  "Mercedes C-Class": [
    "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1605515298946-d062f2e9da53?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop",
  ],
  "Toyota Corolla": [
    "https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?q=80&w=2072&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1632245889029-e406faaa34cd?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=2070&auto=format&fit=crop",
  ],
  "Volkswagen Golf": [
    "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?q=80&w=2070&auto=format&fit=crop",
  ],
  "Honda Civic": [
    "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?q=80&w=2074&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?q=80&w=2074&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?q=80&w=2074&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?q=80&w=2074&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?q=80&w=2074&auto=format&fit=crop",
  ],
  "Nissan Qashqai": [
    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2064&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2064&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2064&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2064&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2064&auto=format&fit=crop",
  ],
  // Default images for any car not specifically defined
  default: [
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=2072&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=2072&auto=format&fit=crop",
  ],
}

// Function to get images for a specific car
export function getCarImages(make: string, model: string): string[] {
  const key = `${make} ${model}`
  return carImages[key] || carImages["default"]
}

