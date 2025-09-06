import { prisma } from "./prisma";

export const CandidatoSubtipoRepository = {
  async findByCandidato(candidatoId: number) {
    return await prisma.candidatoSubtipo.findMany({
      where: { candidatoId },
      include: { subtipo: { include: { tipo: true } } },
    });
  },

  async findBySubtipo(subtipoId: number) {
    return await prisma.candidatoSubtipo.findMany({
      where: { subtipoId },
      include: { candidato: true },
    });
  },

  async create(candidatoId: number, subtipoId: number) {
    return await prisma.candidatoSubtipo.create({
      data: { candidatoId, subtipoId },
    });
  },

  async delete(candidatoId: number, subtipoId: number) {
    return await prisma.candidatoSubtipo.delete({
      where: { candidatoId_subtipoId: { candidatoId, subtipoId } },
    });
  },
};