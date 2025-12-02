import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import tiposRoutes from "./tipos.routes";
import subtiposRoutes from "./subtipos.routes";
import barreirasRoutes from "./barreiras.routes";
import acessibilidadesRoutes from "./acessibilidades.routes";
import authRoutes from "./auth.routes";
import vinculosRoutes from "./vinculos.routes";
import candidatoSubtipoRoutes from "./candidato-subtipo.routes";
import candidatoBarreiraRoutes from "./candidato-barreira.routes";
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
import adminRoutes from "./admin.routes";
// import visitantesRoutes from "./visitantes.routes"; // DESABILITADO TEMPORARIAMENTE
import { AuthController } from "../controllers/auth.controller";

const router = Router();
const prisma = new PrismaClient();

// Mapeamento das rotas
router.use("/tipos", tiposRoutes);
router.use("/subtipos", subtiposRoutes);
router.use("/barreiras", barreirasRoutes);
router.use("/acessibilidades", acessibilidadesRoutes);
router.use("/auth", authRoutes);
router.use("/vinculos", vinculosRoutes);
router.use("/candidato-subtipo", candidatoSubtipoRoutes);
router.use("/candidato-barreira", candidatoBarreiraRoutes);
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
router.use("/admin", adminRoutes);
// router.use("/visitantes", visitantesRoutes); // DESABILITADO TEMPORARIAMENTE

// Rotas de visitantes implementadas diretamente para evitar problemas de importação
router.post("/visitantes/registrar", async (req, res) => {
  try {
    const origem = req.body?.origem || 'unknown';
    const ip = req.ip || 'unknown';
    const userAgent = req.get('User-Agent') || 'unknown';

    const visitante = await prisma.visitante.create({
      data: {
        ip: ip.length > 45 ? ip.substring(0, 45) : ip,
        userAgent: userAgent.length > 255 ? userAgent.substring(0, 255) : userAgent,
        origem: origem.length > 100 ? origem.substring(0, 100) : origem
      }
    });

    res.status(201).json({ 
      success: true, 
      id: visitante.id 
    });
  } catch (error: any) {
    console.error('Erro ao registrar visitante:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Erro interno do servidor' 
    });
  }
});

router.get("/visitantes/estatisticas", async (req, res) => {
  try {
    const totalVisitantes = await prisma.visitante.count();
    
    const dataInicio = new Date();
    dataInicio.setDate(dataInicio.getDate() - 30);
    
    const visitantesRecentes = await prisma.visitante.count({
      where: {
        createdAt: {
          gte: dataInicio
        }
      }
    });

    res.json({
      totalVisitantes,
      visitantesRecentes,
      visitantesPorDia: [],
      visitantesPorOrigem: []
    });
  } catch (error: any) {
    console.error('Erro ao obter estatísticas:', error);
    res.status(500).json({ 
      error: 'Erro ao obter estatísticas' 
    });
  }
});

export default router;
