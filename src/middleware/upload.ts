import multer from "multer";
import path from "path";
import fs from "fs";
import sharp from "sharp";

const uploadPath = path.resolve("uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

export const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'file' && req.body.tipo === 'FOTO') {
      // Aceitar apenas imagens para fotos
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Apenas imagens são permitidas para fotos'));
      }
    } else {
      cb(null, true);
    }
  }
});

// Middleware para processar imagens
export const processImage = async (filePath: string, tipo: string): Promise<Buffer> => {
  if (tipo === 'FOTO') {
    // Redimensionar e otimizar foto de perfil
    return await sharp(filePath)
      .resize(400, 400, { 
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ 
        quality: 85,
        progressive: true
      })
      .toBuffer();
  }
  
  // Para outros tipos, apenas ler o arquivo
  return fs.readFileSync(filePath);
};