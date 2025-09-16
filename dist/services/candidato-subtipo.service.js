"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidatoSubtipoService = void 0;
const candidato_subtipo_repo_1 = require("../repositories/candidato-subtipo.repo");
exports.CandidatoSubtipoService = {
    async findByCandidato(candidatoId) {
        return await candidato_subtipo_repo_1.CandidatoSubtipoRepository.findByCandidato(candidatoId);
    },
    async findBySubtipo(subtipoId) {
        return await candidato_subtipo_repo_1.CandidatoSubtipoRepository.findBySubtipo(subtipoId);
    },
    async vincular(candidatoId, subtipoId) {
        return await candidato_subtipo_repo_1.CandidatoSubtipoRepository.create(candidatoId, subtipoId);
    },
    async desvincular(candidatoId, subtipoId) {
        return await candidato_subtipo_repo_1.CandidatoSubtipoRepository.delete(candidatoId, subtipoId);
    },
};
