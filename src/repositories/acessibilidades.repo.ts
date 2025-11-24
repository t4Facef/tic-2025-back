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
        },
        barreiras: {
          include: { barreira: true }
        }
      }
    });
  },

  listNames(){
    return prisma.acessibilidade.findMany({
      select: {
        nome: true
      },
      orderBy: { nome: "asc" }
    }).then(result => result.map(item => item.nome))
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
        },
        barreiras: {
          include: { barreira: true }
        },
        VagaAcessibilidade: {
          include: { vaga: true }
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

  // Busca acessibilidades por barreira
  findByBarreira(barreiraId: number) {
    return prisma.acessibilidade.findMany({
      where: {
        barreiras: {
          some: { barreiraId }
        }
      },
      orderBy: { id: "asc" }
    });
  },

  // Cria acessibilidade e vincula a barreira
  async createAndVincular(nome: string, barreiraId: number) {
    // Primeiro tenta encontrar ou criar a acessibilidade
    const acessibilidade = await this.findOrCreate(nome);
    
    // Verifica se já existe a relação
    const existeRelacao = await prisma.barreiraAcessibilidade.findUnique({
      where: {
        barreiraId_acessibilidadeId: {
          barreiraId,
          acessibilidadeId: acessibilidade.id
        }
      }
    });
    
    if (existeRelacao) {
      // Se a relação já existe, retorna a acessibilidade com as relações
      return prisma.acessibilidade.findUnique({
        where: { id: acessibilidade.id },
        include: {
          barreiras: {
            include: { barreira: true }
          }
        }
      });
    }
    
    // Se não existe a relação, cria
    await prisma.barreiraAcessibilidade.create({
      data: {
        barreiraId,
        acessibilidadeId: acessibilidade.id
      }
    });
    
    // Retorna a acessibilidade com as relações
    return prisma.acessibilidade.findUnique({
      where: { id: acessibilidade.id },
      include: {
        barreiras: {
          include: { barreira: true }
        }
      }
    });
  },

  // Atualiza uma acessibilidade
  update(id: number, nome: string) {
    return prisma.acessibilidade.update({
      where: { id },
      data: { nome }
    });
  },

  // Deleta uma acessibilidade
  delete(id: number) {
    return prisma.acessibilidade.delete({ where: { id } });
  },

  // Busca acessibilidades por nome (busca fuzzy/inteligente)
  searchByName(termo: string) {
    if (!termo.trim()) return this.listNames();
    
    return prisma.acessibilidade.findMany({
      where: {
        nome: {
          contains: termo.trim(),
          mode: 'insensitive'
        }
      },
      select: {
        nome: true
      },
      orderBy: { nome: "asc" }
    }).then(result => result.map(item => item.nome));
  },

  // Verifica se uma acessibilidade já existe (case insensitive)
  async findByNameExact(nome: string) {
    return prisma.acessibilidade.findFirst({
      where: {
        nome: {
          equals: nome.trim(),
          mode: 'insensitive'
        }
      }
    });
  },

  // Cria acessibilidade apenas se não existir
  async findOrCreate(nome: string) {
    const nomeNormalizado = nome.trim();
    
    // Primeiro verifica se já existe
    const existente = await this.findByNameExact(nomeNormalizado);
    if (existente) {
      return existente;
    }
    
    // Se não existe, cria nova
    return this.create(nomeNormalizado);
  },
};
