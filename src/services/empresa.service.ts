import { EmpresaRepository } from "../repositories/empresa.repo";

export const EmpresaService = {
  async getProfile(id: number) {
    return await EmpresaRepository.findById(id);
  },

  async update(id: number, data: any) {
    const { acessibilidades, endereco, ...empresaData } = data;
    return await EmpresaRepository.update(id, empresaData, acessibilidades, endereco);
  }
};