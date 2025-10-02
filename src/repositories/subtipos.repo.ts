import { prisma } from "./prisma";

// Repositório para subtipoDeficiencia
export const SubtiposRepo = {
  // Busca subtipo pelo ID simples
  findById(id: number) {
    return prisma.subtipoDeficiencia.findUnique({ where: { id } });
  },

  // Busca detalhada (subtipo + tipo + barreiras + acessibilidades)
  findDeepById(id: number) {
    return prisma.subtipoDeficiencia.findUnique({
      where: { id },
      include: {
        tipo: true, // inclui o tipo pai
        barreiras: {
          include: {
            barreira: {
              include: {
                acessibilidades: {
                  include: { acessibilidade: true },
                  orderBy: { acessibilidadeId: "asc" },
                },
              },
            },
          },
          orderBy: { barreiraId: "asc" },
        },
      },
    });
  },

  // Cria um novo subtipo vinculado a um tipo
  create(nome: string, tipoId: number) {
    return prisma.subtipoDeficiencia.create({ data: { nome, tipoId } });
  },

  findSubtiposByTipo(tipoId: number) {
    return prisma.subtipoDeficiencia.findMany({
      where: { tipoId },
      select: {
        id: true,
        nome: true
      }
    });
  },
};
