"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VagasController = void 0;
const vagas_service_1 = require("../services/vagas.service");
exports.VagasController = {
    async list(req, res) {
        try {
            const filters = req.query;
            const data = await vagas_service_1.VagasService.list(filters);
            res.json(data);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async getById(req, res) {
        try {
            const id = Number(req.params.id);
            const data = await vagas_service_1.VagasService.findById(id);
            if (!data) {
                return res.status(404).json({ error: "Vaga não encontrada" });
            }
            res.json(data);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async getByEmpresa(req, res) {
        try {
            const empresaId = Number(req.params.empresaId);
            const data = await vagas_service_1.VagasService.findByEmpresa(empresaId);
            res.json(data);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async create(req, res) {
        try {
            const { idEmpresa, title, location, description, skillsTags, supportTags, compatibility, startDate, endDate, typeContract, typeWork, payment, workLevel, timeShift } = req.body;
            const jobData = {
                idEmpresa,
                title,
                location,
                description,
                skillsTags,
                supportTags,
                compatibility,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                typeContract,
                typeWork,
                payment,
                workLevel,
                timeShift
            };
            const created = await vagas_service_1.VagasService.create(jobData);
            res.status(201).json(created);
        }
        catch (error) {
            console.error('Erro ao criar vaga:', error);
            res.status(400).json({ error: error.message || 'Erro ao criar vaga' });
        }
    },
    async update(req, res) {
        try {
            const id = Number(req.params.id);
            const jobData = req.body;
            if (jobData.startDate)
                jobData.startDate = new Date(jobData.startDate);
            if (jobData.endDate)
                jobData.endDate = new Date(jobData.endDate);
            const updated = await vagas_service_1.VagasService.update(id, jobData);
            res.json(updated);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async delete(req, res) {
        try {
            const id = Number(req.params.id);
            await vagas_service_1.VagasService.delete(id);
            res.status(204).send();
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async search(req, res) {
        try {
            const filters = req.body;
            const data = await vagas_service_1.VagasService.list(filters);
            res.json(data);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async getRecomendadas(req, res) {
        try {
            const candidatoId = req.query.candidatoId ? Number(req.query.candidatoId) : null;
            if (!candidatoId) {
                return res.status(400).json({ error: "candidatoId é obrigatório para recomendações" });
            }
            const data = await vagas_service_1.VagasService.getRecomendadas(candidatoId);
            res.json(data);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    // GET /vagas/candidato/:candidatoId - Listar vagas com compatibilidade para candidato
    async getVagasComCompatibilidade(req, res) {
        try {
            const candidatoId = Number(req.params.candidatoId);
            const filters = { ...req.query, candidatoId: candidatoId.toString() };
            const vagas = await vagas_service_1.VagasService.list(filters);
            res.json(vagas);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
};
