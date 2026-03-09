import type { Click } from "../types";
import "./StatsTable.css";

export function StatsTable({ clicks }: { clicks: Click[] }) {
  return (
    <table className="stats-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>IP</th>
          <th>Region</th>
          <th>Browser</th>
          <th>OS</th>
        </tr>
      </thead>
      <tbody>
        {clicks.map((click) => (
          <tr key={click.id}>
            <td>{new Date(click.created_at).toLocaleString()}</td>
            <td>{click.ip}</td>
            <td>{click.region}</td>
            <td>
              {click.browser} {click.browser_version}
            </td>
            <td>{click.os}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
