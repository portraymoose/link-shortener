import { Router } from "express";
import { createLink } from "../controllers/linkController";

const router = Router();

router.post("/links", createLink);

export default router;
