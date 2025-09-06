import { Request, Response } from "express";
import { CandidaturasService } from "../services/candidaturas.service";

export const CandidaturasController = {
  async list(_req: Request, res: Response) {
    const data = await CandidaturasService.list();
    res.json(data);
  },

  async getByCandidato(req: Request, res: Response) {
    const candidatoId = Number(req.params.candidatoId);
    const data = await CandidaturasService.findByCandidato(candidatoId);
    res.json(data);
  },

  async getByVaga(req: Request, res: Response) {
    const vagaId = Number(req.params.vagaId);
    const data = await CandidaturasService.findByVaga(vagaId);
    res.json(data);
  },

  async create(req: Request, res: Response) {
    const { candidatoId, vagaId } = req.body;
    const created = await CandidaturasService.create(candidatoId, vagaId);
    res.status(201).json(created);
  },

  async updateStatus(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { status } = req.body;
    const updated = await CandidaturasService.updateStatus(id, status);
    res.json(updated);
  },

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    await CandidaturasService.delete(id);
    res.status(204).send();
  },
};