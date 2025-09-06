import { Router } from "express";
import { CandidatoSubtipoController } from "../controllers/candidato-subtipo.controller";

const router = Router();

router.get("/candidato/:candidatoId", CandidatoSubtipoController.getByCandidato);
router.post("/", CandidatoSubtipoController.create);
router.delete("/:id", CandidatoSubtipoController.delete);

export default router;