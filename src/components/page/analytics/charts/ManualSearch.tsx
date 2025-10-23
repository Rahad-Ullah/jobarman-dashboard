"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PieDonutChart } from "./DonutChart";
import { BarConversionFunnel } from "./BarChart";

export default function ManualSearch() {
  const [start, setStart] = React.useState(new Date());
  const [end, setEnd] = React.useState(new Date());

  return (
    <Card>
      <CardHeader className="flex-row justify-between items-center gap-4">
        <CardTitle className="text-2xl">Manual Search</CardTitle>
        {/* Date-Time Filter */}
        <div className="flex flex-wrap gap-4 px-6 pb-4 items-center">
          <div className="flex items-center gap-2">
            Start
            <Input
              type="datetime-local"
              value={start.toISOString().slice(0, 16)}
              onChange={(e) => setStart(new Date(e.target.value))}
              className="h-9"
            />
          </div>
          <div className="flex items-center gap-2">
            End
            <Input
              type="datetime-local"
              value={end.toISOString().slice(0, 16)}
              onChange={(e) => setEnd(new Date(e.target.value))}
              className="h-9"
            />
          </div>
          <Button className="h-9 px-4">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </CardHeader>

      {/* Chart + Funnel */}
      <CardContent className="grid grid-cols-[40%_auto] gap-6 items-center">
        {/* Donut Chart */}
        <PieDonutChart />

        {/* Conversion Funnel */}
        <BarConversionFunnel />
      </CardContent>
    </Card>
  );
}
