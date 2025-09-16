"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidaturasService = void 0;
const candidaturas_repo_1 = require("../repositories/candidaturas.repo");
exports.CandidaturasService = {
    async list() {
        return await candidaturas_repo_1.CandidaturasRepository.findAll();
    },
    async findByCandidato(candidatoId) {
        return await candidaturas_repo_1.CandidaturasRepository.findByCandidato(candidatoId);
    },
    async findByVaga(vagaId) {
        return await candidaturas_repo_1.CandidaturasRepository.findByVaga(vagaId);
    },
    async create(candidatoId, vagaId) {
        return await candidaturas_repo_1.CandidaturasRepository.create(candidatoId, vagaId);
    },
    async updateStatus(id, status) {
        return await candidaturas_repo_1.CandidaturasRepository.updateStatus(id, status);
    },
    async delete(id) {
        return await candidaturas_repo_1.CandidaturasRepository.delete(id);
    },
};
