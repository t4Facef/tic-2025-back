"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormacaoService = void 0;
const formacao_repo_1 = require("../repositories/formacao.repo");
exports.FormacaoService = {
    async list() {
        return await formacao_repo_1.FormacaoRepository.findAll();
    },
    async findById(id) {
        return await formacao_repo_1.FormacaoRepository.findById(id);
    },
    async findByCandidato(candidatoId) {
        return await formacao_repo_1.FormacaoRepository.findByCandidato(candidatoId);
    },
    async create(formacao) {
        return await formacao_repo_1.FormacaoRepository.create(formacao);
    },
    async update(id, formacao) {
        return await formacao_repo_1.FormacaoRepository.update(id, formacao);
    },
    async delete(id) {
        return await formacao_repo_1.FormacaoRepository.delete(id);
    },
};
