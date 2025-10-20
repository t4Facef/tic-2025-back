import { Router } from "express";
import { CandidatoController } from "../controllers/candidato.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/profile", authMiddleware, CandidatoController.getProfile);
router.get("/:id/profile", CandidatoController.getProfileById);
router.put("/:id", CandidatoController.update);
router.put("/formacoes/batch", authMiddleware, CandidatoController.updateFormacoesBatch);
router.put("/experiencias/batch", authMiddleware, CandidatoController.updateExperienciasBatch);

export default router;