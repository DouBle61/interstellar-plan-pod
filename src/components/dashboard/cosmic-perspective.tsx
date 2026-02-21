"use client";

import { Card } from "@/components/ui/card";
import { Telescope } from "lucide-react";

export function CosmicPerspective() {
  return (
    <Card
      className="mb-5 animate-slide-up bg-gradient-to-r from-cosmos-900/50 to-violet-900/20"
      style={{ animationDelay: "0.2s" }}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cosmos-700/30">
          <Telescope className="h-5 w-5 text-cosmos-300" />
        </div>
        <div>
          <h3 className="font-space text-sm font-medium text-cosmos-200">
            星际视角
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            今天你又向宇宙前进了一小步，peace ✨
          </p>
          <p className="mt-1 text-xs text-muted-foreground/50">
            地球正以每秒30公里的速度绕太阳飞行 — 即使你不动，你也在前进。
          </p>
        </div>
      </div>
    </Card>
  );
}