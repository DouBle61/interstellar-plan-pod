"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // 检查是否已经dismiss过
    const wasDismissed = localStorage.getItem("pwa-banner-dismissed");
    if (wasDismissed) {
      setDismissed(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    setDismissed(true);
    localStorage.setItem("pwa-banner-dismissed", "true");
  };

  if (!showBanner || dismissed) return null;

  return (
    <div className="fixed left-4 right-4 top-4 z-[60] animate-slide-up">
      <div className="glass-card mx-auto flex max-w-lg items-center gap-3 p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cosmos-700/50">
          <Download className="h-5 w-5 text-cosmos-200" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-starlight">
            安装星际计划舱到桌面
          </p>
          <p className="text-xs text-muted-foreground">
            像原生App一样使用，离线也可用
          </p>
        </div>
        <button
          onClick={handleInstall}
          className="btn-starlight rounded-lg bg-cosmos-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-cosmos-500"
        >
          安装
        </button>
        <button
          onClick={handleDismiss}
          className="p-1 text-muted-foreground hover:text-starlight"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}