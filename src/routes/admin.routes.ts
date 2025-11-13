import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Rotas específicas de administrador
// amazonq-ignore-next-line
router.post("/create", AuthController.registrarAdmin);

// Listar administradores
router.get("/list", async (req, res) => {
  try {
    const administradores = await prisma.administrador.findMany({
      select: {
        id: true,
        nome: true, // nome é tratado como email
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Mapear nome para email na resposta
    const adminList = administradores.map((admin: any) => ({
      id: admin.id,
      email: admin.nome,
      createdAt: admin.createdAt
    }));

    res.json(adminList);
  } catch (error) {
    console.error('Erro ao listar administradores:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default router;