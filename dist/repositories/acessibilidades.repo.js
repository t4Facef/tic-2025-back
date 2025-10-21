"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcessRepo = void 0;
const prisma_1 = require("./prisma");
// Repositório da tabela acessibilidade
exports.AcessRepo = {
    // Lista todas as acessibilidades
    list() {
        return prisma_1.prisma.acessibilidade.findMany({
            orderBy: { id: "asc" },
            include: {
                EmpresaAcessibilidade: {
                    include: { empresa: true }
                }
            }
        });
    },
    listNames() {
        return prisma_1.prisma.acessibilidade.findMany({
            select: {
                id: true,
                nome: true
            },
            orderBy: { nome: "asc" }
        });
    },
    // Cria uma nova acessibilidade padrão
    create(nome) {
        return prisma_1.prisma.acessibilidade.create({
            data: { nome }
        });
    },
    // Busca acessibilidade por ID
    findById(id) {
        return prisma_1.prisma.acessibilidade.findUnique({
            where: { id },
            include: {
                EmpresaAcessibilidade: {
                    include: { empresa: true }
                }
            }
        });
    },
    // Busca acessibilidades por empresa
    findByEmpresa(empresaId) {
        return prisma_1.prisma.acessibilidade.findMany({
            where: {
                EmpresaAcessibilidade: {
                    some: { empresaId }
                }
            },
            orderBy: { id: "asc" }
        });
    },
};
