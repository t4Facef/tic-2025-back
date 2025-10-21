"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormacaoController = void 0;
const formacao_service_1 = require("../services/formacao.service");
exports.FormacaoController = {
    async list(_req, res) {
        try {
            const data = await formacao_service_1.FormacaoService.list();
            res.json(data);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async getByCandidato(req, res) {
        try {
            const candidatoId = Number(req.params.candidatoId);
            const data = await formacao_service_1.FormacaoService.findByCandidato(candidatoId);
            res.json(data);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async getById(req, res) {
        try {
            const id = Number(req.params.id);
            const data = await formacao_service_1.FormacaoService.findById(id);
            res.json(data);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async create(req, res) {
        try {
            const formacao = req.body;
            const created = await formacao_service_1.FormacaoService.create(formacao);
            res.status(201).json(created);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async update(req, res) {
        try {
            const id = Number(req.params.id);
            const formacao = req.body;
            const updated = await formacao_service_1.FormacaoService.update(id, formacao);
            res.json(updated);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async delete(req, res) {
        try {
            const id = Number(req.params.id);
            await formacao_service_1.FormacaoService.delete(id);
            res.status(204).send();
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
};
