"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
exports.AuthController = {
    async verificarEmail(req, res) {
        try {
            const { email } = req.query;
            if (!email || typeof email !== 'string') {
                return res.status(400).json({ error: 'Email é obrigatório' });
            }
            const exists = await auth_service_1.AuthService.verificarEmailExiste(email);
            res.json({ exists });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async verificarCPF(req, res) {
        try {
            const { cpf } = req.query;
            if (!cpf || typeof cpf !== 'string') {
                return res.status(400).json({ error: 'CPF é obrigatório' });
            }
            const exists = await auth_service_1.AuthService.VerificarCPFExiste(cpf);
            res.json({ exists });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async verificarCNPJ(req, res) {
        try {
            const { cnpj } = req.query;
            if (!cnpj || typeof cnpj !== 'string') {
                return res.status(400).json({ error: 'CPF é obrigatório' });
            }
            const exists = await auth_service_1.AuthService.VerificarCNPJExiste(cnpj);
            res.json({ exists });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async registrarCandidato(req, res) {
        try {
            const user = await auth_service_1.AuthService.registrarCandidato(req.body);
            res.status(201).json({ message: "Candidato registrado com sucesso", id: user.id });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async registrarEmpresa(req, res) {
        try {
            const user = await auth_service_1.AuthService.registrarEmpresa(req.body);
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
