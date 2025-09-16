"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcessibilidadesController = void 0;
const acessibilidades_service_1 = require("../services/acessibilidades.service");
// Controller das Acessibilidades
exports.AcessibilidadesController = {
    // GET /acessibilidades
    async list(_req, res) {
        const data = await acessibilidades_service_1.AcessService.list();
        res.json(data);
    },
    // POST /acessibilidades
    async create(req, res) {
        const { descricao } = req.body ?? {};
        const created = await acessibilidades_service_1.AcessService.create(descricao);
        res.status(201).json(created);
    },
};
