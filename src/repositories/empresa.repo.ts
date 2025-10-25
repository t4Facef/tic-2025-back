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

  async update(id: number, data: any, acessibilidades?: number[]) {
    const result = await prisma.$transaction(async (tx) => {
      // Atualiza dados da empresa
      const empresa = await tx.empresa.update({
        where: { id },
        data
      });

      // Se acessibilidades foram fornecidas, atualiza relacionamentos
      if (acessibilidades !== undefined) {
        // Remove todas as acessibilidades existentes
        await tx.empresaAcessibilidade.deleteMany({
          where: { empresaId: id }
        });

        // Adiciona as novas acessibilidades
        if (acessibilidades.length > 0) {
          await tx.empresaAcessibilidade.createMany({
            data: acessibilidades.map(acessibilidadeId => ({
              empresaId: id,
              acessibilidadeId
            }))
          });
        }
      }

      return empresa;
    });

    return result;
  }
};