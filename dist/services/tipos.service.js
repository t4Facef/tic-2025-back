"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TiposService = void 0;
const tipos_repo_1 = require("../repositories/tipos.repo");
// Service responsável pelas regras de negócio de Tipos
exports.TiposService = {
    // Lista todos os tipos
    list() {
        return tipos_repo_1.TiposRepo.list();
    },
    // Lista tipos junto com seus subtipos
    listWithSubtipos() {
        return tipos_repo_1.TiposRepo.listWithSubtipos();
    },
    // Cria um novo tipo com validação do nome
    async create(nome) {
        const final = (nome ?? "").trim(); // garante que não é nulo e tira espaços
        if (!final)
            throw Object.assign(new Error("O campo 'nome' é obrigatório"), {
                status: 400, // erro de requisição inválida
            });
        return tipos_repo_1.TiposRepo.create(final);
    },
};
