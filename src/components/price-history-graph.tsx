import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface PricePoint {
  date: string;
  price: number;
}

interface PriceHistoryGraphProps {
  data: PricePoint[];
}

const chartConfig = {} satisfies ChartConfig;

export function PriceHistoryGraph({ data }: PriceHistoryGraphProps) {
  return (
    <ChartContainer config={chartConfig}>
      <LineChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="date" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} width={40} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Line
          dataKey="price"
          type="linear"
          strokeWidth={2}
          dot={true}
          name="price"
        />
      </LineChart>
    </ChartContainer>
  );
}
