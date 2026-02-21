"use client";

import { useState } from "react";
import { useMounted } from "@/hooks/use-mounted";
import { useChecklistStore } from "@/stores/use-checklist-store";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";

const CATEGORY_LABELS: Record<string, string> = {
  english: "英语",
  math: "数学",
  research: "文献",
  fitness: "健身",
};

const CATEGORY_COLORS: Record<string, string> = {
  english: "#67e8f9",
  math: "#fbbf24",
  research: "#a78bfa",
  fitness: "#4ade80",
};

export function StatsChart() {
  const mounted = useMounted();
  const { getWeeklyStats, getMonthlyStats } = useChecklistStore();
  const [tab, setTab] = useState("week");

  if (!mounted) {
    return (
      <div className="mb-5 h-64 animate-pulse rounded-2xl bg-cosmos-900/30" />
    );
  }

  const weeklyStats = getWeeklyStats();
  const now = new Date();
  const monthlyStats = getMonthlyStats(now.getFullYear(), now.getMonth());

  const stats = tab === "week" ? weeklyStats : monthlyStats;
  const chartData = Object.entries(stats).map(([key, value]) => ({
    name: CATEGORY_LABELS[key] || key,
    count: value,
    fill: CATEGORY_COLORS[key] || "#6d28d9",
  }));

  return (
    <Card
      className="mb-5 animate-slide-up"
      style={{ animationDelay: "0.15s" }}
    >
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-cosmos-300" />
          学习统计
        </CardTitle>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="h-8">
            <TabsTrigger value="week" className="text-xs px-2.5 py-1">
              本周
            </TabsTrigger>
            <TabsTrigger value="month" className="text-xs px-2.5 py-1">
              本月
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>

      <CardContent>
        {/* 数字概览 */}
        <div className="mb-4 grid grid-cols-4 gap-2">
          {Object.entries(stats).map(([key, value]) => (
            <div
              key={key}
              className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-2 text-center"
            >
              <p
                className="font-space text-xl font-bold"
                style={{ color: CATEGORY_COLORS[key] }}
              >
                {value}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {CATEGORY_LABELS[key]}
              </p>
            </div>
          ))}
        </div>

        {/* 柱状图 */}
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barSize={32}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.04)"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: "rgba(232,213,245,0.5)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "rgba(232,213,245,0.3)" }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  background: "rgba(6,6,18,0.9)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  fontSize: "12px",
                  color: "#e8d5f5",
                }}
                cursor={{ fill: "rgba(109,40,217,0.08)" }}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}