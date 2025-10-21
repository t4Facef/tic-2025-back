"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidatoSubtipoController = void 0;
const candidato_subtipo_service_1 = require("../services/candidato-subtipo.service");
exports.CandidatoSubtipoController = {
    async getByCandidato(req, res) {
        try {
            const candidatoId = Number(req.params.candidatoId);
            const data = await candidato_subtipo_service_1.CandidatoSubtipoService.findByCandidato(candidatoId);
            res.json(data);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async getBySubtipo(req, res) {
        try {
            const subtipoId = Number(req.params.subtipoId);
            const data = await candidato_subtipo_service_1.CandidatoSubtipoService.findBySubtipo(subtipoId);
            res.json(data);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async vincular(req, res) {
        try {
            const { candidatoId, subtipoId } = req.body;
            const created = await candidato_subtipo_service_1.CandidatoSubtipoService.vincular(candidatoId, subtipoId);
            res.status(201).json(created);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async desvincular(req, res) {
        try {
            const { candidatoId, subtipoId } = req.body;
            await candidato_subtipo_service_1.CandidatoSubtipoService.desvincular(candidatoId, subtipoId);
            res.status(204).send();
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
};
