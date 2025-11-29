"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#147FC7", // Blue
  },
  jobSeeker: {
    label: "Job Seeker",
    color: "#FF8F27", // Orange
  },
  recruiter: {
    label: "Recruiter",
    color: "#008F37", // Green
  },
};

export default function WeeklyReport({ data = []}: { data: { dayName: string, totalJobSeeker: number, totalRecruiter: number, totalRevinue: number }[] }) {
  const chartData = data.map((item) => ({
    day: item.dayName,
    jobSeeker: item.totalJobSeeker,
    recruiter: item.totalRecruiter,
    revenue: item.totalRevinue,
  }))
  
  return (
    <div className="bg-white rounded-lg p-6 border">
      <h2 className="text-xl font-semibold py-4">Weekly Report</h2>

      <ChartContainer config={chartConfig} className="max-h-[450px] w-full">
        <BarChart
          data={chartData}
          width={600}
          height={200} // Reduced height
          barCategoryGap="20%"
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="day"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Bar dataKey="revenue" fill={chartConfig.revenue.color} radius={4} />
          <Bar
            dataKey="jobSeeker"
            fill={chartConfig.jobSeeker.color}
            radius={4}
          />
          <Bar
            dataKey="recruiter"
            fill={chartConfig.recruiter.color}
            radius={4}
          />
        </BarChart>
      </ChartContainer>

      {/* Footer Legend */}
      <div className="flex justify-center gap-6 mt-6 text-sm font-medium">
        {Object.entries(chartConfig).map(([key, { label, color }]) => (
          <div key={key} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: color }}
            />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
