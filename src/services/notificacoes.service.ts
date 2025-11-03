import { prisma } from "../repositories/prisma";

interface CreateNotificacaoData {
  titulo: string;
  conteudo: string;
  candidatoIds?: number[];
  empresaIds?: number[];
  remetenteEmpresaId?: number;
}

export const NotificacoesService = {
  async create(data: CreateNotificacaoData) {
    const { titulo, conteudo, candidatoIds = [], empresaIds = [], remetenteEmpresaId } = data;

    const notificacao = await prisma.notificacao.create({
      data: {
        titulo,
        conteudo,
        remetenteEmpresaId,
        candidatos: {
          create: candidatoIds.map(candidatoId => ({ candidatoId }))
        },
        empresas: {
          create: empresaIds.map(empresaId => ({ empresaId }))
        }
      },
      include: {
        candidatos: true,
        empresas: true,
        remetenteEmpresa: {
          select: { razaoSocial: true }
        }
      }
    });

    return notificacao;
  },

  async getNotificacoesCandidato(candidatoId: number) {
    return await prisma.notificacaoCandidato.findMany({
      where: { candidatoId },
      include: { 
        notificacao: {
          include: {
            remetenteEmpresa: {
              select: { razaoSocial: true }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 3
    });
  },

  async getNotificacoesEmpresa(empresaId: number) {
    return await prisma.notificacaoEmpresa.findMany({
      where: { empresaId },
      include: { 
        notificacao: {
          include: {
            remetenteEmpresa: {
              select: { razaoSocial: true }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 3
    });
  },

  async getAllNotificacoesCandidato(candidatoId: number) {
    return await prisma.notificacaoCandidato.findMany({
      where: { candidatoId },
      include: { 
        notificacao: {
          include: {
            remetenteEmpresa: {
              select: { razaoSocial: true }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  },

  async getAllNotificacoesEmpresa(empresaId: number) {
    return await prisma.notificacaoEmpresa.findMany({
      where: { empresaId },
      include: { 
        notificacao: {
          include: {
            remetenteEmpresa: {
              select: { razaoSocial: true }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  },

  async marcarComoLidaCandidato(notificacaoId: number, candidatoId: number) {
    return await prisma.notificacaoCandidato.update({
      where: {
        notificacaoId_candidatoId: {
          notificacaoId,
          candidatoId
        }
      },
      data: { lida: true }
    });
  },

  async marcarComoLidaEmpresa(notificacaoId: number, empresaId: number) {
    return await prisma.notificacaoEmpresa.update({
      where: {
        notificacaoId_empresaId: {
          notificacaoId,
          empresaId
        }
      },
      data: { lida: true }
    });
  }
};