import { prisma } from "./prisma";

// Repositório que gerencia relações N:N
export const VinculosRepo = {
  // Vincula barreiras a um subtipo (N:N)
  vincularBarreirasSubtipo(subtipoId: number, barreiraIds: number[]) {
    return prisma.subtipoBarreira.createMany({
      data: barreiraIds.map((barreiraId) => ({ subtipoId, barreiraId })),
      skipDuplicates: true, // evita inserir duplicados
    });
  },

  // Vincula acessibilidades a uma barreira (N:N)
  vincularAcessBarreira(barreiraId: number, acessibilidadeIds: number[]) {
    return prisma.barreiraAcessibilidade.createMany({
      data: acessibilidadeIds.map((acessibilidadeId) => ({
        barreiraId,
        acessibilidadeId,
      })),
      skipDuplicates: true,
    });
  },
};
