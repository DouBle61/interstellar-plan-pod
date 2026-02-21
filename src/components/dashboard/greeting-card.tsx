"use client";

import { useMounted } from "@/hooks/use-mounted";
import { getChineseWeekday, formatStarDate } from "@/lib/date-utils";
import { useSettingsStore } from "@/stores/use-settings-store";
import { Sparkles } from "lucide-react";

export function GreetingCard() {
  const mounted = useMounted();
  const userName = useSettingsStore((s) => s.userName);

  if (!mounted) {
    return (
      <div className="mb-6">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-cosmos-900/30" />
        <div className="mt-2 h-5 w-64 animate-pulse rounded-lg bg-cosmos-900/20" />
      </div>
    );
  }

  const now = new Date();
  const hour = now.getHours();
  let greeting = "晚上好";
  if (hour < 6) greeting = "夜深了";
  else if (hour < 12) greeting = "早上好";
  else if (hour < 14) greeting = "中午好";
  else if (hour < 18) greeting = "下午好";

  return (
    <div className="mb-6 animate-fade-in">
      <div className="flex items-center gap-2">
        <h1 className="font-space text-2xl font-bold text-starlight">
          {greeting}，{userName}
        </h1>
        <Sparkles className="h-5 w-5 text-cosmos-300 animate-pulse-star" />
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        今天是{getChineseWeekday()} · 星际历{formatStarDate()}
      </p>
    </div>
  );
}