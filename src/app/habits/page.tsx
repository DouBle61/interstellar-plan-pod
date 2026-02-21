import { SleepTracker } from "@/components/habits/sleep-tracker";
import { HygieneReminder } from "@/components/habits/hygiene-reminder";
import { FitnessLog } from "@/components/habits/fitness-log";
import { HeartPulse } from "lucide-react";

export default function HabitsPage() {
  return (
    <>
      <div className="mb-6 animate-fade-in">
        <div className="flex items-center gap-2">
          <HeartPulse className="h-6 w-6 text-cosmos-300" />
          <h1 className="font-space text-2xl font-bold text-starlight">
            生命维护系统
          </h1>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          保持最佳状态，才能航行更远
        </p>
      </div>
      <SleepTracker />
      <HygieneReminder />
      <FitnessLog />
    </>
  );
}