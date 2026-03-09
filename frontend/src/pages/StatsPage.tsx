import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/api";
import { StatsTable } from "../components/StatsTable";
import { StatsCharts } from "../components/StatsCharts";
import type { StatsResponse } from "../types";
import "./StatsPage.css";

export function StatsPage() {
  const { code } = useParams<{ code: string }>();
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!code) {
      setError("No code provided");
      setLoading(false);
      return;
    }
    const abortController = new AbortController();
    setLoading(true);
    setError(null);
    api
      .get<StatsResponse>(`/api/stats/${code}`, {
        signal: abortController.signal,
      })
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "CanceledError" && err.name !== "AbortError") {
          setError(err.message || "Failed to load statistics");
          setLoading(false);
        }
      });
    return () => abortController.abort();
  }, [code]);
  if (loading) return <div className="loading">Loading statistics...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!stats) return <div className="error">No data</div>;
  const shortUrl = `${window.location.origin}/${stats.link.short_code}`;
  return (
    <div className="stats-page">
      <div className="stats-content">
        <header className="stats-header">
          <h1>
            Statistics for{" "}
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          </h1>
          <p className="destination">
            <strong>Destination:</strong>{" "}
            <a
              href={stats.link.original_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {stats.link.original_url}
            </a>
          </p>
          <p className="total-clicks">Total clicks: {stats.clicks.length}</p>
        </header>
        <StatsCharts clicks={stats.clicks} />
        <div className="stats-table-wrapper">
          <StatsTable clicks={stats.clicks} />
        </div>
      </div>
    </div>
  );
}
