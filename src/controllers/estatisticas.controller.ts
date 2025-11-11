import { Request, Response } from "express";
import { EstatisticasService } from "../services/estatisticas.service";

export const EstatisticasController = {
  async obterEstatisticasCandidato(req: Request, res: Response) {
    try {
      const candidatoId = Number(req.params.candidatoId);
      const estatisticas = await EstatisticasService.obterEstatisticasCandidato(candidatoId);
      res.json(estatisticas);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async obterEstatisticasEmpresa(req: Request, res: Response) {
    try {
      const empresaId = Number(req.params.empresaId);
      const estatisticas = await EstatisticasService.obterEstatisticasEmpresa(empresaId);
      res.json(estatisticas);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async obterEstatisticasAdmin(_req: Request, res: Response) {
    try {
      const estatisticas = await EstatisticasService.obterEstatisticasAdmin();
      res.json(estatisticas);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
};