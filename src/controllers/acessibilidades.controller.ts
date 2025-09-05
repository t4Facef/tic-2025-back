import { Request, Response } from "express";
import { AcessService } from "../services/acessibilidades.service";

// Controller das Acessibilidades
export const AcessibilidadesController = {
  // GET /acessibilidades
  async list(_req: Request, res: Response) {
    const data = await AcessService.list();
    res.json(data);
  },

  // POST /acessibilidades
  async create(req: Request, res: Response) {
    const { descricao } = req.body ?? {};
    const created = await AcessService.create(descricao);
    res.status(201).json(created);
  },
};
