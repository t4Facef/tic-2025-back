import { Request, Response } from "express";
import { HabilidadesService } from "../services/habilidades.service";

export const HabilidadesController = {
  async list(_req: Request, res: Response) {
    const data = await HabilidadesService.list();
    res.json(data);
  },

  async getByCandidato(req: Request, res: Response) {
    const candidatoId = Number(req.params.candidatoId);
    const data = await HabilidadesService.findByCandidato(candidatoId);
    res.json(data);
  },

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = await HabilidadesService.findById(id);
    res.json(data);
  },

  async create(req: Request, res: Response) {
    const habilidade = req.body;
    const created = await HabilidadesService.create(habilidade);
    res.status(201).json(created);
  },

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { nome } = req.body;
    const updated = await HabilidadesService.update(id, nome);
    res.json(updated);
  },

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    await HabilidadesService.delete(id);
    res.status(204).send();
  },
};