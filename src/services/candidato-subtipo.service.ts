import { CandidatoSubtipoRepository } from "../repositories/candidato-subtipo.repo";
import { CandidatoBarreiraService } from "./candidato-barreira.service";

export const CandidatoSubtipoService = {
  async findByCandidato(candidatoId: number) {
    return await CandidatoSubtipoRepository.findByCandidato(candidatoId);
  },

  async findBySubtipo(subtipoId: number) {
    return await CandidatoSubtipoRepository.findBySubtipo(subtipoId);
  },

  async vincular(candidatoId: number, subtipoId: number) {
    const result = await CandidatoSubtipoRepository.create(candidatoId, subtipoId);
    
    // Após vincular o subtipo, inicializar as barreiras automaticamente
    try {
      const subtiposVinculados = await this.findByCandidato(candidatoId);
      const subtipoIds = subtiposVinculados.map((cs: any) => cs.subtipoId);
      await CandidatoBarreiraService.inicializarBarreirasPorSubtipo(candidatoId, subtipoIds);
    } catch (error) {
      console.warn("Erro ao inicializar barreiras automaticamente:", error);
      // Não interromper o fluxo principal, apenas logar o erro
    }
    
    return result;
  },

  async desvincular(candidatoId: number, subtipoId: number) {
    const result = await CandidatoSubtipoRepository.delete(candidatoId, subtipoId);
    
    // Após desvincular o subtipo, atualizar as barreiras automaticamente
    try {
      const subtiposVinculados = await this.findByCandidato(candidatoId);
      const subtipoIds = subtiposVinculados.map((cs: any) => cs.subtipoId);
      await CandidatoBarreiraService.inicializarBarreirasPorSubtipo(candidatoId, subtipoIds);
    } catch (error) {
      console.warn("Erro ao atualizar barreiras automaticamente:", error);
      // Não interromper o fluxo principal, apenas logar o erro
    }
    
    return result;
  },

  async atualizarSubtiposBatch(candidatoId: number, subtipoIds: number[]) {
    // Remove todas as relações existentes
    const existing = await this.findByCandidato(candidatoId);
    for (const rel of existing) {
      await this.desvincular(candidatoId, rel.subtipoId);
    }

    // Adiciona as novas relações
    const results = [];
    for (const subtipoId of subtipoIds) {
      const result = await CandidatoSubtipoRepository.create(candidatoId, subtipoId);
      results.push(result);
    }

    // Inicializar as barreiras baseado nos novos subtipos
    try {
      await CandidatoBarreiraService.inicializarBarreirasPorSubtipo(candidatoId, subtipoIds);
    } catch (error) {
      console.warn("Erro ao inicializar barreiras automaticamente:", error);
    }

    return results;
  },
};