"use client";

import { useState } from "react";
import { useMounted } from "@/hooks/use-mounted";
import { useSettingsStore } from "@/stores/use-settings-store";
import { useChecklistStore } from "@/stores/use-checklist-store";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  User,
  BookOpen,
  Clock,
  Download,
  Upload,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { exportAllData, importData } from "@/lib/export-data";

export default function SettingsPage() {
  const mounted = useMounted();
  const settings = useSettingsStore();
  const { setTasks } = useChecklistStore();
  const [importStatus, setImportStatus] = useState<string | null>(null);

  if (!mounted) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-40 animate-pulse rounded-2xl bg-cosmos-900/30"
          />
        ))}
      </div>
    );
  }

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await importData(file);
      setImportStatus("导入成功！刷新页面生效。");
      setTimeout(() => window.location.reload(), 1500);
    } catch {
      setImportStatus("导入失败，请检查文件格式。");
    }
  };

  const handleResetAll = () => {
    if (confirm("确定要重置所有数据吗？这将清除全部本地数据。")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <>
      <div className="mb-6 animate-fade-in">
        <div className="flex items-center gap-2">
          <Settings className="h-6 w-6 text-cosmos-300" />
          <h1 className="font-space text-2xl font-bold text-starlight">
            飞船设置
          </h1>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          自定义你的星际计划舱
        </p>
      </div>

      {/* 个人信息 */}
      <Card className="mb-5 animate-slide-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-cosmos-300" />
            个人信息
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <Label htmlFor="username">你的称呼</Label>
              <Input
                id="username"
                value={settings.userName}
                onChange={(e) =>
                  settings.updateSettings({ userName: e.target.value })
                }
                placeholder="星际旅人"
                className="mt-1.5"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 每日任务量 */}
      <Card
        className="mb-5 animate-slide-up"
        style={{ animationDelay: "0.05s" }}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-cosmos-300" />
            每日任务量
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>英语听力目标</Label>
              <Input
                value={settings.dailyEnglishListeningTarget}
                onChange={(e) =>
                  settings.updateSettings({
                    dailyEnglishListeningTarget: e.target.value,
                  })
                }
                placeholder="播客248"
                className="mt-1.5"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>英语阅读（页）</Label>
                <Input
                  type="number"
                  min={1}
                  value={settings.dailyEnglishReadingPages}
                  onChange={(e) =>
                    settings.updateSettings({
                      dailyEnglishReadingPages: parseInt(e.target.value) || 1,
                    })
                  }
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label>文献阅读（篇）</Label>
                <Input
                  type="number"
                  min={1}
                  value={settings.dailyResearchPapers}
                  onChange={(e) =>
                    settings.updateSettings({
                      dailyResearchPapers: parseInt(e.target.value) || 1,
                    })
                  }
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label>数学（讲）</Label>
                <Input
                  type="number"
                  min={1}
                  value={settings.dailyMathLectures}
                  onChange={(e) =>
                    settings.updateSettings({
                      dailyMathLectures: parseInt(e.target.value) || 1,
                    })
                  }
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label>健身（分钟）</Label>
                <Input
                  type="number"
                  min={10}
                  step={5}
                  value={settings.dailyFitnessMinutes}
                  onChange={(e) =>
                    settings.updateSettings({
                      dailyFitnessMinutes: parseInt(e.target.value) || 30,
                    })
                  }
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 作息目标 */}
      <Card
        className="mb-5 animate-slide-up"
        style={{ animationDelay: "0.1s" }}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-cosmos-300" />
            作息目标
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>目标入睡时间</Label>
              <Input
                type="time"
                value={settings.targetSleepTime}
                onChange={(e) =>
                  settings.updateSettings({ targetSleepTime: e.target.value })
                }
                className="mt-1.5 [color-scheme:dark]"
              />
            </div>
            <div>
              <Label>目标起床时间</Label>
              <Input
                type="time"
                value={settings.targetWakeTime}
                onChange={(e) =>
                  settings.updateSettings({ targetWakeTime: e.target.value })
                }
                className="mt-1.5 [color-scheme:dark]"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 申请截止日期 */}
      <Card
        className="mb-5 animate-slide-up"
        style={{ animationDelay: "0.12s" }}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-cosmos-300" />
            申请截止日期
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label>硕博连读截止日期</Label>
            <Input
              type="date"
              value={settings.deadlineDate}
              onChange={(e) =>
                settings.updateSettings({ deadlineDate: e.target.value })
              }
              className="mt-1.5 [color-scheme:dark]"
            />
          </div>
        </CardContent>
      </Card>

      {/* 数据管理 */}
      <Card
        className="mb-5 animate-slide-up"
        style={{ animationDelay: "0.15s" }}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5 text-cosmos-300" />
            数据管理
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button onClick={exportAllData} variant="outline" className="w-full">
              <Download className="h-4 w-4" />
              导出所有数据（JSON）
            </Button>

            <div className="relative">
              <Button variant="outline" className="w-full" asChild>
                <label className="cursor-pointer">
                  <Upload className="h-4 w-4" />
                  导入数据
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="hidden"
                  />
                </label>
              </Button>
            </div>

            {importStatus && (
              <p className="text-center text-xs text-cosmos-300">
                {importStatus}
              </p>
            )}

            <Separator />

            <Button
              onClick={handleResetAll}
              variant="destructive"
              className="w-full"
            >
              <RotateCcw className="h-4 w-4" />
              重置所有数据
            </Button>
            <p className="text-center text-[10px] text-muted-foreground/50">
              此操作不可撤销，请先导出备份
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 版本信息 */}
      <div className="mt-8 mb-4 text-center animate-fade-in">
        <p className="font-space text-xs text-muted-foreground/40">
          星际计划舱 v1.0.0
        </p>
        <p className="mt-1 text-[10px] text-muted-foreground/30">
          Interstellar Plan Pod · Made with ☮️ & ✨
        </p>
      </div>
    </>
  );
}