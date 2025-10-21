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
        const formacaoData = {
            ...formacao,
            dataInicio: new Date(formacao.dataInicio),
            dataFim: new Date(formacao.dataFim)
        };
        return await formacao_repo_1.FormacaoRepository.create(formacaoData);
    },
    async update(id, formacao) {
        const formacaoData = {
            ...formacao,
            dataInicio: formacao.dataInicio ? new Date(formacao.dataInicio) : undefined,
            dataFim: formacao.dataFim ? new Date(formacao.dataFim) : undefined
        };
        return await formacao_repo_1.FormacaoRepository.update(id, formacaoData);
    },
    async delete(id) {
        return await formacao_repo_1.FormacaoRepository.delete(id);
    },
};
