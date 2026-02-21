import { GreetingCard } from "@/components/dashboard/greeting-card";
import { ThemeDayCard } from "@/components/dashboard/theme-day-card";
import { DailyChecklist } from "@/components/dashboard/daily-checklist";
import { CompletionRing } from "@/components/dashboard/completion-ring";
import { CosmicPerspective } from "@/components/dashboard/cosmic-perspective";
import { PeaceFab } from "@/components/dashboard/peace-fab";

export default function HomePage() {
  return (
    <>
      <GreetingCard />
      <ThemeDayCard />
      <CompletionRing />
      <DailyChecklist />
      <CosmicPerspective />
      <PeaceFab />
    </>
  );
}