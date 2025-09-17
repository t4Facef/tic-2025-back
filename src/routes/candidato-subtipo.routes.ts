import { Router } from "express";
import { CandidatoSubtipoController } from "../controllers/candidato-subtipo.controller";

const router = Router();

router.get("/candidato/:candidatoId", CandidatoSubtipoController.getByCandidato);
router.post("/", CandidatoSubtipoController.vincular);
router.delete("/", CandidatoSubtipoController.desvincular);

export default router;