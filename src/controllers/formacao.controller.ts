import { Request, Response } from "express";
import { FormacaoService } from "../services/formacao.service";

export const FormacaoController = {
  async list(_req: Request, res: Response) {
    const data = await FormacaoService.list();
    res.json(data);
  },

  async getByCandidato(req: Request, res: Response) {
    const candidatoId = Number(req.params.candidatoId);
    const data = await FormacaoService.findByCandidato(candidatoId);
    res.json(data);
  },

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = await FormacaoService.findById(id);
    res.json(data);
  },

  async create(req: Request, res: Response) {
    const formacao = req.body;
    const created = await FormacaoService.create(formacao);
    res.status(201).json(created);
  },

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const formacao = req.body;
    const updated = await FormacaoService.update(id, formacao);
    res.json(updated);
  },

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    await FormacaoService.delete(id);
    res.status(204).send();
  },
};