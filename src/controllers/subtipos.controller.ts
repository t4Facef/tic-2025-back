import { Request, Response } from "express";
import { SubtiposService } from "../services/subtipos.service";

// Controller dos Subtipos
export const SubtiposController = {
  // GET /subtipos/:id → busca detalhada
  async getOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = await SubtiposService.findDeep(id);
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  // POST /subtipos
  async create(req: Request, res: Response) {
    try {
      const { nome, tipoId } = req.body ?? {};
      const created = await SubtiposService.create(nome, Number(tipoId));
      res.status(201).json(created);
    } catch (error: any) {
      res.status(error.status || 400).json({ error: error.message });
    }
  },
};
