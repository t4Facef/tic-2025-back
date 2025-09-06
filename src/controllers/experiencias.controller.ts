import { Request, Response } from "express";
import { ExperienciasService } from "../services/experiencias.service";

export const ExperienciasController = {
  async list(_req: Request, res: Response) {
    const data = await ExperienciasService.list();
    res.json(data);
  },

  async getByCandidato(req: Request, res: Response) {
    const candidatoId = Number(req.params.candidatoId);
    const data = await ExperienciasService.findByCandidato(candidatoId);
    res.json(data);
  },

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = await ExperienciasService.findById(id);
    res.json(data);
  },

  async create(req: Request, res: Response) {
    const experiencia = req.body;
    const created = await ExperienciasService.create(experiencia);
    res.status(201).json(created);
  },

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const experiencia = req.body;
    const updated = await ExperienciasService.update(id, experiencia);
    res.json(updated);
  },

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    await ExperienciasService.delete(id);
    res.status(204).send();
  },
};