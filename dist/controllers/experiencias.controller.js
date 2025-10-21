"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperienciasController = void 0;
const experiencias_service_1 = require("../services/experiencias.service");
exports.ExperienciasController = {
    async list(_req, res) {
        try {
            const data = await experiencias_service_1.ExperienciasService.list();
            res.json(data);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async getByCandidato(req, res) {
        try {
            const candidatoId = Number(req.params.candidatoId);
            const data = await experiencias_service_1.ExperienciasService.findByCandidato(candidatoId);
            res.json(data);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async getById(req, res) {
        try {
            const id = Number(req.params.id);
            const data = await experiencias_service_1.ExperienciasService.findById(id);
            res.json(data);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async create(req, res) {
        try {
            const experiencia = req.body;
            const created = await experiencias_service_1.ExperienciasService.create(experiencia);
            res.status(201).json(created);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async update(req, res) {
        try {
            const id = Number(req.params.id);
            const experiencia = req.body;
            const updated = await experiencias_service_1.ExperienciasService.update(id, experiencia);
            res.json(updated);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async delete(req, res) {
        try {
            const id = Number(req.params.id);
            await experiencias_service_1.ExperienciasService.delete(id);
            res.status(204).send();
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
};
