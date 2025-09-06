import { Router } from "express";
import { CandidaturasController } from "../controllers/candidaturas.controller";

const router = Router();

router.get("/", CandidaturasController.list);
router.get("/candidato/:candidatoId", CandidaturasController.getByCandidato);
router.get("/vaga/:vagaId", CandidaturasController.getByVaga);
router.post("/", CandidaturasController.create);
router.put("/:id/status", CandidaturasController.updateStatus);
router.delete("/:id", CandidaturasController.delete);

export default router;