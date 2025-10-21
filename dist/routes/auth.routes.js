"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
// Rotas de autenticação
router.get("/check-email", auth_controller_1.AuthController.verificarEmail);
router.get("/check-cpf", auth_controller_1.AuthController.verificarCPF);
router.get("/check-cnpj", auth_controller_1.AuthController.verificarCNPJ);
router.post("/candidato/register", auth_controller_1.AuthController.registrarCandidato);
router.post("/empresa/register", auth_controller_1.AuthController.registrarEmpresa);
router.post("/login", auth_controller_1.AuthController.login);
router.post("/forgot-password", auth_controller_1.AuthController.solicitarRedefinicaoSenha);
router.post("/reset-password", auth_controller_1.AuthController.redefinirSenha);
exports.default = router;
