import { Request, Response, NextFunction } from "express";
import { validateUrl } from "../utils/validateUrl";
import { createShortLink } from "../services/link.service";

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

interface CreateLinkBody {
  url: string;
}

export const createLink = async (
  req: Request<{}, {}, CreateLinkBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "URL is required." });
    }
    const validatedUrl = validateUrl(url);
    if (!validatedUrl) {
      return res
        .status(400)
        .json({ error: "Invalid URL format. Please use http:// or https://" });
    }
    const shortCode = await createShortLink(validatedUrl);
    res.json({
      shortLink: `${BASE_URL}/${shortCode}`,
      statsLink: `${BASE_URL}/stats/${shortCode}`,
    });
  } catch (err) {
    next(err);
  }
};
