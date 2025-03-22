"use client"

import { Button } from "@/components/ui/button"
import { Grid, List } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

type ViewMode = "grid" | "list"

interface CarViewToggleProps {
  defaultMode?: ViewMode
  onViewModeChange: (mode: ViewMode) => void
}

export function CarViewToggle({ defaultMode = "grid", onViewModeChange }: CarViewToggleProps) {
  const [viewMode, setViewMode] = useState<ViewMode>(defaultMode)

  // Load saved view preference from localStorage on component mount
  useEffect(() => {
    const savedViewMode = localStorage.getItem("carViewMode") as ViewMode | null
    if (savedViewMode) {
      setViewMode(savedViewMode)
      onViewModeChange(savedViewMode)
    }
  }, [onViewModeChange])

  // Save view preference to localStorage when it changes
  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode)
    localStorage.setItem("carViewMode", mode)
    onViewModeChange(mode)
  }

  return (
    <div className="flex items-center border rounded-md p-1">
      <Button
        variant="ghost"
        size="sm"
        className={cn("px-3 rounded-sm", viewMode === "grid" && "bg-muted")}
        onClick={() => handleViewModeChange("grid")}
      >
        <Grid className="h-4 w-4 mr-2" />
        Grid
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn("px-3 rounded-sm", viewMode === "list" && "bg-muted")}
        onClick={() => handleViewModeChange("list")}
      >
        <List className="h-4 w-4 mr-2" />
        List
      </Button>
    </div>
  )
}

