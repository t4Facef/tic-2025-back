import { Router } from "express";
import { AcessibilidadesController } from "../controllers/acessibilidades.controller";

const router = Router();

// Endpoints de Acessibilidades
router.get("/", AcessibilidadesController.list);  // GET /acessibilidades
router.get("/nomes", AcessibilidadesController.listNames);
router.get("/empresa/:empresaId", AcessibilidadesController.listByEmpresa); // GET /acessibilidades/empresa/:empresaId
router.get("/barreira/:barreiraId", AcessibilidadesController.getByBarreira); // GET /acessibilidades/barreira/:barreiraId
router.get("/:id", AcessibilidadesController.getById); // GET /acessibilidades/:id
router.post("/", AcessibilidadesController.create); // POST /acessibilidades
router.post("/vincular-barreira", AcessibilidadesController.vincularBarreira); // POST /acessibilidades/vincular-barreira
router.delete("/:id", AcessibilidadesController.delete); // DELETE /acessibilidades/:id

export default router;
