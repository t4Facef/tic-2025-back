import { Router } from "express";
import { CandidatoSubtipoController } from "../controllers/candidato-subtipo.controller";

const router = Router();

router.get("/candidato/:candidatoId", CandidatoSubtipoController.getByCandidato);
router.get("/subtipo/:subtipoId", CandidatoSubtipoController.getBySubtipo);
router.post("/", CandidatoSubtipoController.vincular);
router.delete("/", CandidatoSubtipoController.desvincular);
router.put("/candidato/:candidatoId/batch", CandidatoSubtipoController.atualizarSubtiposBatch);

export default router;