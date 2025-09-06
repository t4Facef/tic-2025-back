import { prisma } from "./prisma";

export const VagasRepository = {
  async findAll() {
    return await prisma.jobPosition.findMany({
      include: { empresa: true },
    });
  },

  async findById(id: number) {
    return await prisma.jobPosition.findUnique({
      where: { id },
      include: { empresa: true, candidaturas: true },
    });
  },

  async findByEmpresa(empresaId: number) {
    return await prisma.jobPosition.findMany({
      where: { empresaId },
      include: { candidaturas: true },
    });
  },

  async create(vaga: any) {
    return await prisma.jobPosition.create({
      data: vaga,
    });
  },

  async update(id: number, vaga: any) {
    return await prisma.jobPosition.update({
      where: { id },
      data: vaga,
    });
  },

  async delete(id: number) {
    return await prisma.jobPosition.delete({
      where: { id },
    });
  },
};