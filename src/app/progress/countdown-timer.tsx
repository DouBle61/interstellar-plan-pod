"use client";

import { useMounted } from "@/hooks/use-mounted";
import { getDaysUntilDeadline, getDeadlineProgress } from "@/lib/date-utils";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Timer } from "lucide-react";

export function CountdownTimer() {
  const mounted = useMounted();

  if (!mounted) {
    return (
      <div className="mb-5 h-36 animate-pulse rounded-2xl bg-cosmos-900/30" />
    );
  }

  const daysLeft = getDaysUntilDeadline();
  const progress = getDeadlineProgress();

  return (
    <Card className="mb-5 animate-slide-up bg-gradient-to-br from-violet-900/20 to-cosmos-900/20 border-violet-500/10">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/20">
          <Timer className="h-5 w-5 text-violet-300" />
        </div>
        <div>
          <h3 className="font-space text-sm font-medium text-muted-foreground">
            硕博连读申请倒计时
          </h3>
          <p className="font-space text-3xl font-bold text-starlight">
            {daysLeft}{" "}
            <span className="text-base font-normal text-muted-foreground">
              天
            </span>
          </p>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>已用时间</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress
          value={progress}
          indicatorClassName="from-violet-500 to-cosmos-300"
        />
        <p className="text-[10px] text-muted-foreground/50 text-right">
          目标：2026年9月1日
        </p>
      </div>
    </Card>
  );
}