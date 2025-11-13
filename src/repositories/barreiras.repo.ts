import { prisma } from "./prisma";

// Repositório da tabela barreira
export const BarreirasRepo = {
  // Lista todas as barreiras
  list() {
    return prisma.barreira.findMany({ orderBy: { id: "asc" } });
  },

  // Cria uma nova barreira
  create(descricao: string) {
    return prisma.barreira.create({ data: { descricao } });
  },

  // Busca barreiras por subtipo
  findBySubtipo(subtipoId: number) {
    return prisma.barreira.findMany({
      where: {
        subtipos: {
          some: { subtipoId }
        }
      },
      include: {
        acessibilidades: {
          include: {
            acessibilidade: true
          }
        }
      },
      orderBy: { id: "asc" }
    });
  },

  // Busca barreira por ID
  findById(id: number) {
    return prisma.barreira.findUnique({ where: { id } });
  },

  // Lista barreira e suas acessibilidades associadas
  listAcessibilidades(id: number) {
    return prisma.barreira.findUnique({
      where: { id },
      include: {
        acessibilidades: {
          include: { acessibilidade: true },
          orderBy: { acessibilidadeId: "asc" },
        },
      },
    });
  },

  // Cria barreira e vincula a subtipo
  async createAndVincular(descricao: string, subtipoId: number) {
    return prisma.barreira.create({
      data: {
        descricao,
        subtipos: {
          create: { subtipoId }
        }
      },
      include: {
        subtipos: {
          include: { subtipo: true }
        }
      }
    });
  },

  // Atualiza uma barreira
  update(id: number, descricao: string) {
    return prisma.barreira.update({
      where: { id },
      data: { descricao }
    });
  },

  // Deleta uma barreira
  delete(id: number) {
    return prisma.barreira.delete({ where: { id } });
  },

  // Busca barreiras por descrição (busca fuzzy/inteligente)
  searchByDescricao(termo: string) {
    if (!termo.trim()) return this.list();
    
    return prisma.barreira.findMany({
      where: {
        descricao: {
          contains: termo.trim(),
          mode: 'insensitive'
        }
      },
      orderBy: { descricao: "asc" }
    });
  },

  // Verifica se uma barreira já existe (case insensitive)
  async findByDescricaoExact(descricao: string) {
    return prisma.barreira.findFirst({
      where: {
        descricao: {
          equals: descricao.trim(),
          mode: 'insensitive'
        }
      }
    });
  },

  // Cria barreira apenas se não existir
  async findOrCreate(descricao: string) {
    const descricaoNormalizada = descricao.trim();
    
    // Primeiro verifica se já existe
    const existente = await this.findByDescricaoExact(descricaoNormalizada);
    if (existente) {
      return { ...existente, wasCreated: false };
    }
    
    // Se não existe, cria nova
    const nova = await this.create(descricaoNormalizada);
    return { ...nova, wasCreated: true };
  },

  // Busca ou cria barreira e vincula a subtipo (inteligente)
  async findOrCreateAndVincular(descricao: string, subtipoId: number) {
    const descricaoNormalizada = descricao.trim();
    
    // Primeiro busca ou cria a barreira
    const barreiraResult = await this.findOrCreate(descricaoNormalizada);
    const barreira = barreiraResult;
    
    // Verifica se já existe a relação subtipo-barreira
    const existeRelacao = await prisma.subtipoBarreira.findUnique({
      where: {
        subtipoId_barreiraId: {
          subtipoId,
          barreiraId: barreira.id
        }
      }
    });
    
    if (existeRelacao) {
      // Se a relação já existe, retorna a barreira com as relações
      return prisma.barreira.findUnique({
        where: { id: barreira.id },
        include: {
          subtipos: {
            include: { subtipo: true }
          }
        }
      });
    }
    
    // Se não existe a relação, cria
    await prisma.subtipoBarreira.create({
      data: {
        subtipoId,
        barreiraId: barreira.id
      }
    });
    
    // Retorna a barreira com as relações
    return prisma.barreira.findUnique({
      where: { id: barreira.id },
      include: {
        subtipos: {
          include: { subtipo: true }
        }
      }
    });
  },
};
