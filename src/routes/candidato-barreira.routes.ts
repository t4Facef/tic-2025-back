import { Router } from "express";
import { CandidatoBarreiraController } from "../controllers/candidato-barreira.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Rotas para gerenciar relações candidato-barreira

// GET /candidato-barreira/candidato/:candidatoId - Buscar barreiras de um candidato
router.get("/candidato/:candidatoId", CandidatoBarreiraController.getByCandidato);

// GET /candidato-barreira/barreira/:barreiraId - Buscar candidatos de uma barreira
router.get("/barreira/:barreiraId", CandidatoBarreiraController.getByBarreira);

// POST /candidato-barreira/vincular - Vincular barreira a candidato
router.post("/vincular", CandidatoBarreiraController.vincular);

// POST /candidato-barreira/desvincular - Desvincular barreira de candidato
router.post("/desvincular", CandidatoBarreiraController.desvincular);

// PUT /candidato-barreira/candidato/:candidatoId/batch - Atualizar todas as barreiras de um candidato
router.put("/candidato/:candidatoId/batch", CandidatoBarreiraController.atualizarBarreirasBatch);

// POST /candidato-barreira/candidato/:candidatoId/inicializar-por-subtipo - Inicializar barreiras baseado nos subtipos
router.post("/candidato/:candidatoId/inicializar-por-subtipo", CandidatoBarreiraController.inicializarBarreirasPorSubtipo);

// Rotas protegidas para uso do próprio candidato (requer autenticação)

// PUT /candidato-barreira/minhas-barreiras - Atualizar barreiras do candidato logado
router.put("/minhas-barreiras", authMiddleware, CandidatoBarreiraController.atualizarMinhasBarreiras);

// POST /candidato-barreira/minhas-barreiras/inicializar-por-subtipo - Inicializar barreiras baseado nos subtipos do candidato logado
router.post("/minhas-barreiras/inicializar-por-subtipo", authMiddleware, CandidatoBarreiraController.inicializarMinhasBarreirasPorSubtipo);

export default router;