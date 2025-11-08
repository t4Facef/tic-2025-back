import { Request, Response } from "express";
import fs from "fs";
import path from "path";
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

  async checkFileExists(req: Request, res: Response) {
    try {
      const { candidatoId, empresaId, tipo } = req.params;
      const userId = candidatoId ? Number(candidatoId) : Number(empresaId);
      const userType = candidatoId ? 'candidatos' : 'empresas';
      
      const exists = ArquivoService.fileExists(userId, userType, tipo.toUpperCase());
      res.json({ exists });
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

  async getFotoEmpresa(req: Request, res: Response) {
    try {
      const empresaId = Number(req.params.empresaId);
      const foto = await ArquivoService.getDocumentoEmpresaByTipo(empresaId, 'FOTO');
      res.json(foto);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },



  // Servir arquivos diretamente por tipo
  async viewCurriculoCandidato(req: Request, res: Response) {
    try {
      const candidatoId = Number(req.params.candidatoId);
      const curriculo = await ArquivoService.getDocumentoByTipo(candidatoId, 'CURRICULO');
      
      if (!curriculo || !fs.existsSync(curriculo.filePath)) {
        return res.status(404).json({ error: 'Currículo não encontrado' });
      }
      
      res.setHeader('Content-Type', curriculo.mimetype);
      // amazonq-ignore-next-line
      res.sendFile(path.resolve(curriculo.filePath));
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async viewLaudoCandidato(req: Request, res: Response) {
    try {
      const candidatoId = Number(req.params.candidatoId);
      const laudo = await ArquivoService.getDocumentoByTipo(candidatoId, 'LAUDO');
      
      if (!laudo || !fs.existsSync(laudo.filePath)) {
        return res.status(404).json({ error: 'Laudo não encontrado' });
      }
      
      res.setHeader('Content-Type', laudo.mimetype);
      // amazonq-ignore-next-line
      res.sendFile(path.resolve(laudo.filePath));
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async viewFotoCandidato(req: Request, res: Response) {
    try {
      const candidatoId = Number(req.params.candidatoId);
      const foto = await ArquivoService.getDocumentoByTipo(candidatoId, 'FOTO');
      
      if (!foto || !fs.existsSync(foto.filePath)) {
        // Retorna foto padrão se não existir
        const defaultPhoto = path.join(process.cwd(), 'uploads', 'profile-default.jpg');
        res.setHeader('Content-Type', 'image/jpeg');
        // amazonq-ignore-next-line
        return res.sendFile(path.resolve(defaultPhoto));
      }
      
      res.setHeader('Content-Type', foto.mimetype);
      // amazonq-ignore-next-line
      res.sendFile(path.resolve(foto.filePath));
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async downloadCurriculoCandidato(req: Request, res: Response) {
    try {
      const candidatoId = Number(req.params.candidatoId);
      const curriculo = await ArquivoService.getDocumentoByTipo(candidatoId, 'CURRICULO');
      
      if (!curriculo || !fs.existsSync(curriculo.filePath)) {
        return res.status(404).json({ error: 'Currículo não encontrado' });
      }
      
      res.setHeader('Content-Type', curriculo.mimetype);
      res.setHeader('Content-Disposition', `attachment; filename="${curriculo.filename}"`);
      // amazonq-ignore-next-line
      res.sendFile(path.resolve(curriculo.filePath));
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async downloadLaudoCandidato(req: Request, res: Response) {
    try {
      const candidatoId = Number(req.params.candidatoId);
      const laudo = await ArquivoService.getDocumentoByTipo(candidatoId, 'LAUDO');
      
      if (!laudo || !fs.existsSync(laudo.filePath)) {
        return res.status(404).json({ error: 'Laudo não encontrado' });
      }
      
      res.setHeader('Content-Type', laudo.mimetype);
      res.setHeader('Content-Disposition', `attachment; filename="${laudo.filename}"`);
      // amazonq-ignore-next-line
      res.sendFile(path.resolve(laudo.filePath));
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async viewFotoEmpresa(req: Request, res: Response) {
    try {
      const empresaId = Number(req.params.empresaId);
      const foto = await ArquivoService.getDocumentoEmpresaByTipo(empresaId, 'FOTO');
      
      if (!foto || !fs.existsSync(foto.filePath)) {
        // Retorna foto padrão se não existir
        const defaultPhoto = path.join(process.cwd(), 'uploads', 'profile-default.jpg');
        res.setHeader('Content-Type', 'image/jpeg');
        // amazonq-ignore-next-line
        return res.sendFile(path.resolve(defaultPhoto));
      }
      
      res.setHeader('Content-Type', foto.mimetype);
      // amazonq-ignore-next-line
      res.sendFile(path.resolve(foto.filePath));
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },
};
