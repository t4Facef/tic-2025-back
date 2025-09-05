import { PrismaClient } from "@prisma/client";

// Evita recriar várias instâncias do Prisma em ambiente de desenvolvimento
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Exporta a instância do Prisma, reaproveitando se já existir
export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ log: ["warn", "error"] });

// Em dev, guarda a instância no escopo global (evita reconexões desnecessárias)
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
