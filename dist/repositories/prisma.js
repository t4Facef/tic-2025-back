"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
// Evita recriar várias instâncias do Prisma em ambiente de desenvolvimento
const globalForPrisma = globalThis;
// Exporta a instância do Prisma, reaproveitando se já existir
exports.prisma = globalForPrisma.prisma ?? new client_1.PrismaClient({ log: ["warn", "error"] });
// Em dev, guarda a instância no escopo global (evita reconexões desnecessárias)
if (process.env.NODE_ENV !== "production")
    globalForPrisma.prisma = exports.prisma;
