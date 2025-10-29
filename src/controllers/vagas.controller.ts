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
      const status = req.query.status as string;
      const data = await VagasService.findByEmpresa(empresaId, status);
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
        startDate,
        endDate,
        typeContract,
        typeWork,
        payment,
        workLevel,
        timeShift,
        setor
      } = req.body;

      const jobData = {
        idEmpresa,
        title,
        location,
        description,
        skillsTags,
        supportTags,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        typeContract,
        typeWork,
        payment,
        workLevel,
        timeShift,
        setor
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

  async getRecomendadas(req: Request, res: Response) {
    try {
      const candidatoId = req.query.candidatoId ? Number(req.query.candidatoId) : null;
      if (!candidatoId) {
        return res.status(400).json({ error: "candidatoId é obrigatório para recomendações" });
      }
      const data = await VagasService.getRecomendadas(candidatoId);
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  // GET /vagas/candidato/:candidatoId - Listar vagas com compatibilidade para candidato
  async getVagasComCompatibilidade(req: Request, res: Response) {
    try {
      const candidatoId = Number(req.params.candidatoId);
      const filters = { ...req.query, candidatoId: candidatoId.toString() };
      const vagas = await VagasService.list(filters);
      res.json(vagas);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  // GET /vagas/candidato/:candidatoId/inscritas - Listar vagas que o candidato se inscreveu
  async getVagasInscritas(req: Request, res: Response) {
    try {
      const candidatoId = Number(req.params.candidatoId);
      const filters = { candidatoId: candidatoId.toString(), inscrito: true };
      const vagas = await VagasService.list(filters);
      res.json(vagas);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  // GET /vagas/top-empresas - Retorna IDs das 7 empresas com mais vagas abertas
  async getTopEmpresasByVagas(req: Request, res: Response) {
    try {
      const empresaIds = await VagasService.getTopEmpresasByVagas();
      res.json(empresaIds);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  // GET /vagas/populares - Retorna 3 vagas mais populares (mais candidaturas hoje)
  async getVagasPopulares(req: Request, res: Response) {
    try {
      const vagas = await VagasService.getVagasPopulares();
      res.json(vagas);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },
};