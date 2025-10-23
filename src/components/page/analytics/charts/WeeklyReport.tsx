"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { day: "Sunday", revenue: 3100, jobSeeker: 2900, recruiter: 2200 },
  { day: "Monday", revenue: 3400, jobSeeker: 3600, recruiter: 2800 },
  { day: "Tuesday", revenue: 3700, jobSeeker: 3400, recruiter: 3100 },
  { day: "Wednesday", revenue: 2900, jobSeeker: 3100, recruiter: 1900 },
  { day: "Thursday", revenue: 3200, jobSeeker: 3600, recruiter: 2800 },
  { day: "Friday", revenue: 3300, jobSeeker: 3700, recruiter: 2900 },
  { day: "Saturday", revenue: 3100, jobSeeker: 2900, recruiter: 2700 },
];

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

export default function WeeklyReport() {
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
