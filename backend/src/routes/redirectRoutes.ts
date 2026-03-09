import { Router } from "express";
import { redirectToOriginal } from "../controllers/redirectController";

const router = Router();

router.get("/:code", redirectToOriginal);

export default router;
