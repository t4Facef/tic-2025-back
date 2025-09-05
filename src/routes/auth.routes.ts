import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router = Router();

// Rotas de autenticação
router.post("/candidato/register", AuthController.registrarCandidato);
router.post("/empresa/register", AuthController.registrarEmpresa);
router.post("/login", AuthController.login);

export default router;
