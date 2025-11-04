import { Request, Response } from "express";
import { AcessService } from "../services/acessibilidades.service";

// Controller das Acessibilidades
export const AcessibilidadesController = {
  // GET /acessibilidades
  async list(_req: Request, res: Response) {
    try {
      const data = await AcessService.list();
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  // GET /acessibilidades/
  async listNames(req: Request, res: Response){
    try{
      const data = await AcessService.listNames()
      res.json(data)
    }catch(error: any){
      res.status(400).json({ error: error.message });
    }
  },

  // GET /acessibilidades/empresa/:empresaId
  async listByEmpresa(req: Request, res: Response) {
    try {
      const empresaId = Number(req.params.empresaId);
      const data = await AcessService.listByEmpresa(empresaId);
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  // GET /acessibilidades/:id
  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = await AcessService.findById(id);
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  // POST /acessibilidades
  async create(req: Request, res: Response) {
    try {
      const { nome } = req.body ?? {};
      const created = await AcessService.create(nome);
      res.status(201).json(created);
    } catch (error: any) {
      res.status(error.status || 400).json({ error: error.message });
    }
  },

  // GET /acessibilidades/barreira/:barreiraId
  async getByBarreira(req: Request, res: Response) {
    try {
      const barreiraId = Number(req.params.barreiraId);
      const data = await AcessService.getByBarreira(barreiraId);
      res.json(data);
    } catch (error: any) {
      res.status(error.status || 400).json({ error: error.message });
    }
  },

  // POST /acessibilidades/vincular-barreira
  async vincularBarreira(req: Request, res: Response) {
    try {
      const { barreiraId, nome } = req.body;
      const acessibilidade = await AcessService.createAndVincular(nome, barreiraId);
      res.status(201).json(acessibilidade);
    } catch (error: any) {
      res.status(error.status || 400).json({ error: error.message });
    }
  },

  // DELETE /acessibilidades/:id
  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await AcessService.delete(id);
      res.json({ message: "Acessibilidade deletada com sucesso" });
    } catch (error: any) {
      res.status(error.status || 400).json({ error: error.message });
    }
  },
};
