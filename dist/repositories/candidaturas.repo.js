"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidaturasRepository = void 0;
const prisma_1 = require("./prisma");
exports.CandidaturasRepository = {
    async findAll() {
        return await prisma_1.prisma.candidaturas.findMany({
            include: { candidato: true, vaga: true },
        });
    },
    async findByCandidato(candidatoId) {
        return await prisma_1.prisma.candidaturas.findMany({
            where: { candidatoId },
            include: { vaga: { include: { empresa: true } } },
        });
    },
    async findByVaga(vagaId) {
        return await prisma_1.prisma.candidaturas.findMany({
            where: { vagaId },
            include: { candidato: true },
        });
    },
    async create(candidatoId, vagaId) {
        return await prisma_1.prisma.candidaturas.create({
            data: { candidatoId, vagaId },
        });
    },
    async updateStatus(id, status) {
        return await prisma_1.prisma.candidaturas.update({
            where: { id },
            data: { status },
        });
    },
    async delete(id) {
        return await prisma_1.prisma.candidaturas.delete({
            where: { id },
        });
    },
};
