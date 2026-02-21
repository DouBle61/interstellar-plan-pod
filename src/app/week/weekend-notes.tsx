"use client";

import { useState, useEffect } from "react";
import { useMounted } from "@/hooks/use-mounted";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Lightbulb, MapPin } from "lucide-react";

export function WeekendNotes() {
  const mounted = useMounted();
  const [saturdayNote, setSaturdayNote] = useState("");
  const [sundayNote, setSundayNote] = useState("");

  useEffect(() => {
    if (!mounted) return;
    const saved = localStorage.getItem("interstellar-weekend-notes");
    if (saved) {
      const parsed = JSON.parse(saved);
      setSaturdayNote(parsed.saturday || "");
      setSundayNote(parsed.sunday || "");
    }
  }, [mounted]);

  const saveNotes = (saturday: string, sunday: string) => {
    localStorage.setItem(
      "interstellar-weekend-notes",
      JSON.stringify({ saturday, sunday })
    );
  };

  if (!mounted) return null;

  return (
    <div className="mt-5 space-y-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
      {/* 周六进城日 */}
      <Card className="bg-gradient-to-br from-teal-500/10 to-cyan-600/5 border-teal-500/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <MapPin className="h-4 w-4 text-teal-400" />
            🏙️ 周六 · 进城日
          </CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            value={saturdayNote}
            onChange={(e) => {
              setSaturdayNote(e.target.value);
              saveNotes(e.target.value, sundayNote);
            }}
            placeholder="记录进城计划、要去的地方..."
            className="w-full resize-none rounded-xl border border-white/5 bg-white/[0.03] p-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-teal-500/30 focus:outline-none"
            rows={3}
          />
        </CardContent>
      </Card>

      {/* 周日稀奇古怪日 */}
      <Card className="bg-gradient-to-br from-pink-500/10 to-purple-600/5 border-pink-500/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Lightbulb className="h-4 w-4 text-pink-400" />
            🌀 周日 · 稀奇古怪日
          </CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            value={sundayNote}
            onChange={(e) => {
              setSundayNote(e.target.value);
              saveNotes(saturdayNote, e.target.value);
            }}
            placeholder="突发灵感、奇思妙想、随便写写..."
            className="w-full resize-none rounded-xl border border-white/5 bg-white/[0.03] p-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-pink-500/30 focus:outline-none"
            rows={3}
          />
        </CardContent>
      </Card>
    </div>
  );
}