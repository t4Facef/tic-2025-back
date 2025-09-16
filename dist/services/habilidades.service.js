"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HabilidadesService = void 0;
const habilidades_repo_1 = require("../repositories/habilidades.repo");
exports.HabilidadesService = {
    async list() {
        return await habilidades_repo_1.HabilidadesRepository.findAll();
    },
    async findById(id) {
        return await habilidades_repo_1.HabilidadesRepository.findById(id);
    },
    async findByCandidato(candidatoId) {
        return await habilidades_repo_1.HabilidadesRepository.findByCandidato(candidatoId);
    },
    async create(habilidade) {
        return await habilidades_repo_1.HabilidadesRepository.create(habilidade);
    },
    async update(id, nome) {
        return await habilidades_repo_1.HabilidadesRepository.update(id, nome);
    },
    async delete(id) {
        return await habilidades_repo_1.HabilidadesRepository.delete(id);
    },
};
