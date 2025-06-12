import type { RunningRecord } from './types'

export const parsePaceToSeconds = (pace: string): number => {
  if (!pace || !pace.includes("'")) return 0;
  const parts = pace.split("'");
  const minutes = parseInt(parts[0], 10);
  const seconds = parseInt(parts[1], 10);
  return minutes * 60 + seconds;
};

export const formatSecondsToPace = (totalSeconds: number): string => {
  if (isNaN(totalSeconds) || totalSeconds === 0) return "0'00\"";
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.round(totalSeconds % 60);
  return `${minutes}'${seconds.toString().padStart(2, "0")}`;
};

export const diffInDays = (date1: Date, date2: Date): number => {
  const utc1 = Date.UTC(
    date1.getFullYear(),
    date1.getMonth(),
    date1.getDate()
  );
  const utc2 = Date.UTC(
    date2.getFullYear(),
    date2.getMonth(),
    date2.getDate()
  );
  return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
}; 
