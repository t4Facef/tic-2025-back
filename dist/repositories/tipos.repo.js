"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TiposRepo = void 0;
const prisma_1 = require("./prisma");
// Repositório responsável pela tabela tipoDeficiencia
exports.TiposRepo = {
    // Lista todos os tipos, ordenados por ID
    list() {
        return prisma_1.prisma.tipoDeficiencia.findMany({ orderBy: { id: "asc" } });
    },
    // Lista tipos já trazendo os subtipos relacionados
    listWithSubtipos() {
        return prisma_1.prisma.tipoDeficiencia.findMany({
            orderBy: { id: "asc" },
            include: { subtipos: { orderBy: { id: "asc" } } },
        });
    },
    // Cria um novo tipo
    create(nome) {
        return prisma_1.prisma.tipoDeficiencia.create({ data: { nome } });
    },
    // Busca tipo pelo ID
    findById(id) {
        return prisma_1.prisma.tipoDeficiencia.findUnique({ where: { id } });
    },
};
