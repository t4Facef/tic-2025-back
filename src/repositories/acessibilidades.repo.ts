import { prisma } from "./prisma";

// Repositório da tabela acessibilidade
export const AcessRepo = {
  // Lista todas as acessibilidades
  list() {
    return prisma.acessibilidade.findMany({ orderBy: { id: "asc" } });
  },

  // Cria uma nova acessibilidade
  create(descricao: string) {
    return prisma.acessibilidade.create({ data: { descricao } });
  },

  // Busca acessibilidade por ID
  findById(id: number) {
    return prisma.acessibilidade.findUnique({ where: { id } });
  },
};
