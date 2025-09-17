import { Router } from "express";
import { EnderecoController } from "../controllers/endereco.controller";

const router = Router();

router.get("/", EnderecoController.list);
router.get("/:id", EnderecoController.getById);
router.post("/", EnderecoController.create);
router.put("/:id", EnderecoController.update);
router.delete("/:id", EnderecoController.delete);

export default router;