"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarreirasController = void 0;
const barreiras_service_1 = require("../services/barreiras.service");
// Controller das Barreiras
exports.BarreirasController = {
    // GET /barreiras
    async list(_req, res) {
        try {
            const data = await barreiras_service_1.BarreirasService.list();
            res.json(data);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    // GET /barreiras/subtipo/:subtipoId
    async getBySubtipo(req, res) {
        try {
            const subtipoId = Number(req.params.subtipoId);
            const data = await barreiras_service_1.BarreirasService.getBySubtipo(subtipoId);
            res.json(data);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    // POST /barreiras
    async create(req, res) {
        try {
            const { descricao } = req.body ?? {};
            const created = await barreiras_service_1.BarreirasService.create(descricao);
            res.status(201).json(created);
        }
        catch (error) {
            res.status(error.status || 400).json({ error: error.message });
        }
    },
};
