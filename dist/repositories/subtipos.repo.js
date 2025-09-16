"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubtiposRepo = void 0;
const prisma_1 = require("./prisma");
// Repositório para subtipoDeficiencia
exports.SubtiposRepo = {
    // Busca subtipo pelo ID simples
    findById(id) {
        return prisma_1.prisma.subtipoDeficiencia.findUnique({ where: { id } });
    },
    // Busca detalhada (subtipo + tipo + barreiras + acessibilidades)
    findDeepById(id) {
        return prisma_1.prisma.subtipoDeficiencia.findUnique({
            where: { id },
            include: {
                tipo: true, // inclui o tipo pai
                barreiras: {
                    include: {
                        barreira: {
                            include: {
                                acessibilidades: {
                                    include: { acessibilidade: true },
                                    orderBy: { acessibilidadeId: "asc" },
                                },
                            },
                        },
                    },
                    orderBy: { barreiraId: "asc" },
                },
            },
        });
    },
    // Cria um novo subtipo vinculado a um tipo
    create(nome, tipoId) {
        return prisma_1.prisma.subtipoDeficiencia.create({ data: { nome, tipoId } });
    },
};
