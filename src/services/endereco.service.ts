import { EnderecoRepository } from "../repositories/endereco.repo";

export const EnderecoService = {
  async list() {
    return await EnderecoRepository.findAll();
  },

  async findById(id: number) {
    return await EnderecoRepository.findById(id);
  },

  async create(endereco: any) {
    return await EnderecoRepository.create(endereco);
  },

  async update(id: number, endereco: any) {
    return await EnderecoRepository.update(id, endereco);
  },

  async delete(id: number) {
    return await EnderecoRepository.delete(id);
  },
};