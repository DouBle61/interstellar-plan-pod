import { DEADLINE } from "./constants";

const CHINESE_WEEKDAYS = [
  "周日",
  "周一",
  "周二",
  "周三",
  "周四",
  "周五",
  "周六",
];

export function getChineseWeekday(date: Date = new Date()): string {
  return CHINESE_WEEKDAYS[date.getDay()];
}

export function formatStarDate(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}.${m}.${d}`;
}

export function getDateKey(date: Date = new Date()): string {
  return date.toISOString().split("T")[0];
}

export function getDaysUntilDeadline(from: Date = new Date()): number {
  const diff = DEADLINE.getTime() - from.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function getDeadlineProgress(from: Date = new Date()): number {
  // 假设从2026年2月1日开始算
  const start = new Date("2026-02-01T00:00:00");
  const total = DEADLINE.getTime() - start.getTime();
  const elapsed = from.getTime() - start.getTime();
  return Math.min(100, Math.max(0, (elapsed / total) * 100));
}