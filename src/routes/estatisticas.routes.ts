import { Router } from "express";
import { EstatisticasController } from "../controllers/estatisticas.controller";

const router = Router();

router.get("/", EstatisticasController.obterEstatisticas);

export default router;