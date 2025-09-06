import { CandidatoSubtipoRepository } from "../repositories/candidato-subtipo.repo";

export const CandidatoSubtipoService = {
  async findByCandidato(candidatoId: number) {
    return await CandidatoSubtipoRepository.findByCandidato(candidatoId);
  },

  async findBySubtipo(subtipoId: number) {
    return await CandidatoSubtipoRepository.findBySubtipo(subtipoId);
  },

  async vincular(candidatoId: number, subtipoId: number) {
    return await CandidatoSubtipoRepository.create(candidatoId, subtipoId);
  },

  async desvincular(candidatoId: number, subtipoId: number) {
    return await CandidatoSubtipoRepository.delete(candidatoId, subtipoId);
  },
};