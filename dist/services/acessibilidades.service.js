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
    listNames() {
        return acessibilidades_repo_1.AcessRepo.listNames();
    },
    // Lista acessibilidades por empresa
    listByEmpresa(empresaId) {
        return acessibilidades_repo_1.AcessRepo.findByEmpresa(empresaId);
    },
    // Busca acessibilidade por ID
    findById(id) {
        return acessibilidades_repo_1.AcessRepo.findById(id);
    },
    // Cria acessibilidade padrão com validação
    async create(nome) {
        const final = (nome ?? "").trim();
        if (!final)
            throw Object.assign(new Error("O campo 'nome' é obrigatório"), {
                status: 400,
            });
        return acessibilidades_repo_1.AcessRepo.create(final);
    },
};
