"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubtiposController = void 0;
const subtipos_service_1 = require("../services/subtipos.service");
// Controller dos Subtipos
exports.SubtiposController = {
    // GET /subtipos/:id → busca detalhada
    async getOne(req, res) {
        try {
            const id = Number(req.params.id);
            const data = await subtipos_service_1.SubtiposService.findDeep(id);
            res.json(data);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    // POST /subtipos
    async create(req, res) {
        try {
            const { nome, tipoId } = req.body ?? {};
            const created = await subtipos_service_1.SubtiposService.create(nome, Number(tipoId));
            res.status(201).json(created);
        }
        catch (error) {
            res.status(error.status || 400).json({ error: error.message });
        }
    },
    async getByTipoId(req, res) {
        try {
            const tipoId = Number(req.params.id);
            const data = await subtipos_service_1.SubtiposService.getByTipoId(tipoId);
            res.json(data);
        }
        catch (error) {
            res.status(error.status || 400).json({ error: error.message });
        }
    }
};
