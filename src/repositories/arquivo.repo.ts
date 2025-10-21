import { prisma } from "./prisma";

export const ArquivoRepository = {
  async create(data: any) {
    return await prisma.arquivo.create({ data });
  },

  async findById(id: number) {
    return await prisma.arquivo.findUnique({
      where: { id },
      include: { candidato: true, empresa: true },
    });
  },

  async findByCandidato(candidatoId: number) {
    return await prisma.arquivo.findMany({
      where: { candidatoId },
    });
  },

  async findByEmpresa(empresaId: number) {
    return await prisma.arquivo.findMany({
      where: { empresaId },
    });
  },

  async delete(id: number) {
    return await prisma.arquivo.delete({ where: { id } });
  },
};
