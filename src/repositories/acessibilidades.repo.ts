import { prisma } from "./prisma";

// Repositório da tabela acessibilidade
export const AcessRepo = {
  // Lista todas as acessibilidades
  list() {
    return prisma.acessibilidade.findMany({ 
      orderBy: { id: "asc" },
      include: { empresa: true }
    });
  },

  // Cria uma nova acessibilidade
  create(nome: string, empresaId: number) {
    return prisma.acessibilidade.create({ 
      data: { nome, empresaId },
      include: { empresa: true }
    });
  },

  // Busca acessibilidade por ID
  findById(id: number) {
    return prisma.acessibilidade.findUnique({ 
      where: { id },
      include: { empresa: true }
    });
  },

  // Busca acessibilidades por empresa
  findByEmpresa(empresaId: number) {
    return prisma.acessibilidade.findMany({
      where: { empresaId },
      orderBy: { id: "asc" }
    });
  },
};
