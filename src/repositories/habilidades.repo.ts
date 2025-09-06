import { prisma } from "./prisma";

export const HabilidadesRepository = {
  async findAll() {
    return await prisma.habilidades.findMany({
      include: { candidato: true },
    });
  },

  async findById(id: number) {
    return await prisma.habilidades.findUnique({
      where: { id },
      include: { candidato: true },
    });
  },

  async findByCandidato(candidatoId: number) {
    return await prisma.habilidades.findMany({
      where: { candidatoId },
    });
  },

  async create(habilidade: any) {
    return await prisma.habilidades.create({
      data: habilidade,
    });
  },

  async update(id: number, nome: string) {
    return await prisma.habilidades.update({
      where: { id },
      data: { nome },
    });
  },

  async delete(id: number) {
    return await prisma.habilidades.delete({
      where: { id },
    });
  },
};