import { Request, Response } from "express";
import { NotificacoesService } from "../services/notificacoes.service";

export const NotificacoesController = {
  async create(req: Request, res: Response) {
    try {
      const { titulo, conteudo, candidatoIds, empresaIds, remetenteEmpresaId } = req.body;
      const notificacao = await NotificacoesService.create({
        titulo,
        conteudo,
        candidatoIds,
        empresaIds,
        remetenteEmpresaId
      });
      res.status(201).json(notificacao);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async getNotificacoesCandidato(req: Request, res: Response) {
    try {
      const candidatoId = Number(req.params.candidatoId);
      const notificacoes = await NotificacoesService.getNotificacoesCandidato(candidatoId);
      res.json(notificacoes);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async getNotificacoesEmpresa(req: Request, res: Response) {
    try {
      const empresaId = Number(req.params.empresaId);
      const notificacoes = await NotificacoesService.getNotificacoesEmpresa(empresaId);
      res.json(notificacoes);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async marcarComoLidaCandidato(req: Request, res: Response) {
    try {
      const { notificacaoId, candidatoId } = req.params;
      await NotificacoesService.marcarComoLidaCandidato(
        Number(notificacaoId),
        Number(candidatoId)
      );
      res.json({ message: "Notificação marcada como lida" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async marcarComoLidaEmpresa(req: Request, res: Response) {
    try {
      const { notificacaoId, empresaId } = req.params;
      await NotificacoesService.marcarComoLidaEmpresa(
        Number(notificacaoId),
        Number(empresaId)
      );
      res.json({ message: "Notificação marcada como lida" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAllNotificacoesCandidato(req: Request, res: Response) {
    try {
      const candidatoId = Number(req.params.candidatoId);
      const notificacoes = await NotificacoesService.getAllNotificacoesCandidato(candidatoId);
      res.json(notificacoes);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAllNotificacoesEmpresa(req: Request, res: Response) {
    try {
      const empresaId = Number(req.params.empresaId);
      const notificacoes = await NotificacoesService.getAllNotificacoesEmpresa(empresaId);
      res.json(notificacoes);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
};