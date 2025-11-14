import { Router } from "express";
import { BarreirasController } from "../controllers/barreiras.controller";

const router = Router();

// Endpoints de Barreiras
router.get("/", BarreirasController.list);   // GET /barreiras
router.get("/search", BarreirasController.search); // GET /barreiras/search?q=termo
router.get("/subtipo/:subtipoId", BarreirasController.getBySubtipo); // GET /barreiras/subtipo/:subtipoId
router.post("/multiplos-subtipos", BarreirasController.getByMultiplosSubtipos); // POST /barreiras/multiplos-subtipos
router.post("/", BarreirasController.create); // POST /barreiras
router.post("/find-or-create", BarreirasController.findOrCreate); // POST /barreiras/find-or-create
router.post("/vincular-subtipo", BarreirasController.vincularSubtipo); // POST /barreiras/vincular-subtipo
router.post("/vincular-subtipo-inteligente", BarreirasController.vincularSubtipoInteligente); // POST /barreiras/vincular-subtipo-inteligente
router.put("/:id", BarreirasController.update); // PUT /barreiras/:id
router.delete("/:id", BarreirasController.delete); // DELETE /barreiras/:id

export default router;
