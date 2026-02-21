"use client";

import { useState, useEffect } from "react";
import { useMounted } from "@/hooks/use-mounted";
import { useHabitStore } from "@/stores/use-habit-store";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dumbbell, Play, Pause, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export function FitnessLog() {
  const mounted = useMounted();
  const { getRecord, setFitnessMinutes } = useHabitStore();
  const record = getRecord();

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);

  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => {
      setTimerSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  if (!mounted) {
    return (
      <div className="mb-5 h-40 animate-pulse rounded-2xl bg-cosmos-900/30" />
    );
  }

  const timerMinutes = Math.floor(timerSeconds / 60);
  const timerSecs = timerSeconds % 60;
  const targetMinutes = 30;
  const fitnessProgress = Math.min(
    100,
    (record.fitnessMinutes / targetMinutes) * 100
  );

  const handleFinishTimer = () => {
    setIsTimerRunning(false);
    const newTotal = record.fitnessMinutes + timerMinutes + (timerSecs > 0 ? 1 : 0);
    setFitnessMinutes(Math.min(newTotal, 120)); // cap at 120 minutes
    setTimerSeconds(0);
  };

  const handleManualAdd = (mins: number) => {
    const newTotal = Math.min(record.fitnessMinutes + mins, 120);
    setFitnessMinutes(newTotal);
  };

  return (
    <Card
      className={cn(
        "mb-5 animate-slide-up",
        record.fitness &&
          "border-green-500/10 bg-gradient-to-br from-green-500/5 to-transparent"
      )}
      style={{ animationDelay: "0.15s" }}
    >
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Dumbbell className="h-5 w-5 text-emerald-300" />
          健身记录
        </CardTitle>
        {record.fitness && <Badge variant="success">✓ 达标</Badge>}
      </CardHeader>

      <CardContent>
        {/* 进度 */}
        <div className="mb-4 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>今日运动</span>
            <span>
              {record.fitnessMinutes}/{targetMinutes} 分钟
            </span>
          </div>
          <Progress
            value={fitnessProgress}
            indicatorClassName={
              record.fitness
                ? "from-green-500 to-emerald-300"
                : "from-cosmos-500 to-cosmos-300"
            }
          />
        </div>

        {/* 计时器 */}
        <div className="mb-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center">
          <p className="font-mono text-3xl font-bold text-starlight tracking-wider">
            {String(timerMinutes).padStart(2, "0")}:
            {String(timerSecs).padStart(2, "0")}
          </p>
          <div className="mt-3 flex items-center justify-center gap-2">
            <Button
              variant={isTimerRunning ? "secondary" : "default"}
              size="sm"
              onClick={() => setIsTimerRunning(!isTimerRunning)}
            >
              {isTimerRunning ? (
                <>
                  <Pause className="h-3.5 w-3.5" /> 暂停
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5" /> 开始计时
                </>
              )}
            </Button>
            {timerSeconds > 0 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleFinishTimer}
                >
                  完成并记录
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimerSeconds(0);
                  }}
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </Button>
              </>
            )}
          </div>
        </div>

        {/* 快速添加 */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground shrink-0">
            快速添加：
          </span>
          {[10, 15, 20, 30].map((mins) => (
            <Button
              key={mins}
              variant="outline"
              size="sm"
              className="flex-1 text-xs"
              onClick={() => handleManualAdd(mins)}
            >
              +{mins}分
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}