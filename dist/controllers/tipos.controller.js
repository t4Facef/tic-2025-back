"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TiposController = void 0;
const tipos_service_1 = require("../services/tipos.service");
// Controller dos Tipos
exports.TiposController = {
    // GET /tipos
    async list(_req, res) {
        const data = await tipos_service_1.TiposService.list();
        res.json(data);
    },
    // GET /tipos/com-subtipos
    async listWithSubtipos(_req, res) {
        const data = await tipos_service_1.TiposService.listWithSubtipos();
        res.json(data);
    },
    // POST /tipos
    async create(req, res) {
        const { nome } = req.body ?? {}; // pega o campo "nome" do corpo
        const created = await tipos_service_1.TiposService.create(nome);
        res.status(201).json(created);
    },
};
