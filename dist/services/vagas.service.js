"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VagasService = void 0;
const vagas_repo_1 = require("../repositories/vagas.repo");
exports.VagasService = {
    async list(filters) {
        return await vagas_repo_1.VagasRepository.findAll(filters);
    },
    async findById(id) {
        return await vagas_repo_1.VagasRepository.findById(id);
    },
    async findByEmpresa(empresaId) {
        return await vagas_repo_1.VagasRepository.findByEmpresa(empresaId);
    },
    async create(jobData) {
        const vagaData = {
            titulo: jobData.title,
            localizacao: jobData.location,
            descricao: jobData.description,
            habilidades: jobData.skillsTags,
            apoios: jobData.supportTags,
            compatibilidade: jobData.compatibility,
            dataInicio: jobData.startDate,
            dataFim: jobData.endDate,
            tipoContrato: jobData.typeContract,
            tipoTrabalho: jobData.typeWork,
            pagamento: jobData.payment,
            nivelTrabalho: jobData.workLevel,
            turno: jobData.timeShift,
            empresaId: jobData.idEmpresa,
        };
        return await vagas_repo_1.VagasRepository.create(vagaData);
    },
    async update(id, jobData) {
        const updateData = {};
        if (jobData.title)
            updateData.titulo = jobData.title;
        if (jobData.location)
            updateData.localizacao = jobData.location;
        if (jobData.description)
            updateData.descricao = jobData.description;
        if (jobData.skillsTags)
            updateData.habilidades = jobData.skillsTags;
        if (jobData.supportTags)
            updateData.apoios = jobData.supportTags;
        if (jobData.compatibility)
            updateData.compatibilidade = jobData.compatibility;
        if (jobData.startDate)
            updateData.dataInicio = jobData.startDate;
        if (jobData.endDate)
            updateData.dataFim = jobData.endDate;
        if (jobData.typeContract)
            updateData.tipoContrato = jobData.typeContract;
        if (jobData.typeWork)
            updateData.tipoTrabalho = jobData.typeWork;
        if (jobData.payment)
            updateData.pagamento = jobData.payment;
        if (jobData.workLevel)
            updateData.nivelTrabalho = jobData.workLevel;
        if (jobData.timeShift)
            updateData.turno = jobData.timeShift;
        return await vagas_repo_1.VagasRepository.update(id, updateData);
    },
    async delete(id) {
        return await vagas_repo_1.VagasRepository.delete(id);
    },
    async getRecomendadas(candidatoId) {
        const filters = { candidatoId: candidatoId.toString(), recomendadas: true };
        return await vagas_repo_1.VagasRepository.findAll(filters);
    },
};
