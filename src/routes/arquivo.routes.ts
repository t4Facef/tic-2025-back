import { Router } from "express";
import { upload } from "../middleware/upload";
import { ArquivoController } from "../controllers/arquivo.controller";

const router = Router();

router.post("/upload", upload.single("file"), ArquivoController.upload);
router.get("/:id", ArquivoController.getById);
router.get("/candidato/:candidatoId", ArquivoController.getByCandidato);
router.get("/empresa/:empresaId", ArquivoController.getByEmpresa);
router.delete("/:id", ArquivoController.delete);

// Rotas específicas para documentos
router.get("/candidato/:candidatoId/documentos", ArquivoController.getDocumentosCandidato);
router.get("/candidato/:candidatoId/curriculo", ArquivoController.getCurriculo);
router.get("/candidato/:candidatoId/laudo", ArquivoController.getLaudo);
router.get("/candidato/:candidatoId/foto", ArquivoController.getFoto);

// Rotas para servir arquivos por ID
router.get("/download/:id", ArquivoController.downloadArquivo);
router.get("/view/:id", ArquivoController.viewArquivo);

// Rotas diretas para visualização por tipo (candidatos)
router.get("/candidato/:candidatoId/curriculo/view", ArquivoController.viewCurriculoCandidato);
router.get("/candidato/:candidatoId/laudo/view", ArquivoController.viewLaudoCandidato);
router.get("/candidato/:candidatoId/foto/view", ArquivoController.viewFotoCandidato);

// Rotas diretas para download por tipo (candidatos)
router.get("/candidato/:candidatoId/curriculo/download", ArquivoController.downloadCurriculoCandidato);
router.get("/candidato/:candidatoId/laudo/download", ArquivoController.downloadLaudoCandidato);

export default router;