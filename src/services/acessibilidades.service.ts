import { AcessRepo } from "../repositories/acessibilidades.repo";

// Service de Acessibilidades
export const AcessService = {
  // Lista todas as acessibilidades
  list() {
    return AcessRepo.list();
  },

  // Lista acessibilidades por empresa
  listByEmpresa(empresaId: number) {
    return AcessRepo.findByEmpresa(empresaId);
  },

  // Busca acessibilidade por ID
  findById(id: number) {
    return AcessRepo.findById(id);
  },

  // Cria acessibilidade com validação
  async create(nome: string, empresaId: number) {
    const final = (nome ?? "").trim();

    if (!final)
      throw Object.assign(new Error("O campo 'nome' é obrigatório"), {
        status: 400,
      });

    if (!empresaId)
      throw Object.assign(new Error("O campo 'empresaId' é obrigatório"), {
        status: 400,
      });

    return AcessRepo.create(final, empresaId);
  },
};
