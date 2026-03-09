import { Request, Response, NextFunction } from "express";
import { getLinkByCode } from "../services/link.service";
import { saveClick } from "../services/click.service";
import { getRegionByIP } from "../services/geo.service";
import { parseUserAgent } from "../services/userAgent.service";
import { getClientIp } from "../utils/getClientIp";

interface RedirectParams {
  code: string;
}

export const redirectToOriginal = async (
  req: Request<RedirectParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { code } = req.params;
    const link = await getLinkByCode(code);
    if (!link) {
      return res.status(404).json({ error: "Link not found." });
    }
    const ip = getClientIp(req);
    const { browser, browser_version, os } = parseUserAgent(
      req.headers["user-agent"],
    );
    res.redirect(link.original_url);
    (async () => {
      try {
        const region = await getRegionByIP(ip);
        await saveClick({
          link_id: link.id,
          ip,
          region,
          browser,
          browser_version,
          os,
        });
      } catch (err) {
        console.error("Failed to save click:", err);
      }
    })();
  } catch (err) {
    next(err);
  }
};
