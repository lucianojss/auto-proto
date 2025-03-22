"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"

interface CarImageGalleryProps {
  images: string[]
  make: string
  model: string
}

export function CarImageGallery({ images, make, model }: CarImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative rounded-lg overflow-hidden border">
      <div className="relative aspect-[4/3] bg-muted">
        <Image
          src={images[currentImageIndex] || "/placeholder.svg"}
          alt={`${make} ${model}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={currentImageIndex === 0}
        />
        <Badge className="absolute top-4 left-4 bg-primary">New</Badge>

        {/* Navigation buttons */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm"
              onClick={prevImage}
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous image</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm"
              onClick={nextImage}
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next image</span>
            </Button>
          </>
        )}
      </div>
      <div className="p-4 flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          {currentImageIndex + 1} / {images.length}
        </div>
        <Button variant="outline" size="sm">
          <ExternalLink className="mr-2 h-4 w-4" />
          See bigger images
        </Button>
      </div>

      {/* Thumbnail navigation */}
      {images.length > 1 && (
        <div className="px-4 pb-4 flex gap-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              className={`relative w-16 h-12 rounded overflow-hidden border-2 ${
                index === currentImageIndex ? "border-primary" : "border-transparent"
              }`}
              onClick={() => setCurrentImageIndex(index)}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${make} ${model} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

