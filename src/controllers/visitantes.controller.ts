import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const registrarVisitante = async (req: Request, res: Response) => {
  try {
    const { origem } = req.body;
    const ip = req.ip || req.connection.remoteAddress || req.socket.remoteAddress || 'unknown';
    const userAgent = req.get('User-Agent') || 'unknown';

    const visitante = await prisma.visitante.create({
      data: {
        ip: ip.length > 45 ? ip.substring(0, 45) : ip, // Limitar IP
        userAgent: userAgent.length > 255 ? userAgent.substring(0, 255) : userAgent, // Limitar UserAgent
        origem: origem || 'unknown'
      }
    });

    res.status(201).json({ 
      success: true, 
      id: visitante.id 
    });
  } catch (error) {
    console.error('Erro ao registrar visitante:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Erro interno do servidor' 
    });
  }
};

export const obterEstatisticasVisitantes = async (req: Request, res: Response) => {
  try {
    // Últimos 30 dias
    const dataInicio = new Date();
    dataInicio.setDate(dataInicio.getDate() - 30);

    // Total de visitantes
    const totalVisitantes = await prisma.visitante.count();
    
    // Visitantes dos últimos 30 dias
    const visitantesRecentes = await prisma.visitante.count({
      where: {
        createdAt: {
          gte: dataInicio
        }
      }
    });

    // Visitantes por dia (últimos 7 dias)
    const visitantesPorDia = await prisma.$queryRaw`
      SELECT 
        DATE(created_at) as data,
        COUNT(*) as total
      FROM "Visitante" 
      WHERE created_at >= NOW() - INTERVAL '7 days'
      GROUP BY DATE(created_at)
      ORDER BY data DESC
    `;

    // Visitantes por origem
    const visitantesPorOrigem = await prisma.visitante.groupBy({
      by: ['origem'],
      _count: {
        id: true
      },
      where: {
        createdAt: {
          gte: dataInicio
        }
      },
      orderBy: {
        _count: {
          id: 'desc'
        }
      }
    });

    res.json({
      totalVisitantes,
      visitantesRecentes,
      visitantesPorDia,
      visitantesPorOrigem: visitantesPorOrigem
    });
  } catch (error) {
    console.error('Erro ao obter estatísticas:', error);
    res.status(500).json({ 
      error: 'Erro ao obter estatísticas' 
    });
  }
};