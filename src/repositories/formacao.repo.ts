import { prisma } from "./prisma";

export const FormacaoRepository = {
  async findAll() {
    return await prisma.formacaoOuCurso.findMany({
      include: { candidato: true },
    });
  },

  async findById(id: number) {
    return await prisma.formacaoOuCurso.findUnique({
      where: { id },
      include: { candidato: true },
    });
  },

  async findByCandidato(candidatoId: number) {
    return await prisma.formacaoOuCurso.findMany({
      where: { candidatoId },
    });
  },

  async create(formacao: any) {
    return await prisma.formacaoOuCurso.create({
      data: formacao,
    });
  },

  async update(id: number, formacao: any) {
    return await prisma.formacaoOuCurso.update({
      where: { id },
      data: formacao,
    });
  },

  async delete(id: number) {
    return await prisma.formacaoOuCurso.delete({
      where: { id },
    });
  },
};