import { Router } from "express";
import { VinculosController } from "../controllers/vinculos.controller";

const router = Router();

// Rotas para gerenciar relacionamentos N:N

// POST /subtipos/:id/barreiras
router.post("/subtipos/:id/barreiras", VinculosController.vincularBarreiras);

// POST /barreiras/:id/acessibilidades
router.post("/barreiras/:id/acessibilidades", VinculosController.vincularAcessibilidades);

// DELETE /barreiras/:barreiraId/acessibilidades/:acessibilidadeId
router.delete("/barreiras/:barreiraId/acessibilidades/:acessibilidadeId", VinculosController.desvincularAcessibilidade);

export default router;
