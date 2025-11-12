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

  // Busca barreiras por subtipo
  findBySubtipo(subtipoId: number) {
    return prisma.barreira.findMany({
      where: {
        subtipos: {
          some: { subtipoId }
        }
      },
      include: {
        acessibilidades: {
          include: {
            acessibilidade: true
          }
        }
      },
      orderBy: { id: "asc" }
    });
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

  // Cria barreira e vincula a subtipo
  async createAndVincular(descricao: string, subtipoId: number) {
    return prisma.barreira.create({
      data: {
        descricao,
        subtipos: {
          create: { subtipoId }
        }
      },
      include: {
        subtipos: {
          include: { subtipo: true }
        }
      }
    });
  },

  // Atualiza uma barreira
  update(id: number, descricao: string) {
    return prisma.barreira.update({
      where: { id },
      data: { descricao }
    });
  },

  // Deleta uma barreira
  delete(id: number) {
    return prisma.barreira.delete({ where: { id } });
  },
};
