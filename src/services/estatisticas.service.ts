import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const EstatisticasService = {
  async obterEstatisticasCandidato(candidatoId: number) {
    const hoje = new Date();
    const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    const fimMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0, 23, 59, 59);

    // Candidaturas neste mês
    const candidaturasNesteMes = await prisma.candidaturas.count({
      where: {
        candidatoId,
        dataCandidatura: {
          gte: inicioMes,
          lte: fimMes
        }
      }
    });

    // Candidaturas totais
    const candidaturasTotal = await prisma.candidaturas.count({
      where: { candidatoId }
    });

    // Candidaturas abertas (pendentes)
    const candidaturasAbertas = await prisma.candidaturas.count({
      where: {
        candidatoId,
        status: "PENDENTE"
      }
    });

    return {
      candidaturasNesteMes,
      candidaturasTotal,
      candidaturasAbertas
    };
  },

  async obterEstatisticasEmpresa(empresaId: number) {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const amanha = new Date(hoje);
    amanha.setDate(hoje.getDate() + 1);

    // Candidaturas hoje nas vagas da empresa
    const candidaturasHoje = await prisma.candidaturas.count({
      where: {
        vaga: { empresaId },
        dataCandidatura: {
          gte: hoje,
          lt: amanha
        }
      }
    });

    // Vagas abertas da empresa
    const vagasAbertas = await prisma.vagas.count({
      where: {
        empresaId,
        status: "DISPONIVEL"
      }
    });

    // Meta de contratação (baseada em funcionários PCD)
    const empresa = await prisma.empresa.findUnique({
      where: { id: empresaId },
      select: { numFunc: true, numFuncPcd: true }
    });

    const metaContratacao = empresa ? 
      Math.max(0, Math.ceil((empresa.numFunc || 0) * 0.05) - (empresa.numFuncPcd || 0)) : 0;

    return {
      candidaturasHoje,
      vagasAbertas,
      metaContratacao
    };
  }
};