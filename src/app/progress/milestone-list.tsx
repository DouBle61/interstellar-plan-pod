"use client";

import { useState } from "react";
import { useMounted } from "@/hooks/use-mounted";
import { useMilestoneStore } from "@/stores/use-milestone-store";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Flag, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function MilestoneList() {
  const mounted = useMounted();
  const {
    milestones,
    toggleMilestone,
    addMilestone,
    removeMilestone,
    getProgress,
  } = useMilestoneStore();
  const [newTitle, setNewTitle] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  if (!mounted) {
    return (
      <div className="mb-5 h-64 animate-pulse rounded-2xl bg-cosmos-900/30" />
    );
  }

  const progress = getProgress();

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    addMilestone(newTitle.trim());
    setNewTitle("");
    setShowAdd(false);
  };

  return (
    <Card
      className="mb-5 animate-slide-up"
      style={{ animationDelay: "0.1s" }}
    >
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Flag className="h-5 w-5 text-cosmos-300" />
          关键里程碑
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant={progress === 100 ? "success" : "default"}>
            {progress}%
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setShowAdd(!showAdd)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {/* 进度条 */}
        <div className="mb-4">
          <Progress
            value={progress}
            indicatorClassName={
              progress === 100
                ? "from-green-500 to-emerald-300"
                : "from-cosmos-500 to-cosmos-300"
            }
          />
        </div>

        {/* 添加新里程碑 */}
        {showAdd && (
          <div className="mb-3 flex gap-2 animate-slide-up">
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="新的里程碑..."
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              autoFocus
            />
            <Button size="sm" onClick={handleAdd}>
              添加
            </Button>
          </div>
        )}

        {/* 里程碑列表 */}
        <div className="space-y-2">
          {milestones.map((milestone, index) => (
            <div
              key={milestone.id}
              className={cn(
                "group flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 transition-all duration-300",
                milestone.done
                  ? "border-green-500/10 bg-green-500/5"
                  : "hover:bg-white/[0.03]"
              )}
            >
              <span className="w-5 text-center text-xs text-muted-foreground/40 font-mono">
                {index + 1}
              </span>
              <Checkbox
                checked={milestone.done}
                onCheckedChange={() => toggleMilestone(milestone.id)}
              />
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    "text-sm transition-all duration-300",
                    milestone.done
                      ? "text-muted-foreground line-through"
                      : "text-starlight"
                  )}
                >
                  {milestone.title}
                </p>
                {milestone.completedAt && (
                  <p className="text-[10px] text-green-400/60 mt-0.5">
                    ✓ 完成于{" "}
                    {new Date(milestone.completedAt).toLocaleDateString(
                      "zh-CN"
                    )}
                  </p>
                )}
              </div>
              <button
                onClick={() => removeMilestone(milestone.id)}
                className="shrink-0 p-1 text-transparent transition-colors group-hover:text-muted-foreground/40 hover:!text-red-400"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>

        {milestones.length === 0 && (
          <p className="py-6 text-center text-sm text-muted-foreground">
            还没有里程碑，点击 + 添加
          </p>
        )}
      </CardContent>
    </Card>
  );
}