import { CountdownTimer } from "@/components/progress/countdown-timer";
import { MilestoneList } from "@/components/progress/milestone-list";
import { StatsChart } from "@/components/progress/stats-chart";
import { Target } from "lucide-react";

export default function ProgressPage() {
  return (
    <>
      <div className="mb-6 animate-fade-in">
        <div className="flex items-center gap-2">
          <Target className="h-6 w-6 text-cosmos-300" />
          <h1 className="font-space text-2xl font-bold text-starlight">
            航程进度
          </h1>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          追踪你的星际旅程
        </p>
      </div>
      <CountdownTimer />
      <MilestoneList />
      <StatsChart />
    </>
  );
}