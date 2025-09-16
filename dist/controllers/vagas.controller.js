"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VagasController = void 0;
const vagas_service_1 = require("../services/vagas.service");
exports.VagasController = {
    async list(_req, res) {
        const data = await vagas_service_1.VagasService.list();
        res.json(data);
    },
    async getById(req, res) {
        const id = Number(req.params.id);
        const data = await vagas_service_1.VagasService.findById(id);
        res.json(data);
    },
    async getByEmpresa(req, res) {
        const empresaId = Number(req.params.empresaId);
        const data = await vagas_service_1.VagasService.findByEmpresa(empresaId);
        res.json(data);
    },
    async create(req, res) {
        const vaga = req.body;
        const created = await vagas_service_1.VagasService.create(vaga);
        res.status(201).json(created);
    },
    async update(req, res) {
        const id = Number(req.params.id);
        const vaga = req.body;
        const updated = await vagas_service_1.VagasService.update(id, vaga);
        res.json(updated);
    },
    async delete(req, res) {
        const id = Number(req.params.id);
        await vagas_service_1.VagasService.delete(id);
        res.status(204).send();
    },
};
