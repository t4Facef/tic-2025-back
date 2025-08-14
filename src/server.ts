import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err);
  res.status(500).json({ error: "Erro interno" });
});

/** 1) Listar tipos */
app.get("/tipos", async (_req, res) => {
  const tipos = await prisma.tipoDeficiencia.findMany({
    orderBy: { id: "asc" }
  });
  res.json(tipos);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`API Etapa 1 rodando em http://localhost:${PORT}`));
