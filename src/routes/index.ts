import { Router } from "express";
import tiposRoutes from "./tipos.routes";
import subtiposRoutes from "./subtipos.routes";
import barreirasRoutes from "./barreiras.routes";
import acessibilidadesRoutes from "./acessibilidades.routes";
import authRoutes from "./auth.routes";
import vinculosRoutes from "./vinculos.routes";
import candidatoSubtipoRoutes from "./candidato-subtipo.routes";
import candidaturasRoutes from "./candidaturas.routes";
import enderecoRoutes from "./endereco.routes";
import experienciasRoutes from "./experiencias.routes";
import formacaoRoutes from "./formacao.routes";

import vagasRoutes from "./vagas.routes";
import candidatoRoutes from "./candidato.routes";
import compatibilidadeRoutes from "./compatibilidade.routes";
import estatisticasRoutes from "./estatisticas.routes";
import arquivoRoutes from "./arquivo.routes";
import empresaRoutes from "./empresa.routes";
import notificacoesRoutes from "./notificacoes.routes";

const router = Router();

// Mapeamento das rotas
router.use("/tipos", tiposRoutes);
router.use("/subtipos", subtiposRoutes);
router.use("/barreiras", barreirasRoutes);
router.use("/acessibilidades", acessibilidadesRoutes);
router.use("/auth", authRoutes);
router.use("/vinculos", vinculosRoutes);
router.use("/candidato-subtipo", candidatoSubtipoRoutes);
router.use("/candidaturas", candidaturasRoutes);
router.use("/endereco", enderecoRoutes);
router.use("/experiencias", experienciasRoutes);
router.use("/formacao", formacaoRoutes);

router.use("/vagas", vagasRoutes);
router.use("/candidato", candidatoRoutes);
router.use("/compatibilidade", compatibilidadeRoutes);
router.use("/estatisticas", estatisticasRoutes);
router.use("/arquivos", arquivoRoutes);
router.use("/empresa", empresaRoutes);
router.use("/notificacoes", notificacoesRoutes);

export default router;
