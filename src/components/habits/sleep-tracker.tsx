"use client";

import { useState } from "react";
import { useMounted } from "@/hooks/use-mounted";
import { useHabitStore } from "@/stores/use-habit-store";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Moon, Sun, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export function SleepTracker() {
  const mounted = useMounted();
  const { getRecord, setSleep } = useHabitStore();
  const record = getRecord();

  const [sleepTime, setSleepTimeLocal] = useState(
    record.sleep.sleepTime || ""
  );
  const [wakeTime, setWakeTimeLocal] = useState(
    record.sleep.wakeTime || ""
  );

  if (!mounted) {
    return (
      <div className="mb-5 h-40 animate-pulse rounded-2xl bg-cosmos-900/30" />
    );
  }

  const handleSave = () => {
    if (sleepTime && wakeTime) {
      setSleep(sleepTime, wakeTime);
    }
  };

  const hasSaved = record.sleep.sleepTime !== null;

  return (
    <Card
      className={cn(
        "mb-5 animate-slide-up",
        hasSaved && record.sleep.onTime
          ? "border-green-500/10 bg-gradient-to-br from-green-500/5 to-transparent"
          : hasSaved
          ? "border-amber-500/10 bg-gradient-to-br from-amber-500/5 to-transparent"
          : ""
      )}
    >
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Moon className="h-5 w-5 text-indigo-300" />
          睡眠打卡
        </CardTitle>
        {hasSaved && (
          <Badge variant={record.sleep.onTime ? "success" : "secondary"}>
            {record.sleep.onTime ? "✓ 按时作息" : "需改善"}
          </Badge>
        )}
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-3 mb-3">
          {/* 入睡时间 */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Moon className="h-3 w-3" />
              入睡时间
            </label>
            <div className="relative">
              <input
                type="time"
                value={sleepTime}
                onChange={(e) => setSleepTimeLocal(e.target.value)}
                className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-foreground focus:border-cosmos-500 focus:outline-none [color-scheme:dark]"
              />
            </div>
            <p className="text-[10px] text-muted-foreground/50">
              目标：23:00 前
            </p>
          </div>

          {/* 起床时间 */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Sun className="h-3 w-3" />
              起床时间
            </label>
            <div className="relative">
              <input
                type="time"
                value={wakeTime}
                onChange={(e) => setWakeTimeLocal(e.target.value)}
                className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-foreground focus:border-cosmos-500 focus:outline-none [color-scheme:dark]"
              />
            </div>
            <p className="text-[10px] text-muted-foreground/50">
              目标：7:00 起
            </p>
          </div>
        </div>

        <Button
          onClick={handleSave}
          variant={hasSaved ? "secondary" : "default"}
          className="w-full"
          disabled={!sleepTime || !wakeTime}
        >
          <Clock className="h-4 w-4" />
          {hasSaved ? "更新记录" : "记录今日作息"}
        </Button>

        {hasSaved && (
          <div className="mt-3 flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span>🌙 {record.sleep.sleepTime}</span>
            <span>→</span>
            <span>☀️ {record.sleep.wakeTime}</span>
            <span>
              ={" "}
              {(() => {
                const [sh, sm] = (record.sleep.sleepTime || "0:0")
                  .split(":")
                  .map(Number);
                const [wh, wm] = (record.sleep.wakeTime || "0:0")
                  .split(":")
                  .map(Number);
                let diff = wh * 60 + wm - (sh * 60 + sm);
                if (diff < 0) diff += 24 * 60;
                const hours = Math.floor(diff / 60);
                const mins = diff % 60;
                return `${hours}h${mins > 0 ? ` ${mins}m` : ""}`;
              })()}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}