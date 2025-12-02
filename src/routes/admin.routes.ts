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

    // Mapear dados dos administradores para resposta
    const adminList = administradores.map((admin: any) => ({
      id: admin.id,
      email: admin.email,
      createdAt: admin.createdAt
    }));

    res.json(adminList);
  } catch (error) {
    console.error('Erro ao listar administradores:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default router;