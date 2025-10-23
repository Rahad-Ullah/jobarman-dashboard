"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "Conversion funnel donut chart with text";

// Funnel data
const chartData = [
  { category: "revenue", value: 1500, fill: "#2A57DE" }, // Blue
  { category: "jobSeeker", value: 642, fill: "#FF8F27" }, // Orange
  { category: "recruiter", value: 450, fill: "#147FC7" }, // Green
  { category: "jobPost", value: 400, fill: "#219653" }, // Teal
];

// Chart config for ChartContainer
const chartConfig = {
  revenue: { label: "Revenue", color: "#2A57DE" },
  jobSeeker: { label: "Job Seeker", color: "#FF8F27" },
  recruiter: { label: "Recruiter", color: "#147FC7" },
  jobPost: { label: "Recent Job Post", color: "#219653" },
} satisfies ChartConfig;

export function PieDonutChart() {
  const total = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

  return (
    <Card className="w-full h-full flex items-center">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[380px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="category"
              innerRadius={90}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          ${total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-sm"
                        >
                          Total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
