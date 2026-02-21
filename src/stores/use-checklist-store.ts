import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_DAILY_TASKS } from "@/lib/constants";
import { getDateKey } from "@/lib/date-utils";

export interface TaskItem {
  id: string;
  name: string;
  emoji: string;
  category: string;
}

interface CheckRecord {
  [taskId: string]: boolean;
}

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastCompleteDate: string | null;
}

interface ChecklistState {
  tasks: TaskItem[];
  records: Record<string, CheckRecord>; // dateKey -> { taskId -> done }
  streak: StreakData;

  toggleTask: (taskId: string, date?: Date) => void;
  getCompletionRate: (date?: Date) => number;
  getCheckedTasks: (date?: Date) => CheckRecord;
  setTasks: (tasks: TaskItem[]) => void;
  updateStreak: () => void;

  // 统计
  getWeeklyStats: () => { english: number; math: number; research: number; fitness: number };
  getMonthlyStats: (year: number, month: number) => { english: number; math: number; research: number; fitness: number };
}

export const useChecklistStore = create<ChecklistState>()(
  persist(
    (set, get) => ({
      tasks: DEFAULT_DAILY_TASKS,
      records: {},
      streak: {
        currentStreak: 0,
        longestStreak: 0,
        lastCompleteDate: null,
      },

      toggleTask: (taskId, date = new Date()) => {
        const key = getDateKey(date);
        set((state) => {
          const dayRecord = { ...(state.records[key] || {}) };
          dayRecord[taskId] = !dayRecord[taskId];
          const newRecords = { ...state.records, [key]: dayRecord };
          return { records: newRecords };
        });
        // 更新streak
        get().updateStreak();
      },

      getCompletionRate: (date = new Date()) => {
        const state = get();
        const key = getDateKey(date);
        const record = state.records[key] || {};
        const total = state.tasks.length;
        if (total === 0) return 0;
        const done = Object.values(record).filter(Boolean).length;
        return Math.round((done / total) * 100);
      },

      getCheckedTasks: (date = new Date()) => {
        const key = getDateKey(date);
        return get().records[key] || {};
      },

      setTasks: (tasks) => set({ tasks }),

      updateStreak: () => {
        const state = get();
        const today = new Date();
        let streak = 0;
        const checkDate = new Date(today);

        // 检查今天是否全部完成
        const todayKey = getDateKey(today);
        const todayRecord = state.records[todayKey] || {};
        const todayComplete =
          state.tasks.length > 0 &&
          state.tasks.every((t) => todayRecord[t.id]);

        if (!todayComplete) {
          // 从昨天开始检查
          checkDate.setDate(checkDate.getDate() - 1);
        }

        // 往前追溯连续完成天数
        while (true) {
          const key = getDateKey(checkDate);
          const record = state.records[key] || {};
          const complete =
            state.tasks.length > 0 &&
            state.tasks.every((t) => record[t.id]);

          if (complete) {
            streak++;
            checkDate.setDate(checkDate.getDate() - 1);
          } else {
            break;
          }
        }

        if (todayComplete) streak++;

        set((s) => ({
          streak: {
            currentStreak: streak,
            longestStreak: Math.max(streak, s.streak.longestStreak),
            lastCompleteDate: todayComplete ? todayKey : s.streak.lastCompleteDate,
          },
        }));
      },

      getWeeklyStats: () => {
        const state = get();
        const today = new Date();
        const stats = { english: 0, math: 0, research: 0, fitness: 0 };

        // 获取本周一
        const dayOfWeek = today.getDay();
        const monday = new Date(today);
        monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));

        for (let i = 0; i < 7; i++) {
          const d = new Date(monday);
          d.setDate(monday.getDate() + i);
          const key = getDateKey(d);
          const record = state.records[key] || {};

          state.tasks.forEach((task) => {
            if (record[task.id]) {
              if (task.category === "english") stats.english++;
              if (task.category === "math") stats.math++;
              if (task.category === "research") stats.research++;
              if (task.category === "fitness") stats.fitness++;
            }
          });
        }

        return stats;
      },

      getMonthlyStats: (year, month) => {
        const state = get();
        const stats = { english: 0, math: 0, research: 0, fitness: 0 };
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let d = 1; d <= daysInMonth; d++) {
          const date = new Date(year, month, d);
          const key = getDateKey(date);
          const record = state.records[key] || {};

          state.tasks.forEach((task) => {
            if (record[task.id]) {
              if (task.category === "english") stats.english++;
              if (task.category === "math") stats.math++;
              if (task.category === "research") stats.research++;
              if (task.category === "fitness") stats.fitness++;
            }
          });
        }

        return stats;
      },
    }),
    {
      name: "interstellar-checklist",
    }
  )
);