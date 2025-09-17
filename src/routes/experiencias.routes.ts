import { Router } from "express";
import { ExperienciasController } from "../controllers/experiencias.controller";

const router = Router();

router.get("/", ExperienciasController.list);
router.get("/:id", ExperienciasController.getById);
router.get("/candidato/:candidatoId", ExperienciasController.getByCandidato);
router.post("/", ExperienciasController.create);
router.put("/:id", ExperienciasController.update);
router.delete("/:id", ExperienciasController.delete);

export default router;