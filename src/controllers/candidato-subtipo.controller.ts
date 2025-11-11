import { Request, Response } from "express";
import { CandidatoSubtipoService } from "../services/candidato-subtipo.service";

export const CandidatoSubtipoController = {
  async getByCandidato(req: Request, res: Response) {
    try {
      const candidatoId = Number(req.params.candidatoId);
      const data = await CandidatoSubtipoService.findByCandidato(candidatoId);
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async getBySubtipo(req: Request, res: Response) {
    try {
      const subtipoId = Number(req.params.subtipoId);
      const data = await CandidatoSubtipoService.findBySubtipo(subtipoId);
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async vincular(req: Request, res: Response) {
    try {
      const { candidatoId, subtipoId } = req.body;
      const created = await CandidatoSubtipoService.vincular(candidatoId, subtipoId);
      res.status(201).json(created);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async desvincular(req: Request, res: Response) {
    try {
      const { candidatoId, subtipoId } = req.body;
      await CandidatoSubtipoService.desvincular(candidatoId, subtipoId);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async atualizarSubtiposBatch(req: Request, res: Response) {
    try {
      const candidatoId = Number(req.params.candidatoId);
      const { subtipoIds } = req.body;
      const results = await CandidatoSubtipoService.atualizarSubtiposBatch(candidatoId, subtipoIds);
      res.json(results);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },
};