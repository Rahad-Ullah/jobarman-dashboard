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

// Chart config for ChartContainer
const chartConfig = {
  revenue: { label: "Revenue", color: "#147FC7" },
  jobSeeker: { label: "Job Seeker", color: "#FF8F27" },
  recruiter: { label: "Recruiter", color: "#008F37" },
  jobPost: { label: "Recent Job Post", color: "#14B8A6" },
} satisfies ChartConfig;

export function PieDonutChart({data}) {
  // Funnel data
  const chartData = [
    { category: "revenue", value: data?.totalRevinue || 0, fill: "#147FC7" }, // Blue
    { category: "jobSeeker", value: data?.totalJobSeeker || 0, fill: "#FF8F27" }, // Orange
    { category: "recruiter", value: data?.totalRecruiter || 0, fill: "#008F37" }, // Green
    { category: "jobPost", value: data?.totalPosts || 0, fill: "#14B8A6" }, // Teal
  ];

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
                        {/* <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          ${data?.totalRevinue || 0}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-sm"
                        >
                          Total
                        </tspan> */}
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
