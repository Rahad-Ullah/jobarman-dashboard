"use client";

import { Bar, BarChart, XAxis, YAxis, Cell } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Funnel data
const chartData = [
  { category: "revenue", value: 1500, color: "#147FC7" },
  { category: "jobSeeker", value: 900, color: "#FF8F27" },
  { category: "recruiter", value: 700, color: "#008F37" },
  { category: "jobPost", value: 500, color: "#14B8A6" },
];

// Chart config
const chartConfig = {
  revenue: { label: "Revenue", color: "#147FC7" },
  jobSeeker: { label: "Job-Seeker", color: "#FF8F27" },
  recruiter: { label: "Recruiter", color: "#008F37" },
  jobPost: { label: "Job-Post", color: "#14B8A6" },
} satisfies ChartConfig;

export function BarConversionFunnel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Conversion Funnel</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[300px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ left: 25 }}
            barCategoryGap="18%"
            height={150}
          >
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="value" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel indicator="dot" />}
            />
            <Bar dataKey="value" layout="vertical" radius={5}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={chartConfig[entry.category].color}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
