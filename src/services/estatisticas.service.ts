import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const EstatisticasService = {
  async obterEstatisticas() {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const amanha = new Date(hoje);
    amanha.setDate(hoje.getDate() + 1);

    // Candidaturas realizadas hoje
    const candidaturasHoje = await prisma.candidaturas.count({
      where: {
        dataCandidatura: {
          gte: hoje,
          lt: amanha
        }
      }
    });

    // Candidatos ativos (cadastrados)
    const candidatosAtivos = await prisma.candidato.count();

    // Vagas abertas no momento
    const vagasAbertas = await prisma.vagas.count({
      where: {
        status: "DISPONIVEL"
      }
    });

    return {
      candidaturasHoje,
      candidatosAtivos,
      vagasAbertas
    };
  }
};