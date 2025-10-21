"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const candidato_subtipo_controller_1 = require("../controllers/candidato-subtipo.controller");
const router = (0, express_1.Router)();
router.get("/candidato/:candidatoId", candidato_subtipo_controller_1.CandidatoSubtipoController.getByCandidato);
router.post("/", candidato_subtipo_controller_1.CandidatoSubtipoController.vincular);
router.delete("/", candidato_subtipo_controller_1.CandidatoSubtipoController.desvincular);
exports.default = router;
