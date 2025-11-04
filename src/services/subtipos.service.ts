import { SubtiposRepo } from "../repositories/subtipos.repo";
import { TiposRepo } from "../repositories/tipos.repo";

// Service de Subtipos
export const SubtiposService = {
  // Busca um subtipo de forma detalhada (tipo, barreiras e acessibilidades)
  async findDeep(id: number) {
    const subtipo = await SubtiposRepo.findDeepById(id);
    if (!subtipo)
      throw Object.assign(new Error("Subtipo não encontrado"), { status: 404 });

    // "Achata" a resposta para um formato mais simples (evita aninhamento profundo)
    const barreiras = subtipo.barreiras.map((sb) => ({
      id: sb.barreira.id,
      descricao: sb.barreira.descricao,
      acessibilidades: sb.barreira.acessibilidades.map((ba) => ({
        id: ba.acessibilidade.id,
        nome: ba.acessibilidade.nome, // Campo correto é 'nome', não 'descricao'
      })),
    }));

    return {
      id: subtipo.id,
      nome: subtipo.nome,
      tipo: { id: subtipo.tipo.id, nome: subtipo.tipo.nome },
      barreiras,
    };
  },

  // Cria um novo subtipo validando dados
  async create(nome: string, tipoId: number) {
    const final = (nome ?? "").trim();
    if (!final)
      throw Object.assign(
        new Error("Campos 'nome' e 'tipoId' são obrigatórios"),
        { status: 400 }
      );

    if (!Number.isInteger(tipoId))
      throw Object.assign(new Error("tipoId inválido"), { status: 400 });

    // Verifica se o tipo existe antes de criar
    const tipo = await TiposRepo.findById(tipoId);
    if (!tipo)
      throw Object.assign(new Error("Tipo não encontrado"), { status: 404 });

    return SubtiposRepo.create(final, tipoId);
  },

  async getByTipoId(tipoId: number) {
    if (!Number.isInteger(tipoId))
      throw Object.assign(new Error("tipoId inválido"), { status: 400 });

    // Verifica se o tipo existe
    const tipo = await TiposRepo.findById(tipoId);
    if (!tipo)
      throw Object.assign(new Error("Tipo não encontrado"), { status: 404 });

    // Busca subtipos do tipo - corrigindo a chamada do método
    const subtipos = await SubtiposRepo.findSubtiposByTipo(tipoId);
    
    return subtipos;
  },

  // Deleta um subtipo
  async delete(id: number) {
    if (!id || isNaN(id))
      throw Object.assign(new Error("ID inválido"), { status: 400 });

    return SubtiposRepo.delete(id);
  },
};
