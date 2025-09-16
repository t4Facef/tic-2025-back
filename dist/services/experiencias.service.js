"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperienciasService = void 0;
const experiencias_repo_1 = require("../repositories/experiencias.repo");
exports.ExperienciasService = {
    async list() {
        return await experiencias_repo_1.ExperienciasRepository.findAll();
    },
    async findById(id) {
        return await experiencias_repo_1.ExperienciasRepository.findById(id);
    },
    async findByCandidato(candidatoId) {
        return await experiencias_repo_1.ExperienciasRepository.findByCandidato(candidatoId);
    },
    async create(experiencia) {
        return await experiencias_repo_1.ExperienciasRepository.create(experiencia);
    },
    async update(id, experiencia) {
        return await experiencias_repo_1.ExperienciasRepository.update(id, experiencia);
    },
    async delete(id) {
        return await experiencias_repo_1.ExperienciasRepository.delete(id);
    },
};
