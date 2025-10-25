import fs from "fs";
import path from "path";
import { ArquivoRepository } from "../repositories/arquivo.repo";
import { processImage } from "../middleware/upload";

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

    // Criar estrutura de pastas organizada
    const baseDir = path.join(process.cwd(), 'uploads');
    const userType = candidatoId ? 'candidatos' : 'empresas';
    const userId = candidatoId || empresaId;
    const tipoFolder = tipo.toLowerCase();
    const userDir = path.join(baseDir, userType, userId.toString(), tipoFolder);
    
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }

    // Gerar nome limpo do arquivo
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const cleanName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}_${cleanName}`;
    const filePath = path.join(userDir, filename);

    // Mover arquivo para destino final
    fs.renameSync(file.path, filePath);
    
    // Se for foto, processar depois
    if (tipo === 'FOTO' && file.mimetype.startsWith('image/')) {
      try {
        const processedData = await processImage(filePath, tipo);
        const finalPath = path.join(userDir, `${timestamp}_foto.jpg`);
        fs.writeFileSync(finalPath, processedData);
        
        // Remover arquivo original se processamento deu certo
        if (fs.existsSync(filePath) && finalPath !== filePath) {
          fs.unlinkSync(filePath);
        }
        
        const arquivoData = {
          tipo,
          filename: file.originalname,
          mimetype: 'image/jpeg',
          filePath: finalPath,
          candidatoId: candidatoId || null,
          empresaId: empresaId || null,
        };
        return await ArquivoRepository.create(arquivoData);
      } catch (error) {
        console.log('Erro ao processar imagem, mantendo original:', error.message);
        // Se der erro no processamento, manter arquivo original
      }
    }

    const arquivoData = {
      tipo,
      filename: file.originalname,
      mimetype: file.mimetype,
      filePath,
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

  async getDocumentoEmpresaByTipo(empresaId: number, tipo: string) {
    const arquivos = await ArquivoRepository.findByEmpresa(empresaId);
    return arquivos.find(a => a.tipo === tipo) || null;
  },
};
