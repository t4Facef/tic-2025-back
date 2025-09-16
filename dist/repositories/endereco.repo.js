"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnderecoRepository = void 0;
const prisma_1 = require("./prisma");
exports.EnderecoRepository = {
    async findAll() {
        return await prisma_1.prisma.endereco.findMany();
    },
    async findById(id) {
        return await prisma_1.prisma.endereco.findUnique({
            where: { id },
        });
    },
    async create(endereco) {
        return await prisma_1.prisma.endereco.create({
            data: endereco,
        });
    },
    async update(id, endereco) {
        return await prisma_1.prisma.endereco.update({
            where: { id },
            data: endereco,
        });
    },
    async delete(id) {
        return await prisma_1.prisma.endereco.delete({
            where: { id },
        });
    },
};
