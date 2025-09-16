"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subtipos_controller_1 = require("../controllers/subtipos.controller");
const router = (0, express_1.Router)();
// Define endpoints da entidade Subtipos
router.get("/:id", subtipos_controller_1.SubtiposController.getOne); // GET /subtipos/:id
router.post("/", subtipos_controller_1.SubtiposController.create); // POST /subtipos
exports.default = router;
