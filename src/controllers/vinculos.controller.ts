import { Request, Response } from "express";
import { VinculosService } from "../services/vinculos.service";

// Controller para vincular relacionamentos N:N
export const VinculosController = {
  // POST /subtipos/:id/barreiras → vincula barreiras a um subtipo
  async vincularBarreiras(req: Request, res: Response) {
    const subtipoId = Number(req.params.id);
    const { barreiraIds } = req.body ?? {};
    const result = await VinculosService.vincularBarreiras(subtipoId, barreiraIds);
    res.json(result);
  },

  // POST /barreiras/:id/acessibilidades → vincula acessibilidades a uma barreira
  async vincularAcessibilidades(req: Request, res: Response) {
    const barreiraId = Number(req.params.id);
    const { acessibilidadeIds } = req.body ?? {};
    const result = await VinculosService.vincularAcessibilidades(barreiraId, acessibilidadeIds);
    res.json(result);
  },
};
