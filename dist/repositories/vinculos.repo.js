"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VinculosRepo = void 0;
const prisma_1 = require("./prisma");
// Repositório que gerencia relações N:N
exports.VinculosRepo = {
    // Vincula barreiras a um subtipo (N:N)
    vincularBarreirasSubtipo(subtipoId, barreiraIds) {
        return prisma_1.prisma.subtipoBarreira.createMany({
            data: barreiraIds.map((barreiraId) => ({ subtipoId, barreiraId })),
            skipDuplicates: true, // evita inserir duplicados
        });
    },
    // Vincula acessibilidades a uma barreira (N:N)
    vincularAcessBarreira(barreiraId, acessibilidadeIds) {
        return prisma_1.prisma.barreiraAcessibilidade.createMany({
            data: acessibilidadeIds.map((acessibilidadeId) => ({
                barreiraId,
                acessibilidadeId,
            })),
            skipDuplicates: true,
        });
    },
};
