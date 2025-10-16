import { Router } from "express";
import { EstatisticasController } from "../controllers/estatisticas.controller";

const router = Router();

router.get("/candidato/:candidatoId", EstatisticasController.obterEstatisticasCandidato);
router.get("/empresa/:empresaId", EstatisticasController.obterEstatisticasEmpresa);

export default router;