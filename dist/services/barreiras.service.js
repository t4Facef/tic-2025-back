"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarreirasService = void 0;
const barreiras_repo_1 = require("../repositories/barreiras.repo");
// Service de Barreiras
exports.BarreirasService = {
    // Lista todas as barreiras
    list() {
        return barreiras_repo_1.BarreirasRepo.list();
    },
    // Cria barreira validando campo
    async create(descricao) {
        const final = (descricao ?? "").trim();
        if (!final)
            throw Object.assign(new Error("O campo 'descricao' é obrigatório"), {
                status: 400,
            });
        return barreiras_repo_1.BarreirasRepo.create(final);
    },
    // Busca barreiras por subtipo
    getBySubtipo(subtipoId) {
        return barreiras_repo_1.BarreirasRepo.findBySubtipo(subtipoId);
    },
};
