import { Router } from "express";
import { AcessibilidadesController } from "../controllers/acessibilidades.controller";

const router = Router();

// Endpoints de Acessibilidades
router.get("/", AcessibilidadesController.list);  // GET /acessibilidades
router.get("/empresa/:empresaId", AcessibilidadesController.listByEmpresa); // GET /acessibilidades/empresa/:empresaId
router.get("/:id", AcessibilidadesController.getById); // GET /acessibilidades/:id
router.post("/", AcessibilidadesController.create); // POST /acessibilidades

export default router;
