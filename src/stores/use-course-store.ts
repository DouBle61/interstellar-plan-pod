import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_COURSES } from "@/lib/constants";

export interface Course {
  id: string;
  day: number; // 0-6, 0=Sunday
  time: string; // "上午" | "下午" | "晚上"
  name: string;
  color: string;
}

interface CourseState {
  courses: Course[];
  setCourses: (courses: Course[]) => void;
  addCourse: (course: Course) => void;
  removeCourse: (id: string) => void;
  updateCourse: (id: string, data: Partial<Course>) => void;
  reorderCourses: (startIndex: number, endIndex: number) => void;
  resetToDefault: () => void;
}

export const useCourseStore = create<CourseState>()(
  persist(
    (set) => ({
      courses: DEFAULT_COURSES,

      setCourses: (courses) => set({ courses }),

      addCourse: (course) =>
        set((state) => ({ courses: [...state.courses, course] })),

      removeCourse: (id) =>
        set((state) => ({
          courses: state.courses.filter((c) => c.id !== id),
        })),

      updateCourse: (id, data) =>
        set((state) => ({
          courses: state.courses.map((c) =>
            c.id === id ? { ...c, ...data } : c
          ),
        })),

      reorderCourses: (startIndex, endIndex) =>
        set((state) => {
          const result = Array.from(state.courses);
          const [removed] = result.splice(startIndex, 1);
          result.splice(endIndex, 0, removed);
          return { courses: result };
        }),

      resetToDefault: () => set({ courses: DEFAULT_COURSES }),
    }),
    {
      name: "interstellar-courses",
    }
  )
);