import { prisma } from "./prisma";

export const ExperienciasRepository = {
  async findAll() {
    return await prisma.experiencias.findMany({
      include: { candidato: true },
    });
  },

  async findById(id: number) {
    return await prisma.experiencias.findUnique({
      where: { id },
      include: { candidato: true },
    });
  },

  async findByCandidato(candidatoId: number) {
    return await prisma.experiencias.findMany({
      where: { candidatoId },
    });
  },

  async create(experiencia: any) {
    return await prisma.experiencias.create({
      data: experiencia,
    });
  },

  async update(id: number, experiencia: any) {
    return await prisma.experiencias.update({
      where: { id },
      data: experiencia,
    });
  },

  async delete(id: number) {
    return await prisma.experiencias.delete({
      where: { id },
    });
  },
};