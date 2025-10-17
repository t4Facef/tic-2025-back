import { Request, Response } from "express";
import { CandidatoService } from "../services/candidato.service";

export const CandidatoController = {
  async getProfile(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const candidato = await CandidatoService.getProfile(userId);
      res.json(candidato);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const candidato = await CandidatoService.update(id, req.body);
      res.json(candidato);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
};