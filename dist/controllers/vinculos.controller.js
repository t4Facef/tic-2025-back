"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VinculosController = void 0;
const vinculos_service_1 = require("../services/vinculos.service");
// Controller para vincular relacionamentos N:N
exports.VinculosController = {
    // POST /subtipos/:id/barreiras → vincula barreiras a um subtipo
    async vincularBarreiras(req, res) {
        try {
            const subtipoId = Number(req.params.id);
            const { barreiraIds } = req.body ?? {};
            const result = await vinculos_service_1.VinculosService.vincularBarreiras(subtipoId, barreiraIds);
            res.json(result);
        }
        catch (error) {
            res.status(error.status || 400).json({ error: error.message });
        }
    },
    // POST /barreiras/:id/acessibilidades → vincula acessibilidades a uma barreira
    async vincularAcessibilidades(req, res) {
        try {
            const barreiraId = Number(req.params.id);
            const { acessibilidadeIds } = req.body ?? {};
            const result = await vinculos_service_1.VinculosService.vincularAcessibilidades(barreiraId, acessibilidadeIds);
            res.json(result);
        }
        catch (error) {
            res.status(error.status || 400).json({ error: error.message });
        }
    },
};
