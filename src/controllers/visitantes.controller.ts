import { Request, Response } from "express";
import { prisma } from '../lib/prisma';

export const VisitantesController = {
  async registrarVisitante(req: Request, res: Response) {
    try {
      const origem = req.body?.origem || 'unknown';
      const ip = req.ip || 'unknown';
      const userAgent = req.get('User-Agent') || 'unknown';

      const visitante = await prisma.visitante.create({
        data: {
          ip: ip.length > 45 ? ip.substring(0, 45) : ip,
          userAgent: userAgent.length > 255 ? userAgent.substring(0, 255) : userAgent,
          origem: origem.length > 100 ? origem.substring(0, 100) : origem
        }
      });

      res.status(201).json({ 
        success: true, 
        id: visitante.id 
      });
    } catch (error: any) {
      console.error('Erro ao registrar visitante:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Erro interno do servidor' 
      });
    }
  },

  async obterEstatisticasVisitantes(req: Request, res: Response) {
    try {
      const totalVisitantes = await prisma.visitante.count();
      
      const dataInicio = new Date();
      dataInicio.setDate(dataInicio.getDate() - 30);
      
      const visitantesRecentes = await prisma.visitante.count({
        where: {
          createdAt: {
            gte: dataInicio
          }
        }
      });

      res.json({
        totalVisitantes,
        visitantesRecentes,
        visitantesPorDia: [],
        visitantesPorOrigem: []
      });
    } catch (error: any) {
      console.error('Erro ao obter estatísticas:', error);
      res.status(500).json({ 
        error: 'Erro ao obter estatísticas' 
      });
    }
  }
};