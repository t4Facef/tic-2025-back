"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipos_controller_1 = require("../controllers/tipos.controller");
const router = (0, express_1.Router)();
// Define endpoints da entidade Tipos
router.get("/", tipos_controller_1.TiposController.list); // GET /tipos
router.get("/com-subtipos", tipos_controller_1.TiposController.listWithSubtipos); // GET /tipos/com-subtipos
router.post("/", tipos_controller_1.TiposController.create); // POST /tipos
exports.default = router;
