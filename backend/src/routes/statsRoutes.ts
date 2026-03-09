import { Router } from "express";
import { getStats } from "../controllers/statsController";

const router = Router();

router.get("/stats/:code", getStats);

export default router;
