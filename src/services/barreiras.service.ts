import { BarreirasRepo } from "../repositories/barreiras.repo";

// Service de Barreiras
export const BarreirasService = {
  // Lista todas as barreiras
  list() {
    return BarreirasRepo.list();
  },

  // Cria barreira validando campo
  async create(descricao: string) {
    const final = (descricao ?? "").trim();

    if (!final)
      throw Object.assign(new Error("O campo 'descricao' é obrigatório"), {
        status: 400,
      });

    return BarreirasRepo.create(final);
  },
};
