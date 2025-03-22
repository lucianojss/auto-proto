"use client"

import { useEffect, useRef, useState } from "react"

interface PricePoint {
  date: string
  price: number
}

interface PriceHistoryGraphProps {
  data: PricePoint[]
}

export function PriceHistoryGraph({ data }: PriceHistoryGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Update dimensions when window resizes
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        })
      }
    }

    // Initial update
    updateDimensions()

    // Add resize listener
    window.addEventListener("resize", updateDimensions)

    // Cleanup
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  // Draw the chart whenever dimensions or data change
  useEffect(() => {
    if (!canvasRef.current || data.length === 0 || dimensions.width === 0 || dimensions.height === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions and account for device pixel ratio for sharper rendering
    const dpr = window.devicePixelRatio || 1
    canvas.width = dimensions.width * dpr
    canvas.height = dimensions.height * dpr
    canvas.style.width = `${dimensions.width}px`
    canvas.style.height = `${dimensions.height}px`
    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.clearRect(0, 0, dimensions.width, dimensions.height)

    // Find min and max prices for scaling
    const prices = data.map((point) => point.price)
    const minPrice = Math.min(...prices) * 0.995 // Add 0.5% padding
    const maxPrice = Math.max(...prices) * 1.005 // Add 0.5% padding
    const priceRange = maxPrice - minPrice

    // Calculate dimensions with padding
    const padding = { top: 30, right: 20, bottom: 40, left: 80 }
    const graphWidth = dimensions.width - padding.left - padding.right
    const graphHeight = dimensions.height - padding.top - padding.bottom

    // Draw horizontal grid lines and price labels
    ctx.strokeStyle = "#e5e7eb" // Light gray for grid lines
    ctx.fillStyle = "#6b7280" // Gray for text
    ctx.font = "12px sans-serif"
    ctx.textAlign = "right"
    ctx.textBaseline = "middle"

    // Calculate nice round numbers for y-axis ticks
    const numTicks = 5
    const priceStep = Math.ceil(priceRange / (numTicks - 1) / 100) * 100
    const firstTick = Math.floor(minPrice / priceStep) * priceStep

    for (let i = 0; i < numTicks; i++) {
      const price = firstTick + i * priceStep
      if (price > maxPrice) break

      const y = padding.top + graphHeight - ((price - minPrice) / priceRange) * graphHeight

      // Draw grid line
      ctx.beginPath()
      ctx.moveTo(padding.left, y)
      ctx.lineTo(padding.left + graphWidth, y)
      ctx.stroke()

      // Draw price label
      ctx.fillText(`£${price.toLocaleString()}`, padding.left - 10, y)
    }

    // Draw x-axis labels (dates)
    ctx.textAlign = "center"
    ctx.textBaseline = "top"

    data.forEach((point, i) => {
      const x = padding.left + (i / (data.length - 1)) * graphWidth
      ctx.fillText(point.date, x, padding.top + graphHeight + 10)
    })

    // Draw the price line
    ctx.strokeStyle = "#0ea5e9" // Blue line
    ctx.lineWidth = 2
    ctx.beginPath()

    data.forEach((point, i) => {
      const x = padding.left + (i / (data.length - 1)) * graphWidth
      const y = padding.top + graphHeight - ((point.price - minPrice) / priceRange) * graphHeight

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()

    // Draw data points
    ctx.fillStyle = "#ffffff" // White fill
    ctx.strokeStyle = "#0ea5e9" // Blue border
    ctx.lineWidth = 2

    data.forEach((point, i) => {
      const x = padding.left + (i / (data.length - 1)) * graphWidth
      const y = padding.top + graphHeight - ((point.price - minPrice) / priceRange) * graphHeight

      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
    })

    // Add gradient fill under the line
    const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + graphHeight)
    gradient.addColorStop(0, "rgba(14, 165, 233, 0.3)") // Light blue with transparency
    gradient.addColorStop(1, "rgba(14, 165, 233, 0.0)") // Transparent

    ctx.fillStyle = gradient
    ctx.beginPath()

    // Start from bottom left
    ctx.moveTo(padding.left, padding.top + graphHeight)

    // Draw the line path again
    data.forEach((point, i) => {
      const x = padding.left + (i / (data.length - 1)) * graphWidth
      const y = padding.top + graphHeight - ((point.price - minPrice) / priceRange) * graphHeight

      if (i === 0) {
        ctx.lineTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    // Close the path to the bottom right and fill
    ctx.lineTo(padding.left + graphWidth, padding.top + graphHeight)
    ctx.closePath()
    ctx.fill()
  }, [data, dimensions])

  return (
    <div ref={containerRef} className="w-full h-full">
      <canvas ref={canvasRef} style={{ display: "block" }} className="w-full h-full" />
    </div>
  )
}

