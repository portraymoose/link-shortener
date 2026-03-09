import { Request, Response, NextFunction } from "express";
import { getLinkStats } from "../services/stats.service";

interface StatsParams {
  code: string;
}

export const getStats = async (
  req: Request<StatsParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { code } = req.params;
    const stats = await getLinkStats(code);
    if (!stats) {
      return res.status(404).json({ error: "Link not found" });
    }
    return res.json(stats);
  } catch (err) {
    next(err);
  }
};
