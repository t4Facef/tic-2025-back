import { Request, Response } from "express";
import { BarreirasService } from "../services/barreiras.service";

// Controller das Barreiras
export const BarreirasController = {
  // GET /barreiras
  async list(_req: Request, res: Response) {
    try {
      const data = await BarreirasService.list();
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  // GET /barreiras/subtipo/:subtipoId
  async getBySubtipo(req: Request, res: Response) {
    try {
      const subtipoId = Number(req.params.subtipoId);
      const data = await BarreirasService.getBySubtipo(subtipoId);
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  // POST /barreiras
  async create(req: Request, res: Response) {
    try {
      const { descricao } = req.body ?? {};
      const created = await BarreirasService.create(descricao);
      res.status(201).json(created);
    } catch (error: any) {
      res.status(error.status || 400).json({ error: error.message });
    }
  },

  // POST /barreiras/vincular-subtipo
  async vincularSubtipo(req: Request, res: Response) {
    try {
      const { subtipoId, descricao } = req.body;
      const barreira = await BarreirasService.createAndVincular(descricao, subtipoId);
      res.status(201).json(barreira);
    } catch (error: any) {
      res.status(error.status || 400).json({ error: error.message });
    }
  },

  // PUT /barreiras/:id
  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { descricao } = req.body ?? {};
      const updated = await BarreirasService.update(id, descricao);
      res.json(updated);
    } catch (error: any) {
      res.status(error.status || 400).json({ error: error.message });
    }
  },

  // DELETE /barreiras/:id
  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await BarreirasService.delete(id);
      res.json({ message: "Barreira deletada com sucesso" });
    } catch (error: any) {
      res.status(error.status || 400).json({ error: error.message });
    }
  },

  // GET /barreiras/search?q=termo
  async search(req: Request, res: Response) {
    try {
      const termo = req.query.q as string || '';
      const data = await BarreirasService.searchByDescricao(termo);
      res.json(data);
    } catch (error: any) {
      res.status(error.status || 400).json({ error: error.message });
    }
  },

  // POST /barreiras/find-or-create
  async findOrCreate(req: Request, res: Response) {
    try {
      const { descricao } = req.body;
      const barreira = await BarreirasService.findOrCreate(descricao);
      res.json(barreira);
    } catch (error: any) {
      res.status(error.status || 400).json({ error: error.message });
    }
  },

  // POST /barreiras/vincular-subtipo-inteligente
  async vincularSubtipoInteligente(req: Request, res: Response) {
    try {
      const { subtipoId, descricao } = req.body;
      const barreira = await BarreirasService.findOrCreateAndVincular(descricao, subtipoId);
      res.status(201).json(barreira);
    } catch (error: any) {
      res.status(error.status || 400).json({ error: error.message });
    }
  },

  // POST /barreiras/multiplos-subtipos
  async getByMultiplosSubtipos(req: Request, res: Response) {
    try {
      const { subtipoIds } = req.body;
      if (!Array.isArray(subtipoIds) || subtipoIds.length === 0) {
        return res.status(400).json({ error: 'subtipoIds deve ser um array não vazio' });
      }
      const data = await BarreirasService.getByMultiplosSubtipos(subtipoIds);
      res.json(data);
    } catch (error: any) {
      res.status(error.status || 400).json({ error: error.message });
    }
  },
};