"use client";

import { useMounted } from "@/hooks/use-mounted";
import { WEEK_THEMES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function WeekCards() {
  const mounted = useMounted();

  if (!mounted) return null;

  const today = new Date().getDay();

  return (
    <div className="mb-6 grid grid-cols-7 gap-1.5">
      {WEEK_THEMES.map((theme) => {
        const isToday = theme.day === today;
        return (
          <button
            key={theme.day}
            className={cn(
              "flex flex-col items-center gap-1 rounded-xl border p-2 transition-all duration-300",
              isToday
                ? `bg-gradient-to-b ${theme.color} ${theme.borderColor} shadow-glow-sm`
                : "border-white/[0.04] hover:border-white/10 hover:bg-white/[0.02]"
            )}
          >
            <span className="text-lg">{theme.emoji}</span>
            <span
              className={cn(
                "text-[10px] font-medium",
                isToday ? "text-starlight" : "text-muted-foreground"
              )}
            >
              {theme.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}