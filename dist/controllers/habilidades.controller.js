"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HabilidadesController = void 0;
const habilidades_service_1 = require("../services/habilidades.service");
exports.HabilidadesController = {
    async list(_req, res) {
        const data = await habilidades_service_1.HabilidadesService.list();
        res.json(data);
    },
    async getByCandidato(req, res) {
        const candidatoId = Number(req.params.candidatoId);
        const data = await habilidades_service_1.HabilidadesService.findByCandidato(candidatoId);
        res.json(data);
    },
    async getById(req, res) {
        const id = Number(req.params.id);
        const data = await habilidades_service_1.HabilidadesService.findById(id);
        res.json(data);
    },
    async create(req, res) {
        const habilidade = req.body;
        const created = await habilidades_service_1.HabilidadesService.create(habilidade);
        res.status(201).json(created);
    },
    async update(req, res) {
        const id = Number(req.params.id);
        const { nome } = req.body;
        const updated = await habilidades_service_1.HabilidadesService.update(id, nome);
        res.json(updated);
    },
    async delete(req, res) {
        const id = Number(req.params.id);
        await habilidades_service_1.HabilidadesService.delete(id);
        res.status(204).send();
    },
};
