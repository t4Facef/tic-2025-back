import { Request, Response } from "express";
import { TiposService } from "../services/tipos.service";

// Controller dos Tipos
export const TiposController = {
  // GET /tipos
  async list(_req: Request, res: Response) {
    try {
      const data = await TiposService.list();
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  // GET /tipos/com-subtipos
  async listWithSubtipos(_req: Request, res: Response) {
    try {
      const data = await TiposService.listWithSubtipos();
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  // POST /tipos
  async create(req: Request, res: Response) {
    try {
      const { nome } = req.body ?? {}; // pega o campo "nome" do corpo
      const created = await TiposService.create(nome);
      res.status(201).json(created);
    } catch (error: any) {
      res.status(error.status || 400).json({ error: error.message });
    }
  },
};
