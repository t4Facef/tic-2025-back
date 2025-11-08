import { Router } from "express";
import { upload } from "../middleware/upload";
import { ArquivoController } from "../controllers/arquivo.controller";

const router = Router();

// amazonq-ignore-next-line
router.post("/upload", upload.single("file"), ArquivoController.upload);

// Verificar se arquivo existe
router.get("/candidato/:candidatoId/:tipo/exists", ArquivoController.checkFileExists);
router.get("/empresa/:empresaId/:tipo/exists", ArquivoController.checkFileExists);

// Rotas específicas para documentos (metadados)
router.get("/candidato/:candidatoId/curriculo", ArquivoController.getCurriculo);
router.get("/candidato/:candidatoId/laudo", ArquivoController.getLaudo);
router.get("/candidato/:candidatoId/foto", ArquivoController.getFoto);
router.get("/empresa/:empresaId/foto", ArquivoController.getFotoEmpresa);

// Rotas diretas para visualização por tipo (candidatos)
router.get("/candidato/:candidatoId/curriculo/view", ArquivoController.viewCurriculoCandidato);
router.get("/candidato/:candidatoId/laudo/view", ArquivoController.viewLaudoCandidato);
router.get("/candidato/:candidatoId/foto/view", ArquivoController.viewFotoCandidato);

// Rotas diretas para download por tipo (candidatos)
router.get("/candidato/:candidatoId/curriculo/download", ArquivoController.downloadCurriculoCandidato);
router.get("/candidato/:candidatoId/laudo/download", ArquivoController.downloadLaudoCandidato);

// Rotas específicas para empresas
router.get("/empresa/:empresaId/foto/view", ArquivoController.viewFotoEmpresa);

export default router;