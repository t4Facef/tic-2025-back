"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidatoSubtipoRepository = void 0;
const prisma_1 = require("./prisma");
exports.CandidatoSubtipoRepository = {
    async findByCandidato(candidatoId) {
        return await prisma_1.prisma.candidatoSubtipo.findMany({
            where: { candidatoId },
            include: { subtipo: { include: { tipo: true } } },
        });
    },
    async findBySubtipo(subtipoId) {
        return await prisma_1.prisma.candidatoSubtipo.findMany({
            where: { subtipoId },
            include: { candidato: true },
        });
    },
    async create(candidatoId, subtipoId) {
        return await prisma_1.prisma.candidatoSubtipo.create({
            data: { candidatoId, subtipoId },
        });
    },
    async delete(candidatoId, subtipoId) {
        return await prisma_1.prisma.candidatoSubtipo.delete({
            where: { candidatoId_subtipoId: { candidatoId, subtipoId } },
        });
    },
};
