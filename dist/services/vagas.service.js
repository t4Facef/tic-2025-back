"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VagasService = void 0;
const vagas_repo_1 = require("../repositories/vagas.repo");
exports.VagasService = {
    async list() {
        return await vagas_repo_1.VagasRepository.findAll();
    },
    async findById(id) {
        return await vagas_repo_1.VagasRepository.findById(id);
    },
    async findByEmpresa(empresaId) {
        return await vagas_repo_1.VagasRepository.findByEmpresa(empresaId);
    },
    async create(vaga) {
        return await vagas_repo_1.VagasRepository.create(vaga);
    },
    async update(id, vaga) {
        return await vagas_repo_1.VagasRepository.update(id, vaga);
    },
    async delete(id) {
        return await vagas_repo_1.VagasRepository.delete(id);
    },
};
