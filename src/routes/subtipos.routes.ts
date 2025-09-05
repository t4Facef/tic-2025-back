import { Router } from "express";
import { SubtiposController } from "../controllers/subtipos.controller";

const router = Router();

// Define endpoints da entidade Subtipos
router.get("/:id", SubtiposController.getOne); // GET /subtipos/:id
router.post("/", SubtiposController.create);   // POST /subtipos

export default router;
