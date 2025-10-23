import StatCard from "@/components/page/analytics/cards/StatCard";
import { Card } from "@/components/ui/card";
import { EarningChart } from "@/components/page/analytics/charts/EarningChart";

const AnalyticsPage = () => {
  return (
    <Card className="h-full bg-transparent border-none animate-fadeIn flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Job Seeker" value="12,345" />
        <StatCard title="Total Recruiter" value="550" />
        <StatCard title="Active Jobs" value="200" />
        <StatCard title="Total Revenue" value="$50,000" />
      </div>

      <EarningChart />

      {/* <UserGrowthChart /> */}
    </Card>
  );
};

export default AnalyticsPage;
