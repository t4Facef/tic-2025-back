import { Router } from "express";
import tiposRoutes from "./tipos.routes";
import subtiposRoutes from "./subtipos.routes";
import barreirasRoutes from "./barreiras.routes";
import acessibilidadesRoutes from "./acessibilidades.routes";
import authRoutes from "./auth.routes";

const router = Router();

// Mapeamento das rotas
router.use("/tipos", tiposRoutes);
router.use("/subtipos", subtiposRoutes);
router.use("/barreiras", barreirasRoutes);
router.use("/acessibilidades", acessibilidadesRoutes);
router.use("/auth", authRoutes);

export default router;
