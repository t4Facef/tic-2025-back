import { Router } from "express";
import { AcessibilidadesController } from "../controllers/acessibilidades.controller";

const router = Router();

// Endpoints de Acessibilidades
router.get("/", AcessibilidadesController.list);  // GET /acessibilidades
router.post("/", AcessibilidadesController.create); // POST /acessibilidades

export default router;
