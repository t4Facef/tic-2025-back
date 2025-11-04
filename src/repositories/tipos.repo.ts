import { prisma } from "./prisma";

// Repositório responsável pela tabela tipoDeficiencia
export const TiposRepo = {
  // Lista todos os tipos, ordenados por ID
  list() {
    return prisma.tipoDeficiencia.findMany({ orderBy: { id: "asc" } });
  },

  // Lista tipos já trazendo os subtipos relacionados
  listWithSubtipos() {
    return prisma.tipoDeficiencia.findMany({
      orderBy: { id: "asc" },
      include: { subtipos: { orderBy: { id: "asc" } } },
    });
  },

  // Cria um novo tipo
  create(nome: string) {
    return prisma.tipoDeficiencia.create({ data: { nome } });
  },

  // Busca tipo pelo ID
  findById(id: number) {
    return prisma.tipoDeficiencia.findUnique({ where: { id } });
  },

  // Deleta um tipo
  delete(id: number) {
    return prisma.tipoDeficiencia.delete({ where: { id } });
  },
};
