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
  recomendadas?: boolean;
}

interface VagasSearchFilters extends VagasFilters {
  habilidadesList?: string[];
  apoiosList?: string[];
  salarioMin?: number;
  salarioMax?: number;
  dataInicioMin?: string;
  dataInicioMax?: string;
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
    }

    return await prisma.vagas.findMany({
      where,
      include: { empresa: true },
      orderBy: { createdAt: 'desc' }
    });
  },

  async findById(id: number) {
    return await prisma.vagas.findUnique({
      where: { id },
      include: { empresa: true, candidaturas: true },
    });
  },

  async findByEmpresa(empresaId: number) {
    return await prisma.vagas.findMany({
      where: { empresaId },
      include: { candidaturas: true },
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
    if (filters.dataInicioMin) {
      where.dataInicio = { ...where.dataInicio, gte: new Date(filters.dataInicioMin) };
    }
    if (filters.dataInicioMax) {
      where.dataInicio = { ...where.dataInicio, lte: new Date(filters.dataInicioMax) };
    }

    return await prisma.vagas.findMany({
      where,
      include: { 
        empresa: true,
        candidaturas: {
          select: { id: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  },
};