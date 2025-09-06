import { prisma } from "./prisma";

export const EnderecoRepository = {
  async findAll() {
    return await prisma.endereco.findMany();
  },

  async findById(id: number) {
    return await prisma.endereco.findUnique({
      where: { id },
    });
  },

  async create(endereco: any) {
    return await prisma.endereco.create({
      data: endereco,
    });
  },

  async update(id: number, endereco: any) {
    return await prisma.endereco.update({
      where: { id },
      data: endereco,
    });
  },

  async delete(id: number) {
    return await prisma.endereco.delete({
      where: { id },
    });
  },
};