import { prisma } from "./prisma";

export const CandidaturasRepository = {
  async findAll() {
    return await prisma.candidaturas.findMany({
      include: { candidato: true, vaga: true },
    });
  },

  async findByCandidato(candidatoId: number) {
    return await prisma.candidaturas.findMany({
      where: { candidatoId },
      include: { vaga: { include: { empresa: true } } },
    });
  },

  async findByVaga(vagaId: number) {
    return await prisma.candidaturas.findMany({
      where: { vagaId },
      include: { candidato: true },
    });
  },

  async create(candidatoId: number, vagaId: number) {
    return await prisma.candidaturas.create({
      data: { candidatoId, vagaId },
    });
  },

  async updateStatus(id: number, status: "PENDENTE" | "APROVADO" | "RECUSADO") {
    return await prisma.candidaturas.update({
      where: { id },
      data: { status },
    });
  },

  async delete(id: number) {
    return await prisma.candidaturas.delete({
      where: { id },
    });
  },
};