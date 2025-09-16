"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperienciasRepository = void 0;
const prisma_1 = require("./prisma");
exports.ExperienciasRepository = {
    async findAll() {
        return await prisma_1.prisma.experiencias.findMany({
            include: { candidato: true },
        });
    },
    async findById(id) {
        return await prisma_1.prisma.experiencias.findUnique({
            where: { id },
            include: { candidato: true },
        });
    },
    async findByCandidato(candidatoId) {
        return await prisma_1.prisma.experiencias.findMany({
            where: { candidatoId },
        });
    },
    async create(experiencia) {
        return await prisma_1.prisma.experiencias.create({
            data: experiencia,
        });
    },
    async update(id, experiencia) {
        return await prisma_1.prisma.experiencias.update({
            where: { id },
            data: experiencia,
        });
    },
    async delete(id) {
        return await prisma_1.prisma.experiencias.delete({
            where: { id },
        });
    },
};
