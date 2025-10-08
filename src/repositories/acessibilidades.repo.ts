import { prisma } from "./prisma";

// Repositório da tabela acessibilidade
export const AcessRepo = {
  // Lista todas as acessibilidades
  list() {
    return prisma.acessibilidade.findMany({ 
      orderBy: { id: "asc" },
      include: { 
        EmpresaAcessibilidade: {
          include: { empresa: true }
        }
      }
    });
  },

  listNames(){
    return prisma.acessibilidade.findMany({
      select: {
        id: true,
        nome: true
      },
      orderBy: { nome: "asc" }
    })
  },

  // Cria uma nova acessibilidade padrão
  create(nome: string) {
    return prisma.acessibilidade.create({ 
      data: { nome }
    });
  },

  // Busca acessibilidade por ID
  findById(id: number) {
    return prisma.acessibilidade.findUnique({ 
      where: { id },
      include: { 
        EmpresaAcessibilidade: {
          include: { empresa: true }
        }
      }
    });
  },

  // Busca acessibilidades por empresa
  findByEmpresa(empresaId: number) {
    return prisma.acessibilidade.findMany({
      where: { 
        EmpresaAcessibilidade: {
          some: { empresaId }
        }
      },
      orderBy: { id: "asc" }
    });
  },
};
