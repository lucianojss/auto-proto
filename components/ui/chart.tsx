"use client"

import React from "react"
import {
  Line as RechartsLine,
  LineChart as RechartsLineChart,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts"
import { cn } from "@/lib/utils"

export const ChartContainer = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      {children}
    </ResponsiveContainer>
  )
}

export const Chart = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export const LineChart = ({
  data,
  margin = { top: 5, right: 10, left: 10, bottom: 5 },
  children,
}: {
  data: any[]
  margin?: { top: number; right: number; left: number; bottom: number }
  children: React.ReactNode
}) => {
  return (
    <RechartsLineChart data={data} margin={margin}>
      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
      {children}
    </RechartsLineChart>
  )
}

export const XAxis = ({
  dataKey,
  stroke = "hsl(var(--muted-foreground))",
  fontSize = 12,
  tickLine = false,
  axisLine = { stroke: "hsl(var(--border))" },
  padding = { left: 10, right: 10 },
}: {
  dataKey: string
  stroke?: string
  fontSize?: number
  tickLine?: boolean
  axisLine?: { stroke: string }
  padding?: { left: number; right: number }
}) => {
  return (
    <RechartsXAxis
      dataKey={dataKey}
      stroke={stroke}
      fontSize={fontSize}
      tickLine={tickLine}
      axisLine={axisLine}
      padding={padding}
    />
  )
}

export const YAxis = ({
  dataKey,
  domain = ["auto", "auto"],
  tickFormatter,
  stroke = "hsl(var(--muted-foreground))",
  fontSize = 12,
  tickLine = false,
  axisLine = { stroke: "hsl(var(--border))" },
  width = 80,
}: {
  dataKey: string
  domain?: [number | string, number | string]
  tickFormatter?: (value: number) => string
  stroke?: string
  fontSize?: number
  tickLine?: boolean
  axisLine?: { stroke: string }
  width?: number
}) => {
  return (
    <RechartsYAxis
      dataKey={dataKey}
      domain={domain}
      tickFormatter={tickFormatter}
      stroke={stroke}
      fontSize={fontSize}
      tickLine={tickLine}
      axisLine={axisLine}
      width={width}
    />
  )
}

export const Line = ({
  dataKey,
  stroke = "hsl(var(--primary))",
  strokeWidth = 2,
  dot = true,
  activeDot = true,
  type = "monotone",
  fillOpacity,
  fill,
}: {
  dataKey: string
  stroke?: string
  strokeWidth?: number
  dot?: boolean | object
  activeDot?: boolean | object
  type?:
    | "basis"
    | "basisClosed"
    | "basisOpen"
    | "linear"
    | "linearClosed"
    | "natural"
    | "monotoneX"
    | "monotoneY"
    | "monotone"
    | "step"
    | "stepBefore"
    | "stepAfter"
  fillOpacity?: number
  fill?: string
}) => {
  return (
    <RechartsLine
      type={type}
      dataKey={dataKey}
      stroke={stroke}
      strokeWidth={strokeWidth}
      dot={dot}
      activeDot={activeDot}
      fillOpacity={fillOpacity}
      fill={fill}
    />
  )
}

export const ChartTooltip = ({
  content,
  cursor = { stroke: "hsl(var(--muted))" },
}: {
  content: React.ReactNode
  cursor?: { stroke: string }
}) => {
  return (
    <RechartsTooltip
      content={({ active, payload, label }) => {
        if (active && payload && payload.length) {
          return React.cloneElement(content as React.ReactElement, {
            active,
            payload,
            label,
          })
        }
        return null
      }}
      cursor={cursor}
    />
  )
}

export const ChartTooltipContent = ({
  className,
  formatter,
  labelFormatter,
  active,
  payload,
  label,
}: {
  className?: string
  formatter?: (value: number) => [string, string]
  labelFormatter?: (label: string) => string
  active?: boolean
  payload?: any[]
  label?: string
}) => {
  if (!active || !payload || !payload.length || !label) {
    return null
  }

  return (
    <div className={cn("bg-background border rounded-md shadow-md p-2", className)}>
      <p className="text-sm font-medium mb-1">{labelFormatter ? labelFormatter(label) : label}</p>
      {payload.map((entry, index) => (
        <div key={`item-${index}`} className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
          <p className="text-sm">{formatter ? formatter(entry.value)[0] : `${entry.name}: ${entry.value}`}</p>
        </div>
      ))}
    </div>
  )
}

