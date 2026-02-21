import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getDateKey } from "@/lib/date-utils";

interface SleepRecord {
  sleepTime: string | null;
  wakeTime: string | null;
  onTime: boolean;
}

interface HabitRecord {
  sleep: SleepRecord;
  hygiene: boolean;
  fitness: boolean;
  fitnessMinutes: number;
}

interface HabitState {
  records: Record<string, HabitRecord>;

  getRecord: (date?: Date) => HabitRecord;
  setSleep: (sleepTime: string, wakeTime: string, date?: Date) => void;
  toggleHygiene: (date?: Date) => void;
  toggleFitness: (date?: Date) => void;
  setFitnessMinutes: (minutes: number, date?: Date) => void;
}

const defaultRecord: HabitRecord = {
  sleep: { sleepTime: null, wakeTime: null, onTime: false },
  hygiene: false,
  fitness: false,
  fitnessMinutes: 0,
};

export const useHabitStore = create<HabitState>()(
  persist(
    (set, get) => ({
      records: {},

      getRecord: (date = new Date()) => {
        const key = getDateKey(date);
        return get().records[key] || { ...defaultRecord };
      },

      setSleep: (sleepTime, wakeTime, date = new Date()) => {
        const key = getDateKey(date);
        const sleepHour = parseInt(sleepTime.split(":")[0]);
        const wakeHour = parseInt(wakeTime.split(":")[0]);
        const onTime = sleepHour < 23 && wakeHour <= 7;

        set((state) => ({
          records: {
            ...state.records,
            [key]: {
              ...(state.records[key] || defaultRecord),
              sleep: { sleepTime, wakeTime, onTime },
            },
          },
        }));
      },

      toggleHygiene: (date = new Date()) => {
        const key = getDateKey(date);
        set((state) => {
          const current = state.records[key] || { ...defaultRecord };
          return {
            records: {
              ...state.records,
              [key]: { ...current, hygiene: !current.hygiene },
            },
          };
        });
      },

      toggleFitness: (date = new Date()) => {
        const key = getDateKey(date);
        set((state) => {
          const current = state.records[key] || { ...defaultRecord };
          return {
            records: {
              ...state.records,
              [key]: { ...current, fitness: !current.fitness },
            },
          };
        });
      },

      setFitnessMinutes: (minutes, date = new Date()) => {
        const key = getDateKey(date);
        set((state) => {
          const current = state.records[key] || { ...defaultRecord };
          return {
            records: {
              ...state.records,
              [key]: { ...current, fitnessMinutes: minutes, fitness: minutes >= 30 },
            },
          };
        });
      },
    }),
    {
      name: "interstellar-habits",
    }
  )
);