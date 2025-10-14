import { Router } from "express";
import { CompatibilidadeController } from "../controllers/compatibilidade.controller";

const router = Router();

// Calcular compatibilidade entre candidato e vaga específica
router.get("/candidato/:candidatoId/vaga/:vagaId", CompatibilidadeController.calcularCompatibilidade);

// Listar todas as vagas com compatibilidade para um candidato
router.get("/candidato/:candidatoId/vagas", CompatibilidadeController.listarVagasCompatibilidade);

// Atualizar compatibilidade média de uma vaga
router.put("/vaga/:vagaId/atualizar", CompatibilidadeController.atualizarCompatibilidadeVaga);

// Listar candidatos com compatibilidade para uma vaga
router.get("/vaga/:vagaId/candidatos", CompatibilidadeController.listarCandidatosCompatibilidade);

export default router;