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
    const formacaoData = {
      ...formacao,
      dataInicio: new Date(formacao.dataInicio),
      dataFim: new Date(formacao.dataFim)
    };
    return await FormacaoRepository.create(formacaoData);
  },

  async update(id: number, formacao: any) {
    const formacaoData = {
      ...formacao,
      dataInicio: formacao.dataInicio ? new Date(formacao.dataInicio) : undefined,
      dataFim: formacao.dataFim ? new Date(formacao.dataFim) : undefined
    };
    return await FormacaoRepository.update(id, formacaoData);
  },

  async delete(id: number) {
    return await FormacaoRepository.delete(id);
  },
};