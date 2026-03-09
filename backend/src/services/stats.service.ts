import { getLinkByCode } from "./link.service";
import { getClicksForLink } from "./click.service";

export async function getLinkStats(code: string) {
  const link = await getLinkByCode(code);
  if (!link) return null;
  const clicks = await getClicksForLink(link.id);
  return {
    link: {
      original_url: link.original_url,
      short_code: link.short_code,
      created_at: link.created_at,
    },
    clicks,
    totalClicks: clicks.length,
  };
}
