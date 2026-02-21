"use client";

import { useMounted } from "@/hooks/use-mounted";
import { useHabitStore } from "@/stores/use-habit-store";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Droplets } from "lucide-react";
import { cn } from "@/lib/utils";

const HYGIENE_ITEMS = [
  { label: "刷牙（早）", emoji: "🪥" },
  { label: "刷牙（晚）", emoji: "🪥" },
  { label: "洗脸", emoji: "🧼" },
  { label: "洗澡/换衣", emoji: "🚿" },
  { label: "整理桌面", emoji: "🗂️" },
];

export function HygieneReminder() {
  const mounted = useMounted();
  const { getRecord, toggleHygiene } = useHabitStore();
  const record = getRecord();

  if (!mounted) {
    return (
      <div className="mb-5 h-40 animate-pulse rounded-2xl bg-cosmos-900/30" />
    );
  }

  return (
    <Card
      className={cn(
        "mb-5 animate-slide-up",
        record.hygiene &&
          "border-green-500/10 bg-gradient-to-br from-green-500/5 to-transparent"
      )}
      style={{ animationDelay: "0.1s" }}
    >
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Droplets className="h-5 w-5 text-cyan-300" />
          个人卫生
        </CardTitle>
        {record.hygiene && <Badge variant="success">✓ 已完成</Badge>}
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          {HYGIENE_ITEMS.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-white/[0.02] transition-colors"
            >
              <span className="text-base">{item.emoji}</span>
              <span className="flex-1 text-sm text-starlight/80">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-3 border-t border-white/[0.04] pt-3">
          <label className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-white/[0.03]">
            <Checkbox
              checked={record.hygiene}
              onCheckedChange={() => toggleHygiene()}
            />
            <span className="text-sm font-medium text-starlight">
              今日个人卫生已全部完成
            </span>
          </label>
        </div>
      </CardContent>
    </Card>
  );
}