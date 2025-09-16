"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnderecoService = void 0;
const endereco_repo_1 = require("../repositories/endereco.repo");
exports.EnderecoService = {
    async list() {
        return await endereco_repo_1.EnderecoRepository.findAll();
    },
    async findById(id) {
        return await endereco_repo_1.EnderecoRepository.findById(id);
    },
    async create(endereco) {
        return await endereco_repo_1.EnderecoRepository.create(endereco);
    },
    async update(id, endereco) {
        return await endereco_repo_1.EnderecoRepository.update(id, endereco);
    },
    async delete(id) {
        return await endereco_repo_1.EnderecoRepository.delete(id);
    },
};
