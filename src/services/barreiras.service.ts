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

  // Busca barreiras por subtipo
  getBySubtipo(subtipoId: number) {
    return BarreirasRepo.findBySubtipo(subtipoId);
  },

  // Cria barreira e vincula a subtipo
  async createAndVincular(descricao: string, subtipoId: number) {
    const final = (descricao ?? "").trim();
    if (!final)
      throw Object.assign(new Error("O campo 'descricao' é obrigatório"), { status: 400 });
    
    if (!subtipoId || isNaN(subtipoId))
      throw Object.assign(new Error("subtipoId inválido"), { status: 400 });

    return BarreirasRepo.createAndVincular(final, subtipoId);
  },

  // Atualiza uma barreira
  async update(id: number, descricao: string) {
    if (!id || isNaN(id))
      throw Object.assign(new Error("ID inválido"), { status: 400 });
    
    const final = (descricao ?? "").trim();
    if (!final)
      throw Object.assign(new Error("O campo 'descricao' é obrigatório"), { status: 400 });

    return BarreirasRepo.update(id, final);
  },

  // Deleta uma barreira
  async delete(id: number) {
    if (!id || isNaN(id))
      throw Object.assign(new Error("ID inválido"), { status: 400 });

    return BarreirasRepo.delete(id);
  },
};
