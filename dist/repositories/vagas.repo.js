"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VagasRepository = void 0;
const prisma_1 = require("./prisma");
exports.VagasRepository = {
    async findAll(filters) {
        const where = {};
        if (filters) {
            if (filters.titulo) {
                where.titulo = { contains: filters.titulo, mode: 'insensitive' };
            }
            if (filters.localizacao) {
                where.localizacao = { contains: filters.localizacao, mode: 'insensitive' };
            }
            if (filters.tipoContrato) {
                if (Array.isArray(filters.tipoContrato)) {
                    where.tipoContrato = { in: filters.tipoContrato };
                }
                else {
                    where.tipoContrato = filters.tipoContrato;
                }
            }
            if (filters.tipoTrabalho) {
                if (Array.isArray(filters.tipoTrabalho)) {
                    where.tipoTrabalho = { in: filters.tipoTrabalho };
                }
                else {
                    where.tipoTrabalho = filters.tipoTrabalho;
                }
            }
            if (filters.nivelTrabalho) {
                where.nivelTrabalho = filters.nivelTrabalho;
            }
            if (filters.turno) {
                where.turno = filters.turno;
            }
            if (filters.empresaId) {
                where.empresaId = parseInt(filters.empresaId);
            }
            if (filters.habilidades) {
                where.habilidades = { has: filters.habilidades };
            }
            if (filters.apoios) {
                where.apoios = { has: filters.apoios };
            }
            if (filters.setor) {
                where.setor = { contains: filters.setor, mode: 'insensitive' };
            }
        }
        let vagas = await prisma_1.prisma.vagas.findMany({
            where,
            include: { empresa: true },
            orderBy: { createdAt: 'desc' }
        });
        // Filtro de recomendação com candidatoId
        if (filters?.candidatoId) {
            const { CompatibilidadeService } = require('../services/compatibilidade.service');
            const candidatoId = parseInt(filters.candidatoId);
            const vagasComCompatibilidade = [];
            for (const vaga of vagas) {
                try {
                    const compatibilidade = await CompatibilidadeService.calcularCompatibilidade(candidatoId, vaga.id);
                    const { compatibilidade: _, ...vagaSemCompatibilidadeFixa } = vaga;
                    vagasComCompatibilidade.push({
                        ...vagaSemCompatibilidadeFixa,
                        compatibilidadeCalculada: compatibilidade,
                        compatibilidadeFormatada: `${(compatibilidade * 100).toFixed(1)}%`
                    });
                }
                catch (error) {
                    const { compatibilidade: _, ...vagaSemCompatibilidadeFixa } = vaga;
                    vagasComCompatibilidade.push({
                        ...vagaSemCompatibilidadeFixa,
                        compatibilidadeCalculada: 0,
                        compatibilidadeFormatada: "0.0%"
                    });
                }
            }
            // Se for filtro de recomendadas, filtrar apenas >= 70%
            if (filters.recomendadas) {
                return vagasComCompatibilidade
                    .filter(vaga => vaga.compatibilidadeCalculada >= 0.7)
                    .sort((a, b) => b.compatibilidadeCalculada - a.compatibilidadeCalculada)
                    .slice(0, 3);
            }
            else {
                return vagasComCompatibilidade.sort((a, b) => b.compatibilidadeCalculada - a.compatibilidadeCalculada);
            }
        }
        return vagas;
    },
    async findById(id) {
        return await prisma_1.prisma.vagas.findUnique({
            where: { id },
            include: { empresa: true, candidaturas: true },
        });
    },
    async findByEmpresa(empresaId) {
        return await prisma_1.prisma.vagas.findMany({
            where: { empresaId },
            include: { candidaturas: true },
        });
    },
    async create(vaga) {
        return await prisma_1.prisma.vagas.create({
            data: vaga,
        });
    },
    async update(id, vaga) {
        return await prisma_1.prisma.vagas.update({
            where: { id },
            data: vaga,
        });
    },
    async delete(id) {
        return await prisma_1.prisma.vagas.delete({
            where: { id },
        });
    },
};
