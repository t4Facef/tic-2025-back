"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HabilidadesRepository = void 0;
const prisma_1 = require("./prisma");
exports.HabilidadesRepository = {
    async findAll() {
        return await prisma_1.prisma.habilidades.findMany({
            include: { candidato: true },
        });
    },
    async findById(id) {
        return await prisma_1.prisma.habilidades.findUnique({
            where: { id },
            include: { candidato: true },
        });
    },
    async findByCandidato(candidatoId) {
        return await prisma_1.prisma.habilidades.findMany({
            where: { candidatoId },
        });
    },
    async create(habilidade) {
        return await prisma_1.prisma.habilidades.create({
            data: habilidade,
        });
    },
    async update(id, nome) {
        return await prisma_1.prisma.habilidades.update({
            where: { id },
            data: { nome },
        });
    },
    async delete(id) {
        return await prisma_1.prisma.habilidades.delete({
            where: { id },
        });
    },
};
