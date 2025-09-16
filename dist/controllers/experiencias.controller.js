"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperienciasController = void 0;
const experiencias_service_1 = require("../services/experiencias.service");
exports.ExperienciasController = {
    async list(_req, res) {
        const data = await experiencias_service_1.ExperienciasService.list();
        res.json(data);
    },
    async getByCandidato(req, res) {
        const candidatoId = Number(req.params.candidatoId);
        const data = await experiencias_service_1.ExperienciasService.findByCandidato(candidatoId);
        res.json(data);
    },
    async getById(req, res) {
        const id = Number(req.params.id);
        const data = await experiencias_service_1.ExperienciasService.findById(id);
        res.json(data);
    },
    async create(req, res) {
        const experiencia = req.body;
        const created = await experiencias_service_1.ExperienciasService.create(experiencia);
        res.status(201).json(created);
    },
    async update(req, res) {
        const id = Number(req.params.id);
        const experiencia = req.body;
        const updated = await experiencias_service_1.ExperienciasService.update(id, experiencia);
        res.json(updated);
    },
    async delete(req, res) {
        const id = Number(req.params.id);
        await experiencias_service_1.ExperienciasService.delete(id);
        res.status(204).send();
    },
};
