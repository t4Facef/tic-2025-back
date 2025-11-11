import { Request, Response } from "express";
import { CandidatoBarreiraService } from "../services/candidato-barreira.service";

export const CandidatoBarreiraController = {
  async getByCandidato(req: Request, res: Response) {
    try {
      const candidatoId = Number(req.params.candidatoId);
      const data = await CandidatoBarreiraService.findByCandidato(candidatoId);
      res.json(data);
    } catch (error: any) {
      res.status(error.status || 400).json({ error: error.message });
    }
  },

  async getByBarreira(req: Request, res: Response) {
    try {
      const barreiraId = Number(req.params.barreiraId);
      const data = await CandidatoBarreiraService.findByBarreira(barreiraId);
      res.json(data);
    } catch (error: any) {
      res.status(error.status || 400).json({ error: error.message });
    }
  },

  async vincular(req: Request, res: Response) {
    try {
      const { candidatoId, barreiraId } = req.body;
      const result = await CandidatoBarreiraService.vincular(candidatoId, barreiraId);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(error.status || 400).json({ error: error.message });
    }
  },

  async desvincular(req: Request, res: Response) {
    try {
      const { candidatoId, barreiraId } = req.body;
      const result = await CandidatoBarreiraService.desvincular(candidatoId, barreiraId);
      res.json(result);
    } catch (error: any) {
      res.status(error.status || 400).json({ error: error.message });
    }
  },

  async atualizarBarreirasBatch(req: Request, res: Response) {
    try {
      const candidatoId = Number(req.params.candidatoId);
      const { barreiraIds } = req.body;
      const result = await CandidatoBarreiraService.atualizarBarreirasBatch(candidatoId, barreiraIds);
      res.json(result);
    } catch (error: any) {
      res.status(error.status || 400).json({ error: error.message });
    }
  },

  // Endpoint para uso próprio do candidato (usando token JWT)
  async atualizarMinhasBarreiras(req: Request, res: Response) {
    try {
      const candidatoId = (req as any).user.id;
      const { barreiraIds } = req.body;
      const result = await CandidatoBarreiraService.atualizarBarreirasBatch(candidatoId, barreiraIds);
      res.json(result);
    } catch (error: any) {
      res.status(error.status || 400).json({ error: error.message });
    }
  },

  async inicializarBarreirasPorSubtipo(req: Request, res: Response) {
    try {
      const candidatoId = Number(req.params.candidatoId);
      const { subtipoIds } = req.body;
      const result = await CandidatoBarreiraService.inicializarBarreirasPorSubtipo(candidatoId, subtipoIds);
      res.json(result);
    } catch (error: any) {
      res.status(error.status || 400).json({ error: error.message });
    }
  },

  // Endpoint para uso próprio do candidato (usando token JWT)
  async inicializarMinhasBarreirasPorSubtipo(req: Request, res: Response) {
    try {
      const candidatoId = (req as any).user.id;
      const { subtipoIds } = req.body;
      const result = await CandidatoBarreiraService.inicializarBarreirasPorSubtipo(candidatoId, subtipoIds);
      res.json(result);
    } catch (error: any) {
      res.status(error.status || 400).json({ error: error.message });
    }
  }
};