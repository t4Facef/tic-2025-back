import { Router } from "express";
import { VagasController } from "../controllers/vagas.controller";

const router = Router();

router.get("/", VagasController.list);
router.post("/search", VagasController.search);
router.get("/empresa/:empresaId", VagasController.getByEmpresa);
router.get("/:id", VagasController.getById);
router.post("/", VagasController.create);
router.put("/:id", VagasController.update);
router.delete("/:id", VagasController.delete);

export default router;