import fs from "fs";
import { ArquivoRepository } from "../repositories/arquivo.repo";

interface SalvarArquivoInput {
  file: Express.Multer.File;
  tipo: string;
  candidatoId?: number;
  empresaId?: number;
}

export const ArquivoService = {
  async salvarArquivo({ file, tipo, candidatoId, empresaId }: SalvarArquivoInput) {
    if (!tipo) {
      throw Object.assign(new Error("Campo 'tipo' é obrigatório"), { status: 400 });
    }
    if (!candidatoId && !empresaId) {
      throw Object.assign(new Error("Informe candidatoId ou empresaId"), { status: 400 });
    }

    const data = fs.readFileSync(file.path);
    fs.unlinkSync(file.path);

    const arquivoData = {
      tipo,
      filename: file.originalname,
      mimetype: file.mimetype,
      data,
      candidatoId: candidatoId || null,
      empresaId: empresaId || null,
    };

    return await ArquivoRepository.create(arquivoData);
  },

  async findById(id: number) {
    const arquivo = await ArquivoRepository.findById(id);
    if (!arquivo) {
      throw Object.assign(new Error("Arquivo não encontrado"), { status: 404 });
    }
    return arquivo;
  },

  async findByCandidato(candidatoId: number) {
    return await ArquivoRepository.findByCandidato(candidatoId);
  },

  async findByEmpresa(empresaId: number) {
    return await ArquivoRepository.findByEmpresa(empresaId);
  },

  async delete(id: number) {
    return await ArquivoRepository.delete(id);
  },

  async getDocumentosByUsuario(candidatoId: number) {
    const arquivos = await ArquivoRepository.findByCandidato(candidatoId);
    return {
      curriculo: arquivos.find(a => a.tipo === 'CURRICULO') || null,
      laudo: arquivos.find(a => a.tipo === 'LAUDO') || null,
      foto: arquivos.find(a => a.tipo === 'FOTO') || null
    };
  },

  async getDocumentoByTipo(candidatoId: number, tipo: string) {
    const arquivos = await ArquivoRepository.findByCandidato(candidatoId);
    return arquivos.find(a => a.tipo === tipo) || null;
  },
};
