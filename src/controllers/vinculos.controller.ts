import { Request, Response } from "express";
import { VinculosService } from "../services/vinculos.service";

// Controller para vincular relacionamentos N:N
export const VinculosController = {
  // POST /subtipos/:id/barreiras → vincula barreiras a um subtipo
  async vincularBarreiras(req: Request, res: Response) {
    try {
      const subtipoId = Number(req.params.id);
      const { barreiraIds } = req.body ?? {};
      const result = await VinculosService.vincularBarreiras(subtipoId, barreiraIds);
      res.json(result);
    } catch (error: any) {
      res.status(error.status || 400).json({ error: error.message });
    }
  },

  // POST /barreiras/:id/acessibilidades → vincula acessibilidades a uma barreira
  async vincularAcessibilidades(req: Request, res: Response) {
    try {
      const barreiraId = Number(req.params.id);
      const { acessibilidadeIds } = req.body ?? {};
      const result = await VinculosService.vincularAcessibilidades(barreiraId, acessibilidadeIds);
      res.json(result);
    } catch (error: any) {
      res.status(error.status || 400).json({ error: error.message });
    }
  },

  // DELETE /barreiras/:barreiraId/acessibilidades/:acessibilidadeId → desvincula acessibilidade de barreira
  async desvincularAcessibilidade(req: Request, res: Response) {
    try {
      const barreiraId = Number(req.params.barreiraId);
      const acessibilidadeId = Number(req.params.acessibilidadeId);
      const result = await VinculosService.desvincularAcessibilidade(barreiraId, acessibilidadeId);
      res.json(result);
    } catch (error: any) {
      res.status(error.status || 400).json({ error: error.message });
    }
  },
};
