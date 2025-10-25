import { Router } from "express";
import { VagasController } from "../controllers/vagas.controller";

const router = Router();

router.get("/", VagasController.list);
router.get("/recomendadas", VagasController.getRecomendadas);
router.post("/search", VagasController.search);
router.get("/candidato/:candidatoId", VagasController.getVagasComCompatibilidade);
router.get("/candidato/:candidatoId/inscritas", VagasController.getVagasInscritas);
router.get("/empresa/:empresaId", VagasController.getByEmpresa);
router.get("/:id", VagasController.getById);
router.post("/", VagasController.create);
router.put("/:id", VagasController.update);
router.delete("/:id", VagasController.delete);

export default router;