"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const acessibilidades_controller_1 = require("../controllers/acessibilidades.controller");
const router = (0, express_1.Router)();
// Endpoints de Acessibilidades
router.get("/", acessibilidades_controller_1.AcessibilidadesController.list); // GET /acessibilidades
router.post("/", acessibilidades_controller_1.AcessibilidadesController.create); // POST /acessibilidades
exports.default = router;
