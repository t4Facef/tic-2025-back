"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubtiposController = void 0;
const subtipos_service_1 = require("../services/subtipos.service");
// Controller dos Subtipos
exports.SubtiposController = {
    // GET /subtipos/:id → busca detalhada
    async getOne(req, res) {
        const id = Number(req.params.id);
        const data = await subtipos_service_1.SubtiposService.findDeep(id);
        res.json(data);
    },
    // POST /subtipos
    async create(req, res) {
        const { nome, tipoId } = req.body ?? {};
        const created = await subtipos_service_1.SubtiposService.create(nome, Number(tipoId));
        res.status(201).json(created);
    },
};
