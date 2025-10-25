import { CandidaturasRepository } from "../repositories/candidaturas.repo";

export const CandidaturasService = {
  async list() {
    return await CandidaturasRepository.findAll();
  },

  async findByCandidato(candidatoId: number) {
    return await CandidaturasRepository.findByCandidato(candidatoId);
  },

  async findByVaga(vagaId: number) {
    return await CandidaturasRepository.findByVaga(vagaId);
  },

  async create(candidatoId: number, vagaId: number, mensagem?: string) {
    // Verifica se já existe candidatura
    const existente = await CandidaturasRepository.findByCandidatoAndVaga(candidatoId, vagaId);
    if (existente) {
      throw new Error('Você já se candidatou para esta vaga');
    }
    return await CandidaturasRepository.create(candidatoId, vagaId, mensagem);
  },

  async updateStatus(id: number, status: "PENDENTE" | "APROVADO" | "RECUSADO") {
    return await CandidaturasRepository.updateStatus(id, status);
  },

  async delete(id: number) {
    return await CandidaturasRepository.delete(id);
  },
};