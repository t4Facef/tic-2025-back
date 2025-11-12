import { Router } from "express";
import { AcessibilidadesController } from "../controllers/acessibilidades.controller";
import { adminAuthMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Endpoints de Acessibilidades (leitura - sem auth)
router.get("/", AcessibilidadesController.list);  // GET /acessibilidades
router.get("/nomes", AcessibilidadesController.listNames);
router.get("/search", AcessibilidadesController.search); // GET /acessibilidades/search?q=termo
router.get("/empresa/:empresaId", AcessibilidadesController.listByEmpresa); // GET /acessibilidades/empresa/:empresaId
router.get("/barreira/:barreiraId", AcessibilidadesController.getByBarreira); // GET /acessibilidades/barreira/:barreiraId
router.get("/:id", AcessibilidadesController.getById); // GET /acessibilidades/:id

// Endpoints de modificação - apenas admin
// amazonq-ignore-next-line
router.post("/", adminAuthMiddleware, AcessibilidadesController.create); // POST /acessibilidades
// amazonq-ignore-next-line
router.post("/find-or-create", adminAuthMiddleware, AcessibilidadesController.findOrCreate); // POST /acessibilidades/find-or-create
// amazonq-ignore-next-line
router.post("/vincular-barreira", adminAuthMiddleware, AcessibilidadesController.vincularBarreira); // POST /acessibilidades/vincular-barreira
// amazonq-ignore-next-line
router.put("/:id", adminAuthMiddleware, AcessibilidadesController.update); // PUT /acessibilidades/:id
// amazonq-ignore-next-line
router.delete("/:id", adminAuthMiddleware, AcessibilidadesController.delete); // DELETE /acessibilidades/:id

export default router;
