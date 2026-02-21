"use client";

import { useMounted } from "@/hooks/use-mounted";
import { useChecklistStore } from "@/stores/use-checklist-store";
import { Card } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export function CompletionRing() {
  const mounted = useMounted();
  const { getCompletionRate } = useChecklistStore();
  const rate = getCompletionRate();

  if (!mounted) {
    return (
      <div className="mb-5 h-44 animate-pulse rounded-2xl bg-cosmos-900/30" />
    );
  }

  const data = [
    { name: "完成", value: rate },
    { name: "未完成", value: 100 - rate },
  ];

  const COLORS = ["#4ade80", "rgba(109,40,217,0.15)"];

  return (
    <Card className="mb-5 animate-slide-up" style={{ animationDelay: "0.15s" }}>
      <div className="flex items-center gap-4">
        {/* 圆环 */}
        <div className="relative h-28 w-28 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={50}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                stroke="none"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* 中间数字 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-space text-2xl font-bold text-starlight">
              {rate}%
            </span>
          </div>
        </div>

        {/* 右侧信息 */}
        <div className="flex-1">
          <h3 className="font-space text-sm font-medium text-muted-foreground">
            今日完成率
          </h3>
          <p className="mt-1 text-xs text-muted-foreground/60">
            {rate === 100
              ? "完美！全部完成 🌟"
              : rate >= 75
              ? "快要完成了，加油！"
              : rate >= 50
              ? "已经过半，继续前进"
              : rate > 0
              ? "已经开始了，保持节奏"
              : "新的一天，准备出发 🚀"}
          </p>
        </div>
      </div>
    </Card>
  );
}