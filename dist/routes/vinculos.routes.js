"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vinculos_controller_1 = require("../controllers/vinculos.controller");
const router = (0, express_1.Router)();
// Rotas para gerenciar relacionamentos N:N
// POST /subtipos/:id/barreiras
router.post("/subtipos/:id/barreiras", vinculos_controller_1.VinculosController.vincularBarreiras);
// POST /barreiras/:id/acessibilidades
router.post("/barreiras/:id/acessibilidades", vinculos_controller_1.VinculosController.vincularAcessibilidades);
exports.default = router;
