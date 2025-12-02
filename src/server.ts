import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';
import routes from './routes/index';

const app = express();
const prisma = new PrismaClient();

app.use(cors({
  origin: [
    'http://localhost:5173', 
    'http://localhost:3000',
    'https://tic-2025-front.vercel.app',
    'https://apojobs.vercel.app',
    process.env.FRONTEND_URL || 'http://localhost:5173'
  ],
  credentials: true
}));
app.use(express.json());

// Rotas públicas para fotos (sem autenticação) - ANTES das rotas protegidas
app.get('/api/arquivos/candidato/:candidatoId/foto/view', async (req, res) => {
  try {
    const candidatoId = Number(req.params.candidatoId);
    const fotoPath = path.join(process.cwd(), 'uploads', 'candidatos', candidatoId.toString(), 'foto.jpg');
    const defaultPath = path.join(process.cwd(), 'uploads', 'profile-default.jpg');
    
    if (fs.existsSync(fotoPath)) {
      res.setHeader('Content-Type', 'image/jpeg');
      res.sendFile(path.resolve(fotoPath));
    } else {
      res.setHeader('Content-Type', 'image/jpeg');
      res.sendFile(path.resolve(defaultPath));
    }
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar foto' });
  }
});

app.get('/api/arquivos/empresa/:empresaId/foto/view', async (req, res) => {
  try {
    const empresaId = Number(req.params.empresaId);
    const fotoPath = path.join(process.cwd(), 'uploads', 'empresas', empresaId.toString(), 'foto.jpg');
    const defaultPath = path.join(process.cwd(), 'uploads', 'profile-default.jpg');
    
    if (fs.existsSync(fotoPath)) {
      res.setHeader('Content-Type', 'image/jpeg');
      res.sendFile(path.resolve(fotoPath));
    } else {
      res.setHeader('Content-Type', 'image/jpeg');
      res.sendFile(path.resolve(defaultPath));
    }
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar foto' });
  }
});

// Todas as rotas
app.use('/api', routes);

// Rotas de Candidatos
app.get('/api/candidatos', async (req, res) => {
  try {
    const candidatos = await prisma.candidato.findMany({
      include: { endereco: true, formacoes: true, candidaturas: true }
    });
    res.json(candidatos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar candidatos' });
  }
});

app.post('/api/candidatos', async (req, res) => {
  try {
    const candidato = await prisma.candidato.create({
      data: req.body
    });
    res.json(candidato);
  } catch (error) {
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
  } catch (error) {
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
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar empresas' });
  }
});

app.post('/api/empresas', async (req, res) => {
  try {
    const empresa = await prisma.empresa.create({
      data: req.body
    });
    res.json(empresa);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar empresa' });
  }
});

app.get('/api/empresas/:id', async (req, res) => {
  try {
    const empresa = await prisma.empresa.findUnique({
      where: { id: parseInt(req.params.id) },
      select: { razaoSocial: true }
    });
    res.json(empresa);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar empresa' });
  }
});

// Rotas de Vagas
app.get('/api/vagas', async (req, res) => {
  try {
    const vagas = await prisma.vagas.findMany({
      include: { empresa: true, candidaturas: { include: { candidato: true } } }
    });
    res.json(vagas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar vagas' });
  }
});

app.post('/api/vagas', async (req, res) => {
  try {
    const vaga = await prisma.vagas.create({
      data: req.body
    });
    res.json(vaga);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar vaga' });
  }
});

app.get('/api/vagas/:id', async (req, res) => {
  try {
    const vaga = await prisma.vagas.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { empresa: true, candidaturas: { include: { candidato: true } } }
    });
    res.json(vaga);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar vaga' });
  }
});

// Rotas de Candidaturas
app.post('/api/candidaturas', async (req, res) => {
  try {
    const candidatura = await prisma.candidaturas.create({
      data: req.body
    });
    res.json(candidatura);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar candidatura' });
  }
});

app.get('/api/candidaturas', async (req, res) => {
  try {
    const candidaturas = await prisma.candidaturas.findMany({
      include: { candidato: true, vaga: true }
    });
    res.json(candidaturas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar candidaturas' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});