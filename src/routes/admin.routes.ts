import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router = Router();

// Rotas específicas de administrador
router.post("/create", AuthController.registrarAdmin);

export default router;