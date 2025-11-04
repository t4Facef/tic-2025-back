import { Router } from "express";
import { VagasController } from "../controllers/vagas.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Rotas públicas
router.get("/", VagasController.list);
router.get("/recomendadas", VagasController.getRecomendadas);
router.get("/top-empresas", VagasController.getTopEmpresasByVagas);
router.get("/populares", VagasController.getVagasPopulares);
router.post("/search", VagasController.search);
router.get("/candidato/:candidatoId", VagasController.getVagasComCompatibilidade);
router.get("/candidato/:candidatoId/inscritas", VagasController.getVagasInscritas);
router.get("/empresa/:empresaId", VagasController.getByEmpresa);

// Rotas protegidas
router.get("/:id", authMiddleware, VagasController.getById);
router.post("/", authMiddleware, VagasController.create);
router.put("/:id", authMiddleware, VagasController.update);
router.delete("/:id", authMiddleware, VagasController.delete);

export default router;