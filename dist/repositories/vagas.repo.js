"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VagasRepository = void 0;
const prisma_1 = require("./prisma");
exports.VagasRepository = {
    async findAll() {
        return await prisma_1.prisma.jobPosition.findMany({
            include: { empresa: true },
        });
    },
    async findById(id) {
        return await prisma_1.prisma.jobPosition.findUnique({
            where: { id },
            include: { empresa: true, candidaturas: true },
        });
    },
    async findByEmpresa(empresaId) {
        return await prisma_1.prisma.jobPosition.findMany({
            where: { empresaId },
            include: { candidaturas: true },
        });
    },
    async create(vaga) {
        return await prisma_1.prisma.jobPosition.create({
            data: vaga,
        });
    },
    async update(id, vaga) {
        return await prisma_1.prisma.jobPosition.update({
            where: { id },
            data: vaga,
        });
    },
    async delete(id) {
        return await prisma_1.prisma.jobPosition.delete({
            where: { id },
        });
    },
};
