export interface Link {
  id: string;
  original_url: string;
  short_code: string;
  created_at: string;
}

export interface Click {
  id: string;
  link_id: string;
  ip: string;
  region: string;
  browser: string;
  browser_version: string;
  os: string;
  created_at: string;
}
