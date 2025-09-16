"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
exports.AuthController = {
    async registrarCandidato(req, res) {
        try {
            const { nome, email, senha, cpf, dataNascimento } = req.body;
            const user = await auth_service_1.AuthService.registrarCandidato(nome, email, senha, cpf, new Date(dataNascimento));
            res.status(201).json({ message: "Candidato registrado com sucesso", id: user.id });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async registrarEmpresa(req, res) {
        try {
            const { razaoSocial, nomeFantasia, email, senha, cnpj, telefoneComercial, numFunc, numFuncPcd, site, area } = req.body;
            const user = await auth_service_1.AuthService.registrarEmpresa(razaoSocial, nomeFantasia, email, senha, cnpj, telefoneComercial, numFunc, numFuncPcd, site, area);
            res.status(201).json({ message: "Empresa registrada com sucesso", id: user.id });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async login(req, res) {
        try {
            const { email, senha } = req.body;
            const result = await auth_service_1.AuthService.login(email, senha);
            res.json(result);
        }
        catch (error) {
            res.status(error.status || 400).json({ error: error.message });
        }
    },
    async solicitarRedefinicaoSenha(req, res) {
        try {
            const { email } = req.body;
            await auth_service_1.AuthService.solicitarRedefinicaoSenha(email);
            res.json({ message: "Email de redefinição enviado com sucesso" });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async redefinirSenha(req, res) {
        try {
            const { token, novaSenha } = req.body;
            await auth_service_1.AuthService.redefinirSenha(token, novaSenha);
            res.json({ message: "Senha redefinida com sucesso" });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
};
