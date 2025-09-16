"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidaturasController = void 0;
const candidaturas_service_1 = require("../services/candidaturas.service");
exports.CandidaturasController = {
    async list(_req, res) {
        const data = await candidaturas_service_1.CandidaturasService.list();
        res.json(data);
    },
    async getByCandidato(req, res) {
        const candidatoId = Number(req.params.candidatoId);
        const data = await candidaturas_service_1.CandidaturasService.findByCandidato(candidatoId);
        res.json(data);
    },
    async getByVaga(req, res) {
        const vagaId = Number(req.params.vagaId);
        const data = await candidaturas_service_1.CandidaturasService.findByVaga(vagaId);
        res.json(data);
    },
    async create(req, res) {
        const { candidatoId, vagaId } = req.body;
        const created = await candidaturas_service_1.CandidaturasService.create(candidatoId, vagaId);
        res.status(201).json(created);
    },
    async updateStatus(req, res) {
        const id = Number(req.params.id);
        const { status } = req.body;
        const updated = await candidaturas_service_1.CandidaturasService.updateStatus(id, status);
        res.json(updated);
    },
    async delete(req, res) {
        const id = Number(req.params.id);
        await candidaturas_service_1.CandidaturasService.delete(id);
        res.status(204).send();
    },
};
