import { WeekCards } from "@/components/week/week-cards";
import { CourseTable } from "@/components/week/course-table";
import { WeekendNotes } from "@/components/week/weekend-notes";
import { CalendarDays } from "lucide-react";

export default function WeekPage() {
  return (
    <>
      <div className="mb-6 animate-fade-in">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-6 w-6 text-cosmos-300" />
          <h1 className="font-space text-2xl font-bold text-starlight">
            星历周视图
          </h1>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          你的一周航行计划
        </p>
      </div>
      <WeekCards />
      <CourseTable />
      <WeekendNotes />
    </>
  );
}