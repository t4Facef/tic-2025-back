"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidaturasController = void 0;
const candidaturas_service_1 = require("../services/candidaturas.service");
exports.CandidaturasController = {
    async list(_req, res) {
        try {
            const data = await candidaturas_service_1.CandidaturasService.list();
            res.json(data);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async getByCandidato(req, res) {
        try {
            const candidatoId = Number(req.params.candidatoId);
            const data = await candidaturas_service_1.CandidaturasService.findByCandidato(candidatoId);
            res.json(data);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async getByVaga(req, res) {
        try {
            const vagaId = Number(req.params.vagaId);
            const data = await candidaturas_service_1.CandidaturasService.findByVaga(vagaId);
            res.json(data);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async create(req, res) {
        try {
            const { candidatoId, vagaId } = req.body;
            const created = await candidaturas_service_1.CandidaturasService.create(candidatoId, vagaId);
            res.status(201).json(created);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async updateStatus(req, res) {
        try {
            const id = Number(req.params.id);
            const { status } = req.body;
            const updated = await candidaturas_service_1.CandidaturasService.updateStatus(id, status);
            res.json(updated);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async delete(req, res) {
        try {
            const id = Number(req.params.id);
            await candidaturas_service_1.CandidaturasService.delete(id);
            res.status(204).send();
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
};
