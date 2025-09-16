import { Request, Response } from "express";
import { CandidaturasService } from "../services/candidaturas.service";

export const CandidaturasController = {
  async list(_req: Request, res: Response) {
    try {
      const data = await CandidaturasService.list();
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async getByCandidato(req: Request, res: Response) {
    try {
      const candidatoId = Number(req.params.candidatoId);
      const data = await CandidaturasService.findByCandidato(candidatoId);
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async getByVaga(req: Request, res: Response) {
    try {
      const vagaId = Number(req.params.vagaId);
      const data = await CandidaturasService.findByVaga(vagaId);
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { candidatoId, vagaId } = req.body;
      const created = await CandidaturasService.create(candidatoId, vagaId);
      res.status(201).json(created);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async updateStatus(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { status } = req.body;
      const updated = await CandidaturasService.updateStatus(id, status);
      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await CandidaturasService.delete(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },
};