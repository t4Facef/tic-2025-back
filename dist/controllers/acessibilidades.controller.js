"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcessibilidadesController = void 0;
const acessibilidades_service_1 = require("../services/acessibilidades.service");
// Controller das Acessibilidades
exports.AcessibilidadesController = {
    // GET /acessibilidades
    async list(_req, res) {
        try {
            const data = await acessibilidades_service_1.AcessService.list();
            res.json(data);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    // GET /acessibilidades/
    async listNames(req, res) {
        try {
            const data = await acessibilidades_service_1.AcessService.listNames();
            res.json(data);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    // GET /acessibilidades/empresa/:empresaId
    async listByEmpresa(req, res) {
        try {
            const empresaId = Number(req.params.empresaId);
            const data = await acessibilidades_service_1.AcessService.listByEmpresa(empresaId);
            res.json(data);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    // GET /acessibilidades/:id
    async getById(req, res) {
        try {
            const id = Number(req.params.id);
            const data = await acessibilidades_service_1.AcessService.findById(id);
            res.json(data);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    // POST /acessibilidades
    async create(req, res) {
        try {
            const { nome } = req.body ?? {};
            const created = await acessibilidades_service_1.AcessService.create(nome);
            res.status(201).json(created);
        }
        catch (error) {
            res.status(error.status || 400).json({ error: error.message });
        }
    },
};
