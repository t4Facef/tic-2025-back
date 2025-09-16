import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router = Router();

// Rotas de autenticação
router.get("/check-email", AuthController.verificarEmail);
router.post("/candidato/register", AuthController.registrarCandidato);
router.post("/empresa/register", AuthController.registrarEmpresa);
router.post("/login", AuthController.login);
router.post("/forgot-password", AuthController.solicitarRedefinicaoSenha);
router.post("/reset-password", AuthController.redefinirSenha);

export default router;
