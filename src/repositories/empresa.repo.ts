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

  async update(id: number, data: any, acessibilidades?: number[], endereco?: any) {
    const result = await prisma.$transaction(async (tx) => {
      // Se endereço foi fornecido, atualizar ou criar
      let enderecoId = undefined;
      if (endereco) {
        // Buscar empresa atual para verificar se já tem endereço
        const empresaAtual = await tx.empresa.findUnique({
          where: { id },
          select: { enderecoId: true }
        });

        if (empresaAtual?.enderecoId) {
          // Atualizar endereço existente
          await tx.endereco.update({
            where: { id: empresaAtual.enderecoId },
            data: endereco
          });
          enderecoId = empresaAtual.enderecoId;
        } else {
          // Criar novo endereço
          const novoEndereco = await tx.endereco.create({
            data: endereco
          });
          enderecoId = novoEndereco.id;
        }
      }

      // Atualiza dados da empresa (incluindo enderecoId se necessário)
      const empresaData = enderecoId ? { ...data, enderecoId } : data;
      const empresa = await tx.empresa.update({
        where: { id },
        data: empresaData
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

      // Buscar empresa atualizada com todas as relações
      const empresaCompleta = await tx.empresa.findUnique({
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

      return empresaCompleta;
    });

    return result;
  }
};