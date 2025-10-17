import { Router } from "express";
import { CandidatoController } from "../controllers/candidato.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/profile", authMiddleware, CandidatoController.getProfile);
router.put("/:id", CandidatoController.update);

export default router;