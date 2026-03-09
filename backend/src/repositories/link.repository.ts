import { supabase } from "../supabase/client";
import { Link } from "../types";

export const LinkRepository = {
  async findByCode(code: string): Promise<Link | null> {
    const { data, error } = await supabase
      .from("links")
      .select("*")
      .eq("short_code", code)
      .maybeSingle();
    if (error) {
      console.error("Error finding link by code:", error);
      return null;
    }
    return data;
  },

  async findByOriginalUrl(
    url: string,
  ): Promise<Pick<Link, "short_code"> | null> {
    const { data, error } = await supabase
      .from("links")
      .select("short_code")
      .eq("original_url", url)
      .maybeSingle();
    if (error) {
      console.error("Error finding link by original URL:", error);
      return null;
    }
    return data;
  },

  async create(originalUrl: string, shortCode: string): Promise<Link> {
    const { data, error } = await supabase
      .from("links")
      .insert({ original_url: originalUrl, short_code: shortCode })
      .select()
      .single();
    if (error) {
      throw new Error(`Failed to create link: ${error.message}`);
    }
    return data;
  },
};
