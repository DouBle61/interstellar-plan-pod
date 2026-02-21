"use client";

import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import { useMounted } from "@/hooks/use-mounted";
import { useCourseStore, type Course } from "@/stores/use-course-store";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  GripVertical,
  Plus,
  Trash2,
  BookOpen,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

const DAYS = ["", "周一", "周二", "周三", "周四", "周五", "周六", "周日"];
const TIME_SLOTS = ["上午", "下午", "晚上"];

export function CourseTable() {
  const mounted = useMounted();
  const { courses, reorderCourses, addCourse, removeCourse, resetToDefault } =
    useCourseStore();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    name: "",
    day: 1,
    time: "上午",
  });

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    reorderCourses(result.source.index, result.destination.index);
  };

  const handleAdd = () => {
    if (!newCourse.name.trim()) return;
    addCourse({
      id: `c-${Date.now()}`,
      name: newCourse.name,
      day: newCourse.day,
      time: newCourse.time,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
    });
    setNewCourse({ name: "", day: 1, time: "上午" });
    setAddDialogOpen(false);
  };

  if (!mounted) {
    return (
      <div className="h-64 animate-pulse rounded-2xl bg-cosmos-900/30" />
    );
  }

  // 按天分组
  const coursesByDay: Record<number, Course[]> = {};
  courses.forEach((c) => {
    if (!coursesByDay[c.day]) coursesByDay[c.day] = [];
    coursesByDay[c.day].push(c);
  });

  return (
    <Card className="animate-slide-up">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-cosmos-300" />
          课程表
        </CardTitle>
        <div className="flex gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={resetToDefault}
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setAddDialogOpen(true)}
          >
            <Plus className="h-3.5 w-3.5" />
            添加
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="courses">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-1.5"
              >
                {courses.map((course, index) => (
                  <Draggable
                    key={course.id}
                    draggableId={course.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={cn(
                          "flex items-center gap-2 rounded-xl border border-white/[0.04] bg-white/[0.02] px-3 py-2.5 transition-all",
                          snapshot.isDragging && "border-cosmos-500/30 shadow-glow-sm"
                        )}
                      >
                        <div
                          {...provided.dragHandleProps}
                          className="cursor-grab text-muted-foreground/50 active:cursor-grabbing"
                        >
                          <GripVertical className="h-4 w-4" />
                        </div>
                        <div
                          className="h-3 w-3 rounded-full shrink-0"
                          style={{ backgroundColor: course.color }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-starlight truncate">
                            {course.name}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {DAYS[course.day]} · {course.time}
                          </p>
                        </div>
                        <button
                          onClick={() => removeCourse(course.id)}
                          className="shrink-0 p-1 text-muted-foreground/40 transition-colors hover:text-red-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {courses.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            还没有课程，点击"添加"开始编排
          </p>
        )}
      </CardContent>

      {/* 添加课程对话框 */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>添加课程</DialogTitle>
            <DialogDescription>添加一门新课程到课程表</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <label className="mb-1.5 block text-sm text-muted-foreground">
                课程名称
              </label>
              <Input
                value={newCourse.name}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, name: e.target.value })
                }
                placeholder="例如：高等数学"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-sm text-muted-foreground">
                  星期
                </label>
                <select
                  value={newCourse.day}
                  onChange={(e) =>
                    setNewCourse({
                      ...newCourse,
                      day: parseInt(e.target.value),
                    })
                  }
                  className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-foreground"
                >
                  {[1, 2, 3, 4, 5, 6, 0].map((d) => (
                    <option key={d} value={d}>
                      {DAYS[d] || "周日"}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-muted-foreground">
                  时间段
                </label>
                <select
                  value={newCourse.time}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, time: e.target.value })
                  }
                  className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-foreground"
                >
                  {TIME_SLOTS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <Button onClick={handleAdd} className="w-full">
              添加课程
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}