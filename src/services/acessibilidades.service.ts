import { AcessRepo } from "../repositories/acessibilidades.repo";

// Service de Acessibilidades
export const AcessService = {
  // Lista todas as acessibilidades
  list() {
    return AcessRepo.list();
  },

  listNames(){
    return AcessRepo.listNames();
  },

  // Lista acessibilidades por empresa
  listByEmpresa(empresaId: number) {
    return AcessRepo.findByEmpresa(empresaId);
  },

  // Busca acessibilidade por ID
  findById(id: number) {
    return AcessRepo.findById(id);
  },

  // Cria acessibilidade padrão com validação
  async create(nome: string) {
    const final = (nome ?? "").trim();

    if (!final)
      throw Object.assign(new Error("O campo 'nome' é obrigatório"), {
        status: 400,
      });

    return AcessRepo.create(final);
  },

  // Busca acessibilidades por barreira
  getByBarreira(barreiraId: number) {
    if (!barreiraId || isNaN(barreiraId))
      throw Object.assign(new Error("barreiraId inválido"), { status: 400 });
    
    return AcessRepo.findByBarreira(barreiraId);
  },

  // Cria acessibilidade e vincula a barreira
  async createAndVincular(nome: string, barreiraId: number) {
    const final = (nome ?? "").trim();
    if (!final)
      throw Object.assign(new Error("O campo 'nome' é obrigatório"), { status: 400 });
    
    if (!barreiraId || isNaN(barreiraId))
      throw Object.assign(new Error("barreiraId inválido"), { status: 400 });

    return AcessRepo.createAndVincular(final, barreiraId);
  },

  // Deleta uma acessibilidade
  async delete(id: number) {
    if (!id || isNaN(id))
      throw Object.assign(new Error("ID inválido"), { status: 400 });

    return AcessRepo.delete(id);
  },
};
