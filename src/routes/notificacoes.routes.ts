import { Router } from "express";
import { NotificacoesController } from "../controllers/notificacoes.controller";

const router = Router();

// Criar notificação
router.post("/", NotificacoesController.create);

// Listar notificações
router.get("/candidato/:candidatoId", NotificacoesController.getNotificacoesCandidato);
router.get("/empresa/:empresaId", NotificacoesController.getNotificacoesEmpresa);

// Listar todas as notificações
router.get("/candidato/:candidatoId/all", NotificacoesController.getAllNotificacoesCandidato);
router.get("/empresa/:empresaId/all", NotificacoesController.getAllNotificacoesEmpresa);

// Marcar como lida
router.patch("/candidato/:notificacaoId/:candidatoId/lida", NotificacoesController.marcarComoLidaCandidato);
router.patch("/empresa/:notificacaoId/:empresaId/lida", NotificacoesController.marcarComoLidaEmpresa);

export default router;