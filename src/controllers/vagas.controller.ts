import { Request, Response } from "express";
import { VagasService } from "../services/vagas.service";

export const VagasController = {
  async list(_req: Request, res: Response) {
    try {
      const data = await VagasService.list();
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = await VagasService.findById(id);
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async getByEmpresa(req: Request, res: Response) {
    try {
      const empresaId = Number(req.params.empresaId);
      const data = await VagasService.findByEmpresa(empresaId);
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const vaga = req.body;
      const created = await VagasService.create(vaga);
      res.status(201).json(created);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const vaga = req.body;
      const updated = await VagasService.update(id, vaga);
      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await VagasService.delete(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },
};