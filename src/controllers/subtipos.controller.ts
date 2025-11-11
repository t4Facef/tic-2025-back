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

  // PUT /subtipos/:id
  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { nome } = req.body ?? {};
      const updated = await SubtiposService.update(id, nome);
      res.json(updated);
    } catch (error: any) {
      res.status(error.status || 400).json({ error: error.message });
    }
  },

  async getByTipoId(req: Request, res: Response) {
    try {
      const tipoId = Number(req.params.id);
      const data = await SubtiposService.getByTipoId(tipoId);
      res.json(data);
    } catch (error: any) {
      res.status(error.status || 400).json({ error: error.message });
    }
  },

  // DELETE /subtipos/:id
  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await SubtiposService.delete(id);
      res.json({ message: "Subtipo deletado com sucesso" });
    } catch (error: any) {
      res.status(error.status || 400).json({ error: error.message });
    }
  }
};
