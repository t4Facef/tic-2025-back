import { Request, Response } from "express";
import { SubtiposService } from "../services/subtipos.service";

// Controller dos Subtipos
export const SubtiposController = {
  // GET /subtipos/:id → busca detalhada
  async getOne(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = await SubtiposService.findDeep(id);
    res.json(data);
  },

  // POST /subtipos
  async create(req: Request, res: Response) {
    const { nome, tipoId } = req.body ?? {};
    const created = await SubtiposService.create(nome, Number(tipoId));
    res.status(201).json(created);
  },
};
