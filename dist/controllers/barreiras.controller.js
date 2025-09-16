"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarreirasController = void 0;
const barreiras_service_1 = require("../services/barreiras.service");
// Controller das Barreiras
exports.BarreirasController = {
    // GET /barreiras
    async list(_req, res) {
        const data = await barreiras_service_1.BarreirasService.list();
        res.json(data);
    },
    // POST /barreiras
    async create(req, res) {
        const { descricao } = req.body ?? {};
        const created = await barreiras_service_1.BarreirasService.create(descricao);
        res.status(201).json(created);
    },
};
