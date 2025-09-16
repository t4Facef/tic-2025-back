"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const barreiras_controller_1 = require("../controllers/barreiras.controller");
const router = (0, express_1.Router)();
// Endpoints de Barreiras
router.get("/", barreiras_controller_1.BarreirasController.list); // GET /barreiras
router.post("/", barreiras_controller_1.BarreirasController.create); // POST /barreiras
exports.default = router;
