"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcessService = void 0;
const acessibilidades_repo_1 = require("../repositories/acessibilidades.repo");
// Service de Acessibilidades
exports.AcessService = {
    // Lista todas as acessibilidades
    list() {
        return acessibilidades_repo_1.AcessRepo.list();
    },
    // Cria acessibilidade com validação
    async create(descricao) {
        const final = (descricao ?? "").trim();
        if (!final)
            throw Object.assign(new Error("O campo 'descricao' é obrigatório"), {
                status: 400,
            });
        return acessibilidades_repo_1.AcessRepo.create(final);
    },
};
