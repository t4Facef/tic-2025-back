import { prisma } from "./prisma";

// Repositório da tabela barreira
export const BarreirasRepo = {
  // Lista todas as barreiras
  list() {
    return prisma.barreira.findMany({ orderBy: { id: "asc" } });
  },

  // Cria uma nova barreira
  create(descricao: string) {
    return prisma.barreira.create({ data: { descricao } });
  },

  // Busca barreira por ID
  findById(id: number) {
    return prisma.barreira.findUnique({ where: { id } });
  },

  // Lista barreira e suas acessibilidades associadas
  listAcessibilidades(id: number) {
    return prisma.barreira.findUnique({
      where: { id },
      include: {
        acessibilidades: {
          include: { acessibilidade: true },
          orderBy: { acessibilidadeId: "asc" },
        },
      },
    });
  },
};
