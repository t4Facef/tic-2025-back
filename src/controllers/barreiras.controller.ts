import { Request, Response } from "express";
import { BarreirasService } from "../services/barreiras.service";

// Controller das Barreiras
export const BarreirasController = {
  // GET /barreiras
  async list(_req: Request, res: Response) {
    try {
      const data = await BarreirasService.list();
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  // POST /barreiras
  async create(req: Request, res: Response) {
    try {
      const { descricao } = req.body ?? {};
      const created = await BarreirasService.create(descricao);
      res.status(201).json(created);
    } catch (error: any) {
      res.status(error.status || 400).json({ error: error.message });
    }
  },
};
