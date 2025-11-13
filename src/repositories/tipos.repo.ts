import { prisma } from "./prisma";

// Repositório responsável pela tabela tipoDeficiencia
export const TiposRepo = {
  // Lista todos os tipos, ordenados por ID
  list() {
    return prisma.tipoDeficiencia.findMany({ orderBy: { id: "asc" } });
  },

  // Lista tipos já trazendo os subtipos relacionados
  listWithSubtipos() {
    return prisma.tipoDeficiencia.findMany({
      orderBy: { id: "asc" },
      include: { subtipos: { orderBy: { id: "asc" } } },
    });
  },

  // Cria um novo tipo
  create(nome: string) {
    return prisma.tipoDeficiencia.create({ data: { nome } });
  },

  // Atualiza um tipo
  update(id: number, nome: string) {
    return prisma.tipoDeficiencia.update({
      where: { id },
      data: { nome }
    });
  },

  // Busca tipo pelo ID
  findById(id: number) {
    return prisma.tipoDeficiencia.findUnique({ where: { id } });
  },

  // Deleta um tipo
  delete(id: number) {
    return prisma.tipoDeficiencia.delete({ where: { id } });
  },

  // Deleta um tipo em cascata
  async deleteCascade(id: number) {
    const result = {
      deleted: [] as string[],
      disassociated: [] as string[],
      summary: ''
    };

    return prisma.$transaction(async (tx) => {
      // 1. Buscar todos os subtipos deste tipo
      const subtipos = await tx.subtipoDeficiencia.findMany({
        where: { tipoId: id },
        include: {
          barreiras: {
            include: {
              barreira: {
                include: {
                  subtipos: true,
                  acessibilidades: true
                }
              }
            }
          }
        }
      });

      // 2. Para cada subtipo, processar suas barreiras
      for (const subtipo of subtipos) {
        for (const subtipoBarreira of subtipo.barreiras) {
          const barreira = subtipoBarreira.barreira;
          
          // Verificar se barreira está vinculada a outros subtipos
          const outrosSubtipos = barreira.subtipos.filter((sb: any) => sb.subtipoId !== subtipo.id);
          
          if (outrosSubtipos.length === 0) {
            // Barreira só está neste subtipo - pode ser excluída
            
            // Primeiro, desassociar acessibilidades
            await tx.barreiraAcessibilidade.deleteMany({
              where: { barreiraId: barreira.id }
            });
            
            // Desassociar candidatos
            await tx.candidatoBarreira.deleteMany({
              where: { barreiraId: barreira.id }
            });
            
            // Excluir barreira
            await tx.barreira.delete({
              where: { id: barreira.id }
            });
            
            result.deleted.push(`Barreira: ${barreira.descricao}`);
          } else {
            // Barreira está em outros subtipos - apenas desassociar
            await tx.subtipoBarreira.delete({
              where: {
                subtipoId_barreiraId: {
                  subtipoId: subtipo.id,
                  barreiraId: barreira.id
                }
              }
            });
            
            result.disassociated.push(`Barreira: ${barreira.descricao} (mantida para outros subtipos)`);
          }
        }
        
        // Excluir subtipo
        await tx.subtipoDeficiencia.delete({
          where: { id: subtipo.id }
        });
        
        result.deleted.push(`Subtipo: ${subtipo.nome}`);
      }

      // 3. Excluir o tipo
      await tx.tipoDeficiencia.delete({
        where: { id }
      });
      
      result.deleted.push(`Tipo de deficiência removido`);
      result.summary = `Exclusão em cascata concluída: ${result.deleted.length} itens excluídos, ${result.disassociated.length} desassociados`;
      
      return result;
    });
  },
};
