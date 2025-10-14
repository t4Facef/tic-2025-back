import { Request, Response } from "express";
import { EstatisticasService } from "../services/estatisticas.service";

export const EstatisticasController = {
  async obterEstatisticas(_req: Request, res: Response) {
    try {
      const estatisticas = await EstatisticasService.obterEstatisticas();
      res.json(estatisticas);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
};