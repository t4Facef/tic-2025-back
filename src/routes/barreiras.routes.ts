import { Router } from "express";
import { BarreirasController } from "../controllers/barreiras.controller";

const router = Router();

// Endpoints de Barreiras
router.get("/", BarreirasController.list);   // GET /barreiras
router.get("/subtipo/:subtipoId", BarreirasController.getBySubtipo); // GET /barreiras/subtipo/:subtipoId
router.post("/", BarreirasController.create); // POST /barreiras
router.post("/vincular-subtipo", BarreirasController.vincularSubtipo); // POST /barreiras/vincular-subtipo
router.delete("/:id", BarreirasController.delete); // DELETE /barreiras/:id

export default router;
