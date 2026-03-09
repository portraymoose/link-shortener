import type { Click } from "../types";

export interface ChartData {
  name: string;
  value: number;
}

export const countBy = (data: Click[], key: keyof Click): ChartData[] => {
  const counts = data.reduce<Record<string, number>>((acc, curr) => {
    const val = String(curr[key] || "Unknown");
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};
