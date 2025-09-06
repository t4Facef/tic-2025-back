import { ExperienciasRepository } from "../repositories/experiencias.repo";

export const ExperienciasService = {
  async list() {
    return await ExperienciasRepository.findAll();
  },

  async findById(id: number) {
    return await ExperienciasRepository.findById(id);
  },

  async findByCandidato(candidatoId: number) {
    return await ExperienciasRepository.findByCandidato(candidatoId);
  },

  async create(experiencia: any) {
    return await ExperienciasRepository.create(experiencia);
  },

  async update(id: number, experiencia: any) {
    return await ExperienciasRepository.update(id, experiencia);
  },

  async delete(id: number) {
    return await ExperienciasRepository.delete(id);
  },
};