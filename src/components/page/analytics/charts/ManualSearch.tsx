"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PieDonutChart } from "./DonutChart";
import { BarConversionFunnel } from "./BarChart";
import { useSearchParams } from "next/navigation";
import { useUpdateMultiSearchParams } from "@/hooks/useUpdateMultiSearchParams";

export default function ManualSearch({ data }) {
  const startDate =
    useSearchParams().get("startDate") || new Date().toISOString().slice(0, 16);
  const endDate =
    useSearchParams().get("endDate") || new Date().toISOString().slice(0, 16);
  const updateSearchParams = useUpdateMultiSearchParams();

  const handleFilter = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const startDate = formData.get("startDate")?.toString()?.split("T")[0];
    const endDate = formData.get("endDate")?.toString()?.split("T")[0];

    updateSearchParams({
      startDate: startDate as string,
      endDate: endDate as string,
    });
  };

  return (
    <Card>
      <CardHeader className="flex-row justify-between items-center gap-4">
        <CardTitle className="text-2xl">Manual Search</CardTitle>
        {/* Date-Time Filter */}
        <form
          onSubmit={handleFilter}
          className="flex flex-wrap gap-4 px-6 pb-4 items-center"
        >
          <div className="flex items-center gap-2">
            Start
            <Input
              type="date"
              name="startDate"
              defaultValue={startDate}
              className="h-9"
            />
          </div>
          <div className="flex items-center gap-2">
            End
            <Input
              type="date"
              name="endDate"
              defaultValue={endDate}
              className="h-9"
            />
          </div>
          <Button type="submit" className="h-9 px-4">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </form>
      </CardHeader>

      {/* Chart + Funnel */}
      <CardContent className="grid grid-cols-[40%_auto] gap-6 items-center">
        {/* Donut Chart */}
        <PieDonutChart data={data} />

        {/* Conversion Funnel */}
        <BarConversionFunnel data={data} />
      </CardContent>
    </Card>
  );
}
