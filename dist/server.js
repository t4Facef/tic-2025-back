"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rotas de autenticação
app.use('/api/auth', auth_routes_1.default);
// Rotas de Candidatos
app.get('/api/candidatos', async (req, res) => {
    try {
        const candidatos = await prisma.candidato.findMany({
            include: { endereco: true, formacoes: true, candidaturas: true }
        });
        res.json(candidatos);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar candidatos' });
    }
});
app.post('/api/candidatos', async (req, res) => {
    try {
        const candidato = await prisma.candidato.create({
            data: req.body
        });
        res.json(candidato);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao criar candidato' });
    }
});
app.get('/api/candidatos/:id', async (req, res) => {
    try {
        const candidato = await prisma.candidato.findUnique({
            where: { id: parseInt(req.params.id) },
            include: { endereco: true, formacoes: true, candidaturas: true }
        });
        res.json(candidato);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar candidato' });
    }
});
// Rotas de Empresas
app.get('/api/empresas', async (req, res) => {
    try {
        const empresas = await prisma.empresa.findMany({
            include: { endereco: true, vagas: true }
        });
        res.json(empresas);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar empresas' });
    }
});
app.post('/api/empresas', async (req, res) => {
    try {
        const empresa = await prisma.empresa.create({
            data: req.body
        });
        res.json(empresa);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao criar empresa' });
    }
});
app.get('/api/empresas/:id', async (req, res) => {
    try {
        const empresa = await prisma.empresa.findUnique({
            where: { id: parseInt(req.params.id) },
            include: { endereco: true, vagas: true }
        });
        res.json(empresa);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar empresa' });
    }
});
// Rotas de Vagas
app.get('/api/vagas', async (req, res) => {
    try {
        const vagas = await prisma.jobPosition.findMany({
            include: { empresa: true, candidaturas: { include: { candidato: true } } }
        });
        res.json(vagas);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar vagas' });
    }
});
app.post('/api/vagas', async (req, res) => {
    try {
        const vaga = await prisma.jobPosition.create({
            data: req.body
        });
        res.json(vaga);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao criar vaga' });
    }
});
app.get('/api/vagas/:id', async (req, res) => {
    try {
        const vaga = await prisma.jobPosition.findUnique({
            where: { id: parseInt(req.params.id) },
            include: { empresa: true, candidaturas: { include: { candidato: true } } }
        });
        res.json(vaga);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar vaga' });
    }
});
// Rotas de Candidaturas
app.post('/api/candidaturas', async (req, res) => {
    try {
        const candidatura = await prisma.application.create({
            data: req.body
        });
        res.json(candidatura);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao criar candidatura' });
    }
});
app.get('/api/candidaturas', async (req, res) => {
    try {
        const candidaturas = await prisma.application.findMany({
            include: { candidato: true, vaga: true }
        });
        res.json(candidaturas);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar candidaturas' });
    }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
