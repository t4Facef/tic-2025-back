import { AcessRepo } from "../repositories/acessibilidades.repo";

// Service de Acessibilidades
export const AcessService = {
  // Lista todas as acessibilidades
  list() {
    return AcessRepo.list();
  },

  // Cria acessibilidade com validação
  async create(descricao: string) {
    const final = (descricao ?? "").trim();

    if (!final)
      throw Object.assign(new Error("O campo 'descricao' é obrigatório"), {
        status: 400,
      });

    return AcessRepo.create(final);
  },
};
