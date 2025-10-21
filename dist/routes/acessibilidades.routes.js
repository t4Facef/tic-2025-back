"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const acessibilidades_controller_1 = require("../controllers/acessibilidades.controller");
const router = (0, express_1.Router)();
// Endpoints de Acessibilidades
router.get("/", acessibilidades_controller_1.AcessibilidadesController.list); // GET /acessibilidades
router.get("/nomes", acessibilidades_controller_1.AcessibilidadesController.listNames);
router.get("/empresa/:empresaId", acessibilidades_controller_1.AcessibilidadesController.listByEmpresa); // GET /acessibilidades/empresa/:empresaId
router.get("/:id", acessibilidades_controller_1.AcessibilidadesController.getById); // GET /acessibilidades/:id
router.post("/", acessibilidades_controller_1.AcessibilidadesController.create); // POST /acessibilidades
exports.default = router;
