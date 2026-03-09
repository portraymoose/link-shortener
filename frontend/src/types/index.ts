export interface Click {
  id: number;
  ip: string;
  region: string;
  browser: string;
  browser_version: string;
  os: string;
  created_at: string;
}

export interface Link {
  id: number;
  original_url: string;
  short_code: string;
}

export interface StatsResponse {
  link: Link;
  clicks: Click[];
}
