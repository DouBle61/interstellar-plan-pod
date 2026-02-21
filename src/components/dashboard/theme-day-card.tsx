"use client";

import { useMounted } from "@/hooks/use-mounted";
import { WEEK_THEMES } from "@/lib/constants";
import { Card } from "@/components/ui/card";

export function ThemeDayCard() {
  const mounted = useMounted();

  if (!mounted) {
    return (
      <div className="mb-5 h-28 animate-pulse rounded-2xl bg-cosmos-900/30" />
    );
  }

  const today = new Date().getDay();
  const theme = WEEK_THEMES[today];

  return (
    <Card
      className={`mb-5 animate-slide-up overflow-hidden bg-gradient-to-br ${theme.color} border ${theme.borderColor}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-3xl">{theme.emoji}</span>
            <div>
              <h2 className="font-space text-xl font-bold text-starlight">
                {theme.theme}
              </h2>
              <p className="text-sm text-muted-foreground">
                {theme.name} · {theme.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 周四学习日特殊高亮 */}
      {today === 4 && (
        <div className="mt-3 rounded-xl border border-violet-400/20 bg-violet-500/10 px-3 py-2">
          <p className="text-xs font-medium text-violet-300">
            🎯 今日重点：硕博申请攻坚 — 全力以赴！
          </p>
        </div>
      )}
    </Card>
  );
}