"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormacaoController = void 0;
const formacao_service_1 = require("../services/formacao.service");
exports.FormacaoController = {
    async list(_req, res) {
        const data = await formacao_service_1.FormacaoService.list();
        res.json(data);
    },
    async getByCandidato(req, res) {
        const candidatoId = Number(req.params.candidatoId);
        const data = await formacao_service_1.FormacaoService.findByCandidato(candidatoId);
        res.json(data);
    },
    async getById(req, res) {
        const id = Number(req.params.id);
        const data = await formacao_service_1.FormacaoService.findById(id);
        res.json(data);
    },
    async create(req, res) {
        const formacao = req.body;
        const created = await formacao_service_1.FormacaoService.create(formacao);
        res.status(201).json(created);
    },
    async update(req, res) {
        const id = Number(req.params.id);
        const formacao = req.body;
        const updated = await formacao_service_1.FormacaoService.update(id, formacao);
        res.json(updated);
    },
    async delete(req, res) {
        const id = Number(req.params.id);
        await formacao_service_1.FormacaoService.delete(id);
        res.status(204).send();
    },
};
