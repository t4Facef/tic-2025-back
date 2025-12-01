import { prisma } from "./prisma";

interface VagasFilters {
  titulo?: string;
  localizacao?: string;
  tipoContrato?: string | string[];
  tipoTrabalho?: string | string[];
  nivelTrabalho?: string;
  turno?: string;
  empresaId?: string;
  habilidades?: string;
  apoios?: string;
  setor?: string;
  status?: boolean;
  recomendadas?: boolean;
  candidatoId?: string;
  inscrito?: boolean;
}

interface VagasSearchFilters extends VagasFilters {
  habilidadesList?: string[];
  apoiosList?: string[];
  salarioMin?: number;
  salarioMax?: number;
  dataInicioMin?: string;
  dataInicioMax?: string;
  status?: boolean;
  recomendadas?: boolean;
  candidatoId?: string;
  inscrito?: boolean;
  page?: number;
}

export const VagasRepository = {
  async findAll(filters?: VagasFilters) {
    const where: any = {};

    if (filters) {
      if (filters.titulo) {
        where.titulo = { contains: filters.titulo, mode: 'insensitive' };
      }
      if (filters.localizacao) {
        where.localizacao = { contains: filters.localizacao, mode: 'insensitive' };
      }
      if (filters.tipoContrato) {
        if (Array.isArray(filters.tipoContrato)) {
          where.tipoContrato = { in: filters.tipoContrato };
        } else {
          where.tipoContrato = filters.tipoContrato;
        }
      }
      if (filters.tipoTrabalho) {
        if (Array.isArray(filters.tipoTrabalho)) {
          where.tipoTrabalho = { in: filters.tipoTrabalho };
        } else {
          where.tipoTrabalho = filters.tipoTrabalho;
        }
      }
      if (filters.nivelTrabalho) {
        where.nivelTrabalho = filters.nivelTrabalho;
      }
      if (filters.turno) {
        where.turno = filters.turno;
      }
      if (filters.empresaId) {
        where.empresaId = parseInt(filters.empresaId);
      }
      if (filters.habilidades) {
        where.habilidades = { has: filters.habilidades };
      }
      if (filters.apoios) {
        where.apoios = { has: filters.apoios };
      }
      if (filters.setor) {
        where.setor = { contains: filters.setor, mode: 'insensitive' };
      }
      if (filters.status === true) {
        where.status = 'DISPONIVEL';
      }
    }

    let vagas = await prisma.vagas.findMany({
      where,
      include: { 
        empresa: true,
        candidaturas: {
          select: { id: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Filtro de vagas inscritas - ordenadas pela data de candidatura mais recente
    if (filters?.inscrito && filters?.candidatoId) {
      const candidatoId = parseInt(filters.candidatoId);
      
      const candidaturas = await prisma.candidaturas.findMany({
        where: { candidatoId },
        include: {
          vaga: {
            include: { 
              empresa: true,
              candidaturas: {
                select: { id: true }
              }
            }
          }
        },
        orderBy: { dataCandidatura: 'desc' },
        take: 3
      });
      
      return candidaturas.map(c => c.vaga);
    }

    // Filtro de recomendação com candidatoId
    if (filters?.candidatoId) {
      const { CompatibilidadeService } = require('../services/compatibilidade.service');
      const candidatoId = parseInt(filters.candidatoId);
      
      const vagasComCompatibilidade: any[] = [];
      for (const vaga of vagas) {
        try {
          const compatibilidade = await CompatibilidadeService.calcularCompatibilidade(candidatoId, vaga.id);
          const { compatibilidade: _, ...vagaSemCompatibilidadeFixa } = vaga;
          vagasComCompatibilidade.push({
            ...vagaSemCompatibilidadeFixa,
            compatibilidadeCalculada: compatibilidade,
            compatibilidadeFormatada: `${(compatibilidade * 100).toFixed(1)}%`
          });
        } catch (error) {
          const { compatibilidade: _, ...vagaSemCompatibilidadeFixa } = vaga;
          vagasComCompatibilidade.push({
            ...vagaSemCompatibilidadeFixa,
            compatibilidadeCalculada: 0,
            compatibilidadeFormatada: "0.0%"
          });
        }
      }
      
      // Se for filtro de recomendadas, filtrar apenas >= 70%
      if (filters.recomendadas === true) {
        return vagasComCompatibilidade
          .filter(vaga => vaga.compatibilidadeCalculada >= 0.7)
          .sort((a, b) => b.compatibilidadeCalculada - a.compatibilidadeCalculada)
          .slice(0, 3);
      } else {
        return vagasComCompatibilidade.sort((a, b) => {
          // Primeiro por compatibilidade, depois por data de criação
          const compatDiff = b.compatibilidadeCalculada - a.compatibilidadeCalculada;
          if (compatDiff !== 0) return compatDiff;
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
      }
    }

    return vagas;
  },

  async findById(id: number) {
    return await prisma.vagas.findUnique({
      where: { id },
      include: { 
        empresa: true, 
        candidaturas: {
          include: {
            candidato: {
              select: {
                nome: true,
                email: true,
                telefones: true,
                endereco: true,
                subtipos: true               
              }
            }
          }
        }
      },
    });
  },

  async findByEmpresa(empresaId: number, status?: string) {
    const where: any = { empresaId };
    if (status) {
      where.status = status;
    }
    
    return await prisma.vagas.findMany({
      where,
      include: { empresa: true },
      orderBy: { createdAt: 'desc' },
      take: 3
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

  async search(filters: VagasSearchFilters) {
    const where: any = {};

    if (filters.titulo) {
      where.titulo = { contains: filters.titulo, mode: 'insensitive' };
    }
    if (filters.localizacao) {
      where.localizacao = { contains: filters.localizacao, mode: 'insensitive' };
    }
    if (filters.tipoContrato) {
      if (Array.isArray(filters.tipoContrato)) {
        where.tipoContrato = { in: filters.tipoContrato };
      } else {
        where.tipoContrato = filters.tipoContrato;
      }
    }
    if (filters.tipoTrabalho) {
      if (Array.isArray(filters.tipoTrabalho)) {
        where.tipoTrabalho = { in: filters.tipoTrabalho };
      } else {
        where.tipoTrabalho = filters.tipoTrabalho;
      }
    }
    if (filters.nivelTrabalho) {
      where.nivelTrabalho = filters.nivelTrabalho;
    }
    if (filters.turno) {
      where.turno = filters.turno;
    }
    if (filters.empresaId) {
      where.empresaId = parseInt(filters.empresaId);
    }
    if (filters.habilidadesList && filters.habilidadesList.length > 0) {
      where.habilidades = { hasSome: filters.habilidadesList };
    }
    if (filters.apoiosList && filters.apoiosList.length > 0) {
      where.apoios = { hasSome: filters.apoiosList };
    }
    if (filters.setor) {
      where.setor = { contains: filters.setor, mode: 'insensitive' };
    }
    if (filters.dataInicioMin) {
      where.dataInicio = { ...where.dataInicio, gte: new Date(filters.dataInicioMin) };
    }
    if (filters.dataInicioMax) {
      where.dataInicio = { ...where.dataInicio, lte: new Date(filters.dataInicioMax) };
    }
    if (filters.status === true) {
      where.status = 'DISPONIVEL';
    }

    // Configuração de paginação
    const page = filters.page;
    const limit = 8;
    
    // Para filtros especiais (recomendadas/compatibilidade), buscar mais dados inicialmente
    const needsCompatibilityCalc = filters.candidatoId && !filters.inscrito;
    const initialSkip = needsCompatibilityCalc ? 0 : (page ? (page - 1) * limit : undefined);
    const initialTake = needsCompatibilityCalc ? undefined : (page ? limit : undefined);
    
    // Contar total se tem paginação
    const total = page ? await prisma.vagas.count({ where }) : undefined;
    const totalPages = page && total ? Math.ceil(total / limit) : undefined;

    // Filtro de vagas inscritas
    if (filters.inscrito && filters.candidatoId) {
      const candidatoId = parseInt(filters.candidatoId);
      const skip = page ? (page - 1) * limit : undefined;
      const take = page ? limit : undefined;
      
      const vagas = await prisma.vagas.findMany({
        where: {
          ...where,
          candidaturas: {
            some: {
              candidatoId: candidatoId
            }
          }
        },
        include: { 
          empresa: true,
          candidaturas: {
            select: { id: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take
      });
      
      if (page) {
        return {
          vagas,
          pagination: {
            currentPage: page,
            totalPages: totalPages!,
            totalItems: total!,
            itemsPerPage: limit
          }
        };
      }
      
      return vagas;
    }

    // Se tem candidatoId, buscar TODAS as vagas para calcular compatibilidade primeiro
    const skip = page && !filters.candidatoId ? (page - 1) * limit : initialSkip;
    const take = page && !filters.candidatoId ? limit : (filters.candidatoId ? undefined : initialTake);
    
    let vagas = await prisma.vagas.findMany({
      where,
      include: { 
        empresa: true,
        candidaturas: {
          select: { id: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take
    });

    // Calcular compatibilidade se há candidatoId
    if (filters.candidatoId) {
      const { CompatibilidadeService } = require('../services/compatibilidade.service');
      const candidatoId = parseInt(filters.candidatoId!);
      
      const vagasComCompatibilidade: any[] = [];
      for (const vaga of vagas) {
        try {
          const compatibilidade = await CompatibilidadeService.calcularCompatibilidade(candidatoId, vaga.id);
          const { compatibilidade: _, ...vagaSemCompatibilidadeFixa } = vaga;
          vagasComCompatibilidade.push({
            ...vagaSemCompatibilidadeFixa,
            compatibilidadeCalculada: compatibilidade,
            compatibilidadeFormatada: `${(compatibilidade * 100).toFixed(1)}%`
          });
        } catch (error) {
          const { compatibilidade: _, ...vagaSemCompatibilidadeFixa } = vaga;
          vagasComCompatibilidade.push({
            ...vagaSemCompatibilidadeFixa,
            compatibilidadeCalculada: 0,
            compatibilidadeFormatada: "0.0%"
          });
        }
      }
      
      // Se for filtro de recomendadas, filtrar apenas >= 70%
      if (filters.recomendadas === true) {
        vagas = vagasComCompatibilidade
          .filter(vaga => vaga.compatibilidadeCalculada >= 0.7)
          .sort((a, b) => b.compatibilidadeCalculada - a.compatibilidadeCalculada);
      } else {
        vagas = vagasComCompatibilidade.sort((a, b) => {
          // Primeiro por compatibilidade, depois por data de criação
          const compatDiff = b.compatibilidadeCalculada - a.compatibilidadeCalculada;
          if (compatDiff !== 0) return compatDiff;
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
      }
      
      // Aplicar paginação depois do cálculo de compatibilidade se necessário
      if (page) {
        const totalItemsAfterFilter = vagas.length;
        const totalPagesAfterFilter = Math.ceil(totalItemsAfterFilter / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        vagas = vagas.slice(startIndex, endIndex);
        
        // Só retornar objeto de paginação se há mais de 1 página
        if (totalPagesAfterFilter > 1) {
          return {
            vagas,
            pagination: {
              currentPage: page,
              totalPages: totalPagesAfterFilter,
              totalItems: totalItemsAfterFilter,
              itemsPerPage: limit
            }
          };
        } else {
          return vagas;
        }
      }
    }

    // Retornar com paginação se solicitado (para casos sem candidatoId)
    if (page && !filters.candidatoId) {
      // Só retornar objeto de paginação se há mais de 1 página
      if (totalPages! > 1) {
        return {
          vagas,
          pagination: {
            currentPage: page,
            totalPages: totalPages!,
            totalItems: total!,
            itemsPerPage: limit
          }
        };
      } else {
        return vagas;
      }
    }

    return vagas;
  },

  async getTopEmpresasByVagas() {
    try {
      const empresasComVagas = await prisma.empresa.findMany({
        select: {
          id: true,
          _count: {
            select: {
              vagas: {
                where: {
                  status: 'DISPONIVEL'
                }
              }
            }
          }
        },
        orderBy: {
          vagas: {
            _count: 'desc'
          }
        },
        take: 10
      });

      if (empresasComVagas.length === 0) {
        return [1, 2, 3, 4, 5, 6, 7];
      }

      const result = [];
      let index = 0;
      
      for (let i = 0; i < 7; i++) {
        result.push(empresasComVagas[index].id);
        index = (index + 1) % empresasComVagas.length;
      }
      
      return result;
    } catch (error) {
      console.error('Erro ao buscar top empresas:', error);
      return [1, 2, 3, 4, 5, 6, 7];
    }
  },

  async getVagasPopulares() {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const amanha = new Date(hoje);
    amanha.setDate(amanha.getDate() + 1);

    return await prisma.vagas.findMany({
      where: {
        status: 'DISPONIVEL'
      },
      include: {
        empresa: true,
        candidaturas: {
          select: { id: true }
        },
        _count: {
          select: {
            candidaturas: {
              where: {
                dataCandidatura: {
                  gte: hoje,
                  lt: amanha
                }
              }
            }
          }
        }
      },
      orderBy: {
        candidaturas: {
          _count: 'desc'
        }
      },
      take: 3
    });
  }
};