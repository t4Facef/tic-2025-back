import { Router } from "express";
import { TiposController } from "../controllers/tipos.controller";

const router = Router();

// Define endpoints da entidade Tipos
router.get("/", TiposController.list);                  // GET /tipos
router.get("/com-subtipos", TiposController.listWithSubtipos); // GET /tipos/com-subtipos
router.post("/", TiposController.create);               // POST /tipos

export default router;
