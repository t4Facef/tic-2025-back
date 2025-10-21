import { Request, Response } from "express";
import { ArquivoService } from "../services/arquivo.service";

export const ArquivoController = {
  async upload(req: Request, res: Response) {
    try {
      const { tipo, candidatoId, empresaId } = req.body;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ error: "Nenhum arquivo enviado" });
      }

      const arquivo = await ArquivoService.salvarArquivo({
        file,
        tipo,
        candidatoId: candidatoId ? Number(candidatoId) : undefined,
        empresaId: empresaId ? Number(empresaId) : undefined,
      });

      res.status(201).json(arquivo);
    } catch (error: any) {
      res.status(error.status || 400).json({ error: error.message });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const arquivo = await ArquivoService.findById(id);
      res.json(arquivo);
    } catch (error: any) {
      res.status(error.status || 400).json({ error: error.message });
    }
  },

  async getByCandidato(req: Request, res: Response) {
    try {
      const candidatoId = Number(req.params.candidatoId);
      const arquivos = await ArquivoService.findByCandidato(candidatoId);
      res.json(arquivos);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async getByEmpresa(req: Request, res: Response) {
    try {
      const empresaId = Number(req.params.empresaId);
      const arquivos = await ArquivoService.findByEmpresa(empresaId);
      res.json(arquivos);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await ArquivoService.delete(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(error.status || 400).json({ error: error.message });
    }
  },

  async getDocumentosCandidato(req: Request, res: Response) {
    try {
      const candidatoId = Number(req.params.candidatoId);
      const documentos = await ArquivoService.getDocumentosByUsuario(candidatoId);
      res.json(documentos);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async getCurriculo(req: Request, res: Response) {
    try {
      const candidatoId = Number(req.params.candidatoId);
      const curriculo = await ArquivoService.getDocumentoByTipo(candidatoId, 'CURRICULO');
      res.json(curriculo);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async getLaudo(req: Request, res: Response) {
    try {
      const candidatoId = Number(req.params.candidatoId);
      const laudo = await ArquivoService.getDocumentoByTipo(candidatoId, 'LAUDO');
      res.json(laudo);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async getFoto(req: Request, res: Response) {
    try {
      const candidatoId = Number(req.params.candidatoId);
      const foto = await ArquivoService.getDocumentoByTipo(candidatoId, 'FOTO');
      res.json(foto);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async downloadArquivo(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const arquivo = await ArquivoService.findById(id);
      
      res.setHeader('Content-Type', arquivo.mimetype);
      res.setHeader('Content-Disposition', `attachment; filename="${arquivo.filename}"`);
      res.send(arquivo.data);
    } catch (error: any) {
      res.status(error.status || 400).json({ error: error.message });
    }
  },

  async viewArquivo(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const arquivo = await ArquivoService.findById(id);
      
      res.setHeader('Content-Type', arquivo.mimetype);
      res.send(arquivo.data);
    } catch (error: any) {
      res.status(error.status || 400).json({ error: error.message });
    }
  },

  // Servir arquivos diretamente por tipo
  async viewCurriculoCandidato(req: Request, res: Response) {
    try {
      const candidatoId = Number(req.params.candidatoId);
      const curriculo = await ArquivoService.getDocumentoByTipo(candidatoId, 'CURRICULO');
      
      if (!curriculo) {
        return res.status(404).json({ error: 'Currículo não encontrado' });
      }
      
      res.setHeader('Content-Type', curriculo.mimetype);
      res.send(curriculo.data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async viewLaudoCandidato(req: Request, res: Response) {
    try {
      const candidatoId = Number(req.params.candidatoId);
      const laudo = await ArquivoService.getDocumentoByTipo(candidatoId, 'LAUDO');
      
      if (!laudo) {
        return res.status(404).json({ error: 'Laudo não encontrado' });
      }
      
      res.setHeader('Content-Type', laudo.mimetype);
      res.send(laudo.data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async viewFotoCandidato(req: Request, res: Response) {
    try {
      const candidatoId = Number(req.params.candidatoId);
      const foto = await ArquivoService.getDocumentoByTipo(candidatoId, 'FOTO');
      
      if (!foto) {
        return res.status(404).json({ error: 'Foto não encontrada' });
      }
      
      res.setHeader('Content-Type', foto.mimetype);
      res.send(foto.data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async downloadCurriculoCandidato(req: Request, res: Response) {
    try {
      const candidatoId = Number(req.params.candidatoId);
      const curriculo = await ArquivoService.getDocumentoByTipo(candidatoId, 'CURRICULO');
      
      if (!curriculo) {
        return res.status(404).json({ error: 'Currículo não encontrado' });
      }
      
      res.setHeader('Content-Type', curriculo.mimetype);
      res.setHeader('Content-Disposition', `attachment; filename="${curriculo.filename}"`);
      res.send(curriculo.data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async downloadLaudoCandidato(req: Request, res: Response) {
    try {
      const candidatoId = Number(req.params.candidatoId);
      const laudo = await ArquivoService.getDocumentoByTipo(candidatoId, 'LAUDO');
      
      if (!laudo) {
        return res.status(404).json({ error: 'Laudo não encontrado' });
      }
      
      res.setHeader('Content-Type', laudo.mimetype);
      res.setHeader('Content-Disposition', `attachment; filename="${laudo.filename}"`);
      res.send(laudo.data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },
};
