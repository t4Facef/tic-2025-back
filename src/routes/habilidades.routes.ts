import { Router } from "express";
import { HabilidadesController } from "../controllers/habilidades.controller";

const router = Router();

router.get("/", HabilidadesController.list);
router.get("/:id", HabilidadesController.getById);
router.get("/candidato/:candidatoId", HabilidadesController.getByCandidato);
router.post("/", HabilidadesController.create);
router.put("/:id", HabilidadesController.update);
router.delete("/:id", HabilidadesController.delete);

export default router;