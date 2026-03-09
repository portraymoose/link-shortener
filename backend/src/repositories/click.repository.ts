import { supabase } from "../supabase/client";
import { Click } from "../types";

interface CreateClickData {
  link_id: string;
  ip: string;
  region: string;
  browser: string;
  browser_version: string;
  os: string;
}

export const ClickRepository = {
  async create(data: CreateClickData): Promise<void> {
    const { error } = await supabase.from("clicks").insert(data);
    if (error) {
      console.error("Failed to save click:", error);
    }
  },

  async findByLinkId(linkId: string): Promise<Click[]> {
    const { data, error } = await supabase
      .from("clicks")
      .select(
        "id, link_id, ip, region, browser, browser_version, os, created_at",
      )
      .eq("link_id", linkId)
      .order("created_at", { ascending: false });
    if (error) {
      throw new Error(`Failed to fetch clicks: ${error.message}`);
    }
    return data || [];
  },
};
