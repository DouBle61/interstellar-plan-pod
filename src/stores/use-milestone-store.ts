import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MILESTONES } from "@/lib/constants";

export interface Milestone {
  id: string;
  title: string;
  done: boolean;
  completedAt?: string;
}

interface MilestoneState {
  milestones: Milestone[];
  toggleMilestone: (id: string) => void;
  addMilestone: (title: string) => void;
  removeMilestone: (id: string) => void;
  resetMilestones: () => void;
  getProgress: () => number;
}

export const useMilestoneStore = create<MilestoneState>()(
  persist(
    (set, get) => ({
      milestones: MILESTONES,

      toggleMilestone: (id) =>
        set((state) => ({
          milestones: state.milestones.map((m) =>
            m.id === id
              ? {
                  ...m,
                  done: !m.done,
                  completedAt: !m.done
                    ? new Date().toISOString()
                    : undefined,
                }
              : m
          ),
        })),

      addMilestone: (title) =>
        set((state) => ({
          milestones: [
            ...state.milestones,
            {
              id: `m-${Date.now()}`,
              title,
              done: false,
            },
          ],
        })),

      removeMilestone: (id) =>
        set((state) => ({
          milestones: state.milestones.filter((m) => m.id !== id),
        })),

      resetMilestones: () => set({ milestones: MILESTONES }),

      getProgress: () => {
        const state = get();
        if (state.milestones.length === 0) return 0;
        const done = state.milestones.filter((m) => m.done).length;
        return Math.round((done / state.milestones.length) * 100);
      },
    }),
    {
      name: "interstellar-milestones",
    }
  )
);