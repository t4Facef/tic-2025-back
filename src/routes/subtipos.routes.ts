import { Router } from "express";
import { SubtiposController } from "../controllers/subtipos.controller";

const router = Router();

// Define endpoints da entidade Subtipos
router.get("/tipoId/:id", SubtiposController.getByTipoId); // GET /subtipos/tipoId/:id - DEVE vir ANTES
router.get("/:id", SubtiposController.getOne);             // GET /subtipos/:id
router.post("/", SubtiposController.create);               // POST /subtipos
router.delete("/:id", SubtiposController.delete);          // DELETE /subtipos/:id

export default router;
