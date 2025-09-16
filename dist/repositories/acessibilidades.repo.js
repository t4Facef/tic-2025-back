"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcessRepo = void 0;
const prisma_1 = require("./prisma");
// Repositório da tabela acessibilidade
exports.AcessRepo = {
    // Lista todas as acessibilidades
    list() {
        return prisma_1.prisma.acessibilidade.findMany({ orderBy: { id: "asc" } });
    },
    // Cria uma nova acessibilidade
    create(descricao) {
        return prisma_1.prisma.acessibilidade.create({ data: { descricao } });
    },
    // Busca acessibilidade por ID
    findById(id) {
        return prisma_1.prisma.acessibilidade.findUnique({ where: { id } });
    },
};
