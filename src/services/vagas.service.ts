import { VagasRepository } from "../repositories/vagas.repo";

export const VagasService = {
  async list() {
    return await VagasRepository.findAll();
  },

  async findById(id: number) {
    return await VagasRepository.findById(id);
  },

  async findByEmpresa(empresaId: number) {
    return await VagasRepository.findByEmpresa(empresaId);
  },

  async create(vaga: any) {
    return await VagasRepository.create(vaga);
  },

  async update(id: number, vaga: any) {
    return await VagasRepository.update(id, vaga);
  },

  async delete(id: number) {
    return await VagasRepository.delete(id);
  },
};