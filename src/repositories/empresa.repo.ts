import { prisma } from "./prisma";

export const EmpresaRepository = {
  async findById(id: number) {
    return await prisma.empresa.findUnique({
      where: { id },
      include: {
        endereco: true,
        empresaAcessibilidade: {
          include: {
            acessibilidade: true
          }
        },

      }
    });
  },

  async update(id: number, data: any) {
    return await prisma.empresa.update({
      where: { id },
      data
    });
  }
};