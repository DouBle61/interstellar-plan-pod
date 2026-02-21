"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Rocket,
  CalendarDays,
  Target,
  HeartPulse,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: Rocket, label: "舱桥" },
  { href: "/week", icon: CalendarDays, label: "星历" },
  { href: "/progress", icon: Target, label: "航程" },
  { href: "/habits", icon: HeartPulse, label: "生命" },
  { href: "/settings", icon: Settings, label: "设置" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/[0.06] bg-void/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-lg items-center justify-around px-2 pb-[env(safe-area-inset-bottom)]">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-2.5 transition-all duration-300",
                isActive
                  ? "text-cosmos-300"
                  : "text-muted-foreground hover:text-cosmos-200"
              )}
            >
              <div className="relative">
                <item.icon
                  className={cn(
                    "h-5 w-5 transition-all duration-300",
                    isActive && "drop-shadow-[0_0_8px_rgba(109,40,217,0.6)]"
                  )}
                />
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-cosmos-400 shadow-glow-sm" />
                )}
              </div>
              <span className="text-[10px] font-medium tracking-wide">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}