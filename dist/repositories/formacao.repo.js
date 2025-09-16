"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormacaoRepository = void 0;
const prisma_1 = require("./prisma");
exports.FormacaoRepository = {
    async findAll() {
        return await prisma_1.prisma.formacaoOuCurso.findMany({
            include: { candidato: true },
        });
    },
    async findById(id) {
        return await prisma_1.prisma.formacaoOuCurso.findUnique({
            where: { id },
            include: { candidato: true },
        });
    },
    async findByCandidato(candidatoId) {
        return await prisma_1.prisma.formacaoOuCurso.findMany({
            where: { candidatoId },
        });
    },
    async create(formacao) {
        return await prisma_1.prisma.formacaoOuCurso.create({
            data: formacao,
        });
    },
    async update(id, formacao) {
        return await prisma_1.prisma.formacaoOuCurso.update({
            where: { id },
            data: formacao,
        });
    },
    async delete(id) {
        return await prisma_1.prisma.formacaoOuCurso.delete({
            where: { id },
        });
    },
};
