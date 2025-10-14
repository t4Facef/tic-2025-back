import { Request, Response } from "express";
import { CompatibilidadeService } from "../services/compatibilidade.service";

export const CompatibilidadeController = {
  // GET /compatibilidade/candidato/:candidatoId/vaga/:vagaId
  async calcularCompatibilidade(req: Request, res: Response) {
    try {
      const candidatoId = Number(req.params.candidatoId);
      const vagaId = Number(req.params.vagaId);
      
      const compatibilidade = await CompatibilidadeService.calcularCompatibilidade(candidatoId, vagaId);
      
      res.json({
        candidatoId,
        vagaId,
        compatibilidade: `${(compatibilidade * 100).toFixed(1)}%`,
        compatibilidadeDecimal: compatibilidade
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  // GET /compatibilidade/candidato/:candidatoId/vagas
  async listarVagasCompatibilidade(req: Request, res: Response) {
    try {
      const candidatoId = Number(req.params.candidatoId);
      
      const compatibilidades = await CompatibilidadeService.calcularCompatibilidadeParaTodasVagas(candidatoId);
      
      const resultado = compatibilidades.map(item => ({
        ...item,
        compatibilidadeFormatada: `${(item.compatibilidade * 100).toFixed(1)}%`
      }));
      
      res.json(resultado);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  // PUT /compatibilidade/vaga/:vagaId/atualizar
  async atualizarCompatibilidadeVaga(req: Request, res: Response) {
    try {
      const vagaId = Number(req.params.vagaId);
      
      const compatibilidadeMedia = await CompatibilidadeService.atualizarCompatibilidadeVaga(vagaId);
      
      res.json({
        vagaId,
        compatibilidadeMedia: `${(compatibilidadeMedia * 100).toFixed(1)}%`,
        compatibilidadeDecimal: compatibilidadeMedia,
        message: "Compatibilidade da vaga atualizada com sucesso"
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  // GET /compatibilidade/vaga/:vagaId/candidatos
  async listarCandidatosCompatibilidade(req: Request, res: Response) {
    try {
      const vagaId = Number(req.params.vagaId);
      
      // Buscar todos os candidatos
      const { PrismaClient } = require("@prisma/client");
      const prisma = new PrismaClient();
      
      const candidatos = await prisma.candidato.findMany({
        select: {
          id: true,
          nome: true,
          email: true,
          areaInteresse: true
        }
      });

      const compatibilidades = [];

      for (const candidato of candidatos) {
        try {
          const compatibilidade = await CompatibilidadeService.calcularCompatibilidade(candidato.id, vagaId);
          compatibilidades.push({
            candidato,
            compatibilidade: compatibilidade,
            compatibilidadeFormatada: `${(compatibilidade * 100).toFixed(1)}%`
          });
        } catch (error) {
          console.error(`Erro ao calcular compatibilidade para candidato ${candidato.id}:`, error);
        }
      }

      // Ordenar por compatibilidade decrescente
      compatibilidades.sort((a, b) => b.compatibilidade - a.compatibilidade);
      
      res.json(compatibilidades);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
};