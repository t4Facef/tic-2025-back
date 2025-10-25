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

    // Meta de contratação conforme Lei de Cotas (Lei nº 8.213/1991)
    const empresa = await prisma.empresa.findUnique({
      where: { id: empresaId },
      select: { numFunc: true, numFuncPcd: true }
    });

    let metaContratacao: any = { atual: 0, necessario: 0, percentual: 0 };
    
    if (empresa && empresa.numFunc) {
      const totalFunc = empresa.numFunc;
      const pcdAtual = empresa.numFuncPcd || 0;
      
      // Calcular percentual conforme Lei de Cotas
      let percentualLei = 0;
      if (totalFunc >= 100 && totalFunc <= 200) {
        percentualLei = 0.02; // 2%
      } else if (totalFunc >= 201 && totalFunc <= 500) {
        percentualLei = 0.03; // 3%
      } else if (totalFunc >= 501 && totalFunc <= 1000) {
        percentualLei = 0.04; // 4%
      } else if (totalFunc > 1000) {
        percentualLei = 0.05; // 5%
      }
      
      const necessario = Math.ceil(totalFunc * percentualLei);
      const faltam = Math.max(0, necessario - pcdAtual);
      
      metaContratacao = {
        atual: pcdAtual,
        necessario: necessario,
        faltam: faltam,
        percentual: Math.round(percentualLei * 100),
        totalFuncionarios: totalFunc
      };
    }

    return {
      candidaturasHoje,
      vagasAbertas,
      metaContratacao
    };
  }
};