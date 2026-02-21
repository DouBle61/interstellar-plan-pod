"use client";

import { useState } from "react";
import { useMounted } from "@/hooks/use-mounted";
import { useChecklistStore } from "@/stores/use-checklist-store";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Flame, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function DailyChecklist() {
  const mounted = useMounted();
  const { tasks, toggleTask, getCheckedTasks, streak } = useChecklistStore();
  const checkedTasks = getCheckedTasks();
  const [justChecked, setJustChecked] = useState<string | null>(null);

  const handleToggle = (taskId: string) => {
    toggleTask(taskId);
    if (!checkedTasks[taskId]) {
      setJustChecked(taskId);
      setTimeout(() => setJustChecked(null), 600);
    }
  };

  if (!mounted) {
    return (
      <div className="mb-5 h-72 animate-pulse rounded-2xl bg-cosmos-900/30" />
    );
  }

  const doneCount = Object.values(checkedTasks).filter(Boolean).length;
  const allDone = doneCount === tasks.length && tasks.length > 0;

  return (
    <Card className="mb-5 animate-slide-up" style={{ animationDelay: "0.1s" }}>
      <CardHeader className="flex-row items-center justify-between pb-3">
        <CardTitle className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-cosmos-300" />
          今日必做
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant={allDone ? "success" : "default"}>
            {doneCount}/{tasks.length}
          </Badge>
          {streak.currentStreak > 0 && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Flame className="h-3 w-3 text-orange-400" />
              {streak.currentStreak}天
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2.5">
          {tasks.map((task) => {
            const isChecked = !!checkedTasks[task.id];
            const isJustChecked = justChecked === task.id;

            return (
              <label
                key={task.id}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 transition-all duration-300",
                  isChecked
                    ? "border-green-500/10 bg-green-500/5"
                    : "hover:bg-white/[0.03]",
                  isJustChecked && "check-glow"
                )}
              >
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={() => handleToggle(task.id)}
                />
                <span className="text-lg">{task.emoji}</span>
                <span
                  className={cn(
                    "flex-1 text-sm transition-all duration-300",
                    isChecked
                      ? "text-muted-foreground line-through"
                      : "text-starlight"
                  )}
                >
                  {task.name}
                </span>
                {isChecked && (
                  <span className="text-xs text-green-400">✓</span>
                )}
              </label>
            );
          })}
        </div>

        {/* 全部完成庆祝 */}
        {allDone && (
          <div className="mt-4 rounded-xl border border-green-400/20 bg-green-500/10 p-3 text-center">
            <p className="text-sm font-medium text-green-300">
              🌟 今日任务全部完成！你太棒了，peace ✨
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}