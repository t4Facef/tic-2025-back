import { Router } from "express";
import { VagasController } from "../controllers/vagas.controller";

const router = Router();

router.get("/", VagasController.list);
router.get("/:id", VagasController.findById);
router.post("/", VagasController.create);
router.put("/:id", VagasController.update);
router.delete("/:id", VagasController.delete);

export default router;