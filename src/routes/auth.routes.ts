import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router = Router();

// Rota de debug
router.get("/debug", (req, res) => {
  res.json({ 
    message: "Auth routes working", 
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV
  });
});

// Rota de teste simples para check-email
router.get("/check-email-test", (req, res) => {
  const { email } = req.query;
  res.json({ 
    message: "Check email test working",
    email: email,
    exists: false 
  });
});

// Rotas de autenticação
router.get("/check-email", AuthController.verificarEmail);
router.get("/check-cpf", AuthController.verificarCPF);
router.get("/check-cnpj", AuthController.verificarCNPJ);
// amazonq-ignore-next-line
router.post("/candidato/register", AuthController.registrarCandidato);
router.post("/empresa/register", AuthController.registrarEmpresa);
router.post("/admin/register", AuthController.registrarAdmin);
router.post("/login", AuthController.login);
router.post("/forgot-password", AuthController.solicitarRedefinicaoSenha);
router.post("/reset-password", AuthController.redefinirSenha);

export default router;
