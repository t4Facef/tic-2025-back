import { Request, Response } from "express";
import { TiposService } from "../services/tipos.service";

// Controller dos Tipos
export const TiposController = {
  // GET /tipos
  async list(_req: Request, res: Response) {
    const data = await TiposService.list();
    res.json(data);
  },

  // GET /tipos/com-subtipos
  async listWithSubtipos(_req: Request, res: Response) {
    const data = await TiposService.listWithSubtipos();
    res.json(data);
  },

  // POST /tipos
  async create(req: Request, res: Response) {
    const { nome } = req.body ?? {}; // pega o campo "nome" do corpo
    const created = await TiposService.create(nome);
    res.status(201).json(created);
  },
};
