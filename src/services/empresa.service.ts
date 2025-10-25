import { EmpresaRepository } from "../repositories/empresa.repo";

export const EmpresaService = {
  async getProfile(id: number) {
    return await EmpresaRepository.findById(id);
  },

  async update(id: number, data: any) {
    const { acessibilidades, ...empresaData } = data;
    return await EmpresaRepository.update(id, empresaData, acessibilidades);
  }
};