import { Request, Response } from "express";
import { VagasService } from "../services/vagas.service";
import { CompatibilidadeService } from "../services/compatibilidade.service";

export const VagasController = {
  async list(req: Request, res: Response) {
    try {
      const filters = req.query;
      const data = await VagasService.list(filters);
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = await VagasService.findById(id);
      if (!data) {
        return res.status(404).json({ error: "Vaga não encontrada" });
      }
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async getByEmpresa(req: Request, res: Response) {
    try {
      const empresaId = Number(req.params.empresaId);
      const data = await VagasService.findByEmpresa(empresaId);
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const {
        idEmpresa,
        title,
        location,
        description,
        skillsTags,
        supportTags,
        compatibility,
        startDate,
        endDate,
        typeContract,
        typeWork,
        payment,
        workLevel,
        timeShift
      } = req.body;

      const jobData = {
        idEmpresa,
        title,
        location,
        description,
        skillsTags,
        supportTags,
        compatibility,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        typeContract,
        typeWork,
        payment,
        workLevel,
        timeShift
      };

      const created = await VagasService.create(jobData);
      res.status(201).json(created);
    } catch (error: any) {
      console.error('Erro ao criar vaga:', error);
      res.status(400).json({ error: error.message || 'Erro ao criar vaga' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const jobData = req.body;
      
      if (jobData.startDate) jobData.startDate = new Date(jobData.startDate);
      if (jobData.endDate) jobData.endDate = new Date(jobData.endDate);

      const updated = await VagasService.update(id, jobData);
      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await VagasService.delete(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async search(req: Request, res: Response) {
    try {
      const filters = req.body;
      const data = await VagasService.search(filters);
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  // GET /vagas/candidato/:candidatoId - Listar vagas com compatibilidade para candidato
  async getVagasComCompatibilidade(req: Request, res: Response) {
    try {
      const candidatoId = Number(req.params.candidatoId);
      const vagas = await VagasService.list({});
      
      const vagasComCompatibilidade = [];
      
      for (const vaga of vagas) {
        try {
          const compatibilidade = await CompatibilidadeService.calcularCompatibilidade(candidatoId, vaga.id);
          vagasComCompatibilidade.push({
            ...vaga,
            compatibilidade: compatibilidade,
            compatibilidadeFormatada: `${(compatibilidade * 100).toFixed(1)}%`
          });
        } catch (error) {
          vagasComCompatibilidade.push({
            ...vaga,
            compatibilidade: 0,
            compatibilidadeFormatada: "0.0%"
          });
        }
      }
      
      vagasComCompatibilidade.sort((a, b) => b.compatibilidade - a.compatibilidade);
      
      res.json(vagasComCompatibilidade);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },
};