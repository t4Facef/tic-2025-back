import { Router } from "express";
import { FormacaoController } from "../controllers/formacao.controller";

const router = Router();

router.get("/", FormacaoController.list);
router.get("/:id", FormacaoController.findById);
router.get("/candidato/:candidatoId", FormacaoController.getByCandidato);
router.post("/", FormacaoController.create);
router.put("/:id", FormacaoController.update);
router.delete("/:id", FormacaoController.delete);

export default router;