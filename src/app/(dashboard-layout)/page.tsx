import StatCard from "@/components/page/analytics/cards/StatCard";
import { Card } from "@/components/ui/card";
import { EarningChart } from "@/components/page/analytics/charts/EarningChart";
import WeeklyReport from "@/components/page/analytics/charts/WeeklyReport";
import ManualSearch from "@/components/page/analytics/charts/ManualSearch";
import { nextFetch } from "@/utils/nextFetch";

const AnalyticsPage = async () => {
  const summaryRes = await nextFetch("/dashboard/summury");
  const summary = summaryRes?.data;

  return (
    <Card className="h-full bg-transparent border-none animate-fadeIn flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Job Seeker" value={summary?.toalJobSeekers || 0} />
        <StatCard title="Total Recruiter" value={summary?.toalRecruiters || 0} />
        <StatCard title="Active Jobs" value={summary?.totalActiveJobs || 0} />
        <StatCard title="Total Revenue" value={summary?.totalRevinue || 0} prefix="$"/>
      </div>

      <EarningChart />

      <WeeklyReport />

      <ManualSearch />
    </Card>
  );
};

export default AnalyticsPage;
