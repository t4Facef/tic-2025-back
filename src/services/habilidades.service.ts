import { HabilidadesRepository } from "../repositories/habilidades.repo";

export const HabilidadesService = {
  async list() {
    return await HabilidadesRepository.findAll();
  },

  async findById(id: number) {
    return await HabilidadesRepository.findById(id);
  },

  async findByCandidato(candidatoId: number) {
    return await HabilidadesRepository.findByCandidato(candidatoId);
  },

  async create(habilidade: any) {
    return await HabilidadesRepository.create(habilidade);
  },

  async update(id: number, nome: string) {
    return await HabilidadesRepository.update(id, nome);
  },

  async delete(id: number) {
    return await HabilidadesRepository.delete(id);
  },
};