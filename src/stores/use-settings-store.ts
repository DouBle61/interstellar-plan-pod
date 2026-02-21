import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  // 每日任务量自定义
  dailyEnglishListeningTarget: string;
  dailyEnglishReadingPages: number;
  dailyResearchPapers: number;
  dailyMathLectures: number;
  dailyFitnessMinutes: number;

  // 作息
  targetSleepTime: string;
  targetWakeTime: string;

  // 截止日期
  deadlineDate: string;

  // 用户名
  userName: string;

  updateSettings: (data: Partial<SettingsState>) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      dailyEnglishListeningTarget: "播客248",
      dailyEnglishReadingPages: 1,
      dailyResearchPapers: 2,
      dailyMathLectures: 2,
      dailyFitnessMinutes: 30,

      targetSleepTime: "23:00",
      targetWakeTime: "07:00",

      deadlineDate: "2026-09-01",

      userName: "星际旅人",

      updateSettings: (data) => set((state) => ({ ...state, ...data })),
    }),
    {
      name: "interstellar-settings",
    }
  )
);