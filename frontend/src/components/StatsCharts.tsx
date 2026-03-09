import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import type { Click } from "../types";
import { countBy } from "../utils/chartUtils";
import "./StatsCharts.css";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

export function StatsCharts({ clicks }: { clicks: Click[] }) {
  const browserData = useMemo(() => countBy(clicks, "browser"), [clicks]);
  const osData = useMemo(() => countBy(clicks, "os"), [clicks]);
  const regionData = useMemo(() => countBy(clicks, "region"), [clicks]);

  if (!clicks || clicks.length === 0) {
    return <div className="no-data">No clicks yet</div>;
  }

  return (
    <div className="stats-charts-container">
      <div className="chart-box">
        <h3>Browsers</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={browserData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label
            >
              {browserData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-box">
        <h3>Operating Systems</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={osData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label
            >
              {osData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-box full-width">
        <h3>Regions</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={regionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" name="Clicks" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
