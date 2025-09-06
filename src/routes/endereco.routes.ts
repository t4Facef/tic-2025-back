import { Router } from "express";
import { EnderecoController } from "../controllers/endereco.controller";

const router = Router();

router.get("/candidato/:candidatoId", EnderecoController.getByCandidato);
router.post("/", EnderecoController.create);
router.put("/:id", EnderecoController.update);
router.delete("/:id", EnderecoController.delete);

export default router;