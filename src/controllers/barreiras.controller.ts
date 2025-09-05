import { Request, Response } from "express";
import { BarreirasService } from "../services/barreiras.service";

// Controller das Barreiras
export const BarreirasController = {
  // GET /barreiras
  async list(_req: Request, res: Response) {
    const data = await BarreirasService.list();
    res.json(data);
  },

  // POST /barreiras
  async create(req: Request, res: Response) {
    const { descricao } = req.body ?? {};
    const created = await BarreirasService.create(descricao);
    res.status(201).json(created);
  },
};
