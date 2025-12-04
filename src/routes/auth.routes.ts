import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { healthCheck } from "../lib/database";

const router = Router();

// Rota de debug melhorada
router.get("/debug", async (req, res) => {
  try {
    const dbHealthy = await healthCheck();
    res.json({ 
      message: "Auth routes working", 
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV,
      database: {
        status: dbHealthy ? 'healthy' : 'unhealthy',
        provider: 'postgresql',
        pooler: 'neon'
      },
      server: {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        version: process.version
      }
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Health check failed",
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Rota para testar conexão com banco
router.get("/test-db", async (req, res) => {
  try {
    // Teste usando nossa função de health check
    const isHealthy = await healthCheck();
    res.json({ 
      message: isHealthy ? "Database connection working" : "Database connection issues",
      status: isHealthy ? "healthy" : "unhealthy",
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    res.status(500).json({ 
      message: "Database connection failed",
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
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
