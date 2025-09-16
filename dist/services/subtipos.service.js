"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubtiposService = void 0;
const subtipos_repo_1 = require("../repositories/subtipos.repo");
const tipos_repo_1 = require("../repositories/tipos.repo");
// Service de Subtipos
exports.SubtiposService = {
    // Busca um subtipo de forma detalhada (tipo, barreiras e acessibilidades)
    async findDeep(id) {
        const subtipo = await subtipos_repo_1.SubtiposRepo.findDeepById(id);
        if (!subtipo)
            throw Object.assign(new Error("Subtipo não encontrado"), { status: 404 });
        // "Achata" a resposta para um formato mais simples (evita aninhamento profundo)
        const barreiras = subtipo.barreiras.map((sb) => ({
            id: sb.barreira.id,
            descricao: sb.barreira.descricao,
            acessibilidades: sb.barreira.acessibilidades.map((ba) => ({
                id: ba.acessibilidade.id,
                descricao: ba.acessibilidade.descricao,
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
    async create(nome, tipoId) {
        const final = (nome ?? "").trim();
        if (!final)
            throw Object.assign(new Error("Campos 'nome' e 'tipoId' são obrigatórios"), { status: 400 });
        if (!Number.isInteger(tipoId))
            throw Object.assign(new Error("tipoId inválido"), { status: 400 });
        // Verifica se o tipo existe antes de criar
        const tipo = await tipos_repo_1.TiposRepo.findById(tipoId);
        if (!tipo)
            throw Object.assign(new Error("Tipo não encontrado"), { status: 404 });
        return subtipos_repo_1.SubtiposRepo.create(final, tipoId);
    },
};
