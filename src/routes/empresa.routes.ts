import { Router } from "express";
import { EmpresaController } from "../controllers/empresa.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/profile", authMiddleware, EmpresaController.getProfile);
router.get("/:id/profile", EmpresaController.getProfileById);
router.put("/:id", EmpresaController.update);

export default router;