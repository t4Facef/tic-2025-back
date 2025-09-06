import { Request, Response } from "express";
import { CandidatoSubtipoService } from "../services/candidato-subtipo.service";

export const CandidatoSubtipoController = {
  async getByCandidato(req: Request, res: Response) {
    const candidatoId = Number(req.params.candidatoId);
    const data = await CandidatoSubtipoService.findByCandidato(candidatoId);
    res.json(data);
  },

  async getBySubtipo(req: Request, res: Response) {
    const subtipoId = Number(req.params.subtipoId);
    const data = await CandidatoSubtipoService.findBySubtipo(subtipoId);
    res.json(data);
  },

  async vincular(req: Request, res: Response) {
    const { candidatoId, subtipoId } = req.body;
    const created = await CandidatoSubtipoService.vincular(candidatoId, subtipoId);
    res.status(201).json(created);
  },

  async desvincular(req: Request, res: Response) {
    const { candidatoId, subtipoId } = req.body;
    await CandidatoSubtipoService.desvincular(candidatoId, subtipoId);
    res.status(204).send();
  },
};