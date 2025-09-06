import { FormacaoRepository } from "../repositories/formacao.repo";

export const FormacaoService = {
  async list() {
    return await FormacaoRepository.findAll();
  },

  async findById(id: number) {
    return await FormacaoRepository.findById(id);
  },

  async findByCandidato(candidatoId: number) {
    return await FormacaoRepository.findByCandidato(candidatoId);
  },

  async create(formacao: any) {
    return await FormacaoRepository.create(formacao);
  },

  async update(id: number, formacao: any) {
    return await FormacaoRepository.update(id, formacao);
  },

  async delete(id: number) {
    return await FormacaoRepository.delete(id);
  },
};