import { Request, Response } from "express";
import { VagasService } from "../services/vagas.service";

export const VagasController = {
  async list(_req: Request, res: Response) {
    const data = await VagasService.list();
    res.json(data);
  },

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = await VagasService.findById(id);
    res.json(data);
  },

  async getByEmpresa(req: Request, res: Response) {
    const empresaId = Number(req.params.empresaId);
    const data = await VagasService.findByEmpresa(empresaId);
    res.json(data);
  },

  async create(req: Request, res: Response) {
    const vaga = req.body;
    const created = await VagasService.create(vaga);
    res.status(201).json(created);
  },

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const vaga = req.body;
    const updated = await VagasService.update(id, vaga);
    res.json(updated);
  },

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    await VagasService.delete(id);
    res.status(204).send();
  },
};