import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BottomNav } from "@/components/layout/bottom-nav";
import { StarfieldBg } from "@/components/layout/starfield-bg";
import { PWAInstallBanner } from "@/components/layout/pwa-install-banner";

export const metadata: Metadata = {
  title: "星际计划舱 | Interstellar Plan Pod",
  description:
    "你的星际学习计划中心 — 向着硕博连读的目标，每天前进一小步。peace ✨",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "星际计划舱",
  },
  icons: {
    icon: "/icons/icon-192.svg",
    apple: "/icons/icon-192.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#060612",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* 注册 Service Worker */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-void font-sans">
        {/* 星空粒子背景 */}
        <StarfieldBg />

        {/* PWA安装横幅 */}
        <PWAInstallBanner />

        {/* 主内容区域 */}
        <main className="relative z-10 mx-auto max-w-lg px-4 pb-24 pt-6">
          {children}
        </main>

        {/* 底部导航 */}
        <BottomNav />
      </body>
    </html>
  );
}