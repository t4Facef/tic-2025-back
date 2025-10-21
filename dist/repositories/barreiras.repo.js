"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarreirasRepo = void 0;
const prisma_1 = require("./prisma");
// Repositório da tabela barreira
exports.BarreirasRepo = {
    // Lista todas as barreiras
    list() {
        return prisma_1.prisma.barreira.findMany({ orderBy: { id: "asc" } });
    },
    // Cria uma nova barreira
    create(descricao) {
        return prisma_1.prisma.barreira.create({ data: { descricao } });
    },
    // Busca barreiras por subtipo
    findBySubtipo(subtipoId) {
        return prisma_1.prisma.barreira.findMany({
            where: {
                subtipos: {
                    some: { subtipoId }
                }
            },
            include: {
                acessibilidades: {
                    include: {
                        acessibilidade: true
                    }
                }
            },
            orderBy: { id: "asc" }
        });
    },
    // Busca barreira por ID
    findById(id) {
        return prisma_1.prisma.barreira.findUnique({ where: { id } });
    },
    // Lista barreira e suas acessibilidades associadas
    listAcessibilidades(id) {
        return prisma_1.prisma.barreira.findUnique({
            where: { id },
            include: {
                acessibilidades: {
                    include: { acessibilidade: true },
                    orderBy: { acessibilidadeId: "asc" },
                },
            },
        });
    },
};
