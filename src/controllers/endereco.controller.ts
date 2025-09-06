import { Request, Response } from "express";
import { EnderecoService } from "../services/endereco.service";

export const EnderecoController = {
  async list(_req: Request, res: Response) {
    const data = await EnderecoService.list();
    res.json(data);
  },

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = await EnderecoService.findById(id);
    res.json(data);
  },

  async create(req: Request, res: Response) {
    const endereco = req.body;
    const created = await EnderecoService.create(endereco);
    res.status(201).json(created);
  },

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const endereco = req.body;
    const updated = await EnderecoService.update(id, endereco);
    res.json(updated);
  },

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    await EnderecoService.delete(id);
    res.status(204).send();
  },
};