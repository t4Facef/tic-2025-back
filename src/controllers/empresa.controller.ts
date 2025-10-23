import { Request, Response } from "express";
import { EmpresaService } from "../services/empresa.service";

export const EmpresaController = {
  async getProfile(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const empresa = await EmpresaService.getProfile(userId);
      res.json(empresa);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async getProfileById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const empresa = await EmpresaService.getProfile(id);
      res.json(empresa);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const empresa = await EmpresaService.update(id, req.body);
      res.json(empresa);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
};