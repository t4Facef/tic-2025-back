import { prisma } from "./prisma";

export const CandidaturasRepository = {
  async findAll() {
    return await prisma.application.findMany({
      include: { candidato: true, vaga: true },
    });
  },

  async findByCandidato(candidatoId: number) {
    return await prisma.application.findMany({
      where: { candidatoId },
      include: { vaga: { include: { empresa: true } } },
    });
  },

  async findByVaga(vagaId: number) {
    return await prisma.application.findMany({
      where: { vagaId },
      include: { candidato: true },
    });
  },

  async create(candidatoId: number, vagaId: number) {
    return await prisma.application.create({
      data: { candidatoId, vagaId },
    });
  },

  async updateStatus(id: number, status: string) {
    return await prisma.application.update({
      where: { id },
      data: { status },
    });
  },

  async delete(id: number) {
    return await prisma.application.delete({
      where: { id },
    });
  },
};