import { prisma } from "./prisma";

export const VagasRepository = {
  async findAll() {
    return await prisma.vagas.findMany({
      include: { empresa: true },
    });
  },

  async findById(id: number) {
    return await prisma.vagas.findUnique({
      where: { id },
      include: { empresa: true, candidaturas: true },
    });
  },

  async findByEmpresa(empresaId: number) {
    return await prisma.vagas.findMany({
      where: { empresaId },
      include: { candidaturas: true },
    });
  },

  async create(vaga: any) {
    return await prisma.vagas.create({
      data: vaga,
    });
  },

  async update(id: number, vaga: any) {
    return await prisma.vagas.update({
      where: { id },
      data: vaga,
    });
  },

  async delete(id: number) {
    return await prisma.vagas.delete({
      where: { id },
    });
  },
};