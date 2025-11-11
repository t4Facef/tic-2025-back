import { CandidatoBarreiraRepository } from "../repositories/candidato-barreira.repo";
import { BarreirasRepo } from "../repositories/barreiras.repo";

export const CandidatoBarreiraService = {
  async findByCandidato(candidatoId: number) {
    if (!candidatoId || isNaN(candidatoId)) {
      throw Object.assign(new Error("candidatoId inválido"), { status: 400 });
    }
    
    return await CandidatoBarreiraRepository.findByCandidato(candidatoId);
  },

  async findByBarreira(barreiraId: number) {
    if (!barreiraId || isNaN(barreiraId)) {
      throw Object.assign(new Error("barreiraId inválido"), { status: 400 });
    }
    
    return await CandidatoBarreiraRepository.findByBarreira(barreiraId);
  },

  async vincular(candidatoId: number, barreiraId: number) {
    if (!candidatoId || isNaN(candidatoId)) {
      throw Object.assign(new Error("candidatoId inválido"), { status: 400 });
    }
    
    if (!barreiraId || isNaN(barreiraId)) {
      throw Object.assign(new Error("barreiraId inválido"), { status: 400 });
    }

    // Verificar se a barreira existe
    const barreira = await BarreirasRepo.findById(barreiraId);
    if (!barreira) {
      throw Object.assign(new Error("Barreira não encontrada"), { status: 404 });
    }

    // Verificar se já existe a relação
    const existing = await CandidatoBarreiraRepository.findByCandidatoAndBarreira(candidatoId, barreiraId);
    if (existing) {
      throw Object.assign(new Error("Candidato já possui esta barreira"), { status: 409 });
    }

    return await CandidatoBarreiraRepository.create(candidatoId, barreiraId);
  },

  async desvincular(candidatoId: number, barreiraId: number) {
    if (!candidatoId || isNaN(candidatoId)) {
      throw Object.assign(new Error("candidatoId inválido"), { status: 400 });
    }
    
    if (!barreiraId || isNaN(barreiraId)) {
      throw Object.assign(new Error("barreiraId inválido"), { status: 400 });
    }

    // Verificar se existe a relação
    const existing = await CandidatoBarreiraRepository.findByCandidatoAndBarreira(candidatoId, barreiraId);
    if (!existing) {
      throw Object.assign(new Error("Relação candidato-barreira não encontrada"), { status: 404 });
    }

    await CandidatoBarreiraRepository.delete(candidatoId, barreiraId);
    return { message: "Barreira desvinculada com sucesso" };
  },

  async atualizarBarreirasBatch(candidatoId: number, barreiraIds: number[]) {
    if (!candidatoId || isNaN(candidatoId)) {
      throw Object.assign(new Error("candidatoId inválido"), { status: 400 });
    }

    if (!Array.isArray(barreiraIds)) {
      throw Object.assign(new Error("barreiraIds deve ser um array"), { status: 400 });
    }

    // Verificar se todas as barreiras existem
    for (const barreiraId of barreiraIds) {
      if (!barreiraId || isNaN(barreiraId)) {
        throw Object.assign(new Error(`barreiraId inválido: ${barreiraId}`), { status: 400 });
      }
      
      const barreira = await BarreirasRepo.findById(barreiraId);
      if (!barreira) {
        throw Object.assign(new Error(`Barreira não encontrada: ${barreiraId}`), { status: 404 });
      }
    }

    return await CandidatoBarreiraRepository.updateByCandidato(candidatoId, barreiraIds);
  },

  async inicializarBarreirasPorSubtipo(candidatoId: number, subtipoIds: number[]) {
    if (!candidatoId || isNaN(candidatoId)) {
      throw Object.assign(new Error("candidatoId inválido"), { status: 400 });
    }

    // Buscar todas as barreiras dos subtipos selecionados
    const barreirasPorSubtipo = await Promise.all(
      subtipoIds.map(subtipoId => BarreirasRepo.findBySubtipo(subtipoId))
    );

    // Consolidar todas as barreiras em um array único (sem duplicatas)
    const barreiraIds = Array.from(
      new Set(
        barreirasPorSubtipo
          .flat()
          .map(barreira => barreira.id)
      )
    );

    if (barreiraIds.length > 0) {
      await CandidatoBarreiraRepository.updateByCandidato(candidatoId, barreiraIds);
    }

    return await this.findByCandidato(candidatoId);
  }
};