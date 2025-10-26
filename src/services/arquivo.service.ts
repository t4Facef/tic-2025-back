import fs from "fs";
import path from "path";
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
    const userDir = path.join(baseDir, userType, userId!.toString());
    
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }

    // Nome do arquivo baseado no tipo
    const ext = path.extname(file.originalname);
    const filename = `${tipo.toLowerCase()}${ext}`;
    const filePath = path.join(userDir, filename);

    // Se arquivo já existe, remover
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Mover arquivo para destino final
    fs.renameSync(file.path, filePath);
    
    // Se for foto, processar
    if (tipo === 'FOTO' && file.mimetype.startsWith('image/')) {
      try {
        const processedData = await processImage(filePath, tipo);
        const finalPath = path.join(userDir, 'foto.jpg');
        fs.writeFileSync(finalPath, processedData);
        
        if (finalPath !== filePath) {
          fs.unlinkSync(filePath);
        }
      } catch (error) {
        console.log('Erro ao processar imagem, mantendo original:', (error as Error).message);
      }
    }

    return { success: true, filePath };
  },

  getFilePath(userId: number, userType: 'candidatos' | 'empresas', tipo: string): string {
    const baseDir = path.join(process.cwd(), 'uploads');
    const filename = tipo === 'FOTO' ? 'foto.jpg' : `${tipo.toLowerCase()}.pdf`;
    return path.join(baseDir, userType, userId.toString(), filename);
  },

  fileExists(userId: number, userType: 'candidatos' | 'empresas', tipo: string): boolean {
    const filePath = this.getFilePath(userId, userType, tipo);
    return fs.existsSync(filePath);
  },

  getDocumentoByTipo(candidatoId: number, tipo: string) {
    const filePath = this.getFilePath(candidatoId, 'candidatos', tipo);
    
    if (!fs.existsSync(filePath)) {
      if (tipo === 'FOTO') {
        // Retorna foto padrão para fotos
        const defaultPath = path.join(process.cwd(), 'uploads', 'profile-default.jpg');
        return {
          tipo,
          filePath: defaultPath,
          mimetype: 'image/jpeg',
          filename: 'profile-default.jpg'
        };
      }
      return null;
    }
    
    return {
      tipo,
      filePath,
      mimetype: tipo === 'FOTO' ? 'image/jpeg' : 'application/pdf',
      filename: path.basename(filePath)
    };
  },

  getDocumentoEmpresaByTipo(empresaId: number, tipo: string) {
    const filePath = this.getFilePath(empresaId, 'empresas', tipo);
    
    if (!fs.existsSync(filePath)) {
      if (tipo === 'FOTO') {
        // Retorna foto padrão para fotos
        const defaultPath = path.join(process.cwd(), 'uploads', 'profile-default.jpg');
        return {
          tipo,
          filePath: defaultPath,
          mimetype: 'image/jpeg',
          filename: 'profile-default.jpg'
        };
      }
      return null;
    }
    
    return {
      tipo,
      filePath,
      mimetype: tipo === 'FOTO' ? 'image/jpeg' : 'application/pdf',
      filename: path.basename(filePath)
    };
  },
};
