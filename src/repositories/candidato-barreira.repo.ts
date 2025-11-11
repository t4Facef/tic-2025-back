import { prisma } from "./prisma";

export const CandidatoBarreiraRepository = {
  async findByCandidato(candidatoId: number) {
    return await prisma.candidatoBarreira.findMany({
      where: { candidatoId },
      include: { 
        barreira: {
          include: {
            acessibilidades: {
              include: {
                acessibilidade: true
              }
            }
          }
        } 
      },
    });
  },

  async findByBarreira(barreiraId: number) {
    return await prisma.candidatoBarreira.findMany({
      where: { barreiraId },
      include: { candidato: true },
    });
  },

  async findByCandidatoAndBarreira(candidatoId: number, barreiraId: number) {
    return await prisma.candidatoBarreira.findUnique({
      where: { 
        candidatoId_barreiraId: { candidatoId, barreiraId } 
      },
    });
  },

  async create(candidatoId: number, barreiraId: number) {
    return await prisma.candidatoBarreira.create({
      data: { candidatoId, barreiraId },
      include: {
        barreira: {
          include: {
            acessibilidades: {
              include: {
                acessibilidade: true
              }
            }
          }
        }
      }
    });
  },

  async createMany(candidatoId: number, barreiraIds: number[]) {
    const data = barreiraIds.map(barreiraId => ({
      candidatoId,
      barreiraId
    }));

    return await prisma.candidatoBarreira.createMany({
      data,
      skipDuplicates: true
    });
  },

  async delete(candidatoId: number, barreiraId: number) {
    return await prisma.candidatoBarreira.delete({
      where: { 
        candidatoId_barreiraId: { candidatoId, barreiraId } 
      },
    });
  },

  async deleteAllByCandidato(candidatoId: number) {
    return await prisma.candidatoBarreira.deleteMany({
      where: { candidatoId },
    });
  },

  async updateByCandidato(candidatoId: number, barreiraIds: number[]) {
    // Remove todas as barreiras existentes e adiciona as novas
    await this.deleteAllByCandidato(candidatoId);
    
    if (barreiraIds.length > 0) {
      await this.createMany(candidatoId, barreiraIds);
    }

    return await this.findByCandidato(candidatoId);
  }
};