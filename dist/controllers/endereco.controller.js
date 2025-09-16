"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnderecoController = void 0;
const endereco_service_1 = require("../services/endereco.service");
exports.EnderecoController = {
    async list(_req, res) {
        const data = await endereco_service_1.EnderecoService.list();
        res.json(data);
    },
    async getById(req, res) {
        const id = Number(req.params.id);
        const data = await endereco_service_1.EnderecoService.findById(id);
        res.json(data);
    },
    async create(req, res) {
        const endereco = req.body;
        const created = await endereco_service_1.EnderecoService.create(endereco);
        res.status(201).json(created);
    },
    async update(req, res) {
        const id = Number(req.params.id);
        const endereco = req.body;
        const updated = await endereco_service_1.EnderecoService.update(id, endereco);
        res.json(updated);
    },
    async delete(req, res) {
        const id = Number(req.params.id);
        await endereco_service_1.EnderecoService.delete(id);
        res.status(204).send();
    },
};
