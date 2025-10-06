import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export const AuthController = {
  async verificarEmail(req: Request, res: Response) {
    try {
      const { email } = req.query;
      if (!email || typeof email !== 'string') {
        return res.status(400).json({ error: 'Email é obrigatório' });
      }
      const exists = await AuthService.verificarEmailExiste(email);
      res.json({ exists });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  async verificarCPF(req: Request, res: Response) {
    try {
      const { cpf } = req.query;
      if (!cpf || typeof cpf !== 'string') {
        return res.status(400).json({ error: 'CPF é obrigatório' });
      }
      const exists = await AuthService.VerificarCPFExiste(cpf);
      res.json({ exists });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  async verificarCNPJ(req: Request, res: Response) {
    try {
      const { cnpj } = req.query;
      if (!cnpj || typeof cnpj !== 'string') {
        return res.status(400).json({ error: 'CPF é obrigatório' });
      }
      const exists = await AuthService.VerificarCNPJExiste(cnpj);
      res.json({ exists });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  async registrarCandidato(req: Request, res: Response) {
    try {
      const user = await AuthService.registrarCandidato(req.body);
      res.status(201).json({ message: "Candidato registrado com sucesso", id: user.id });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async registrarEmpresa(req: Request, res: Response) {
    try {
      const user = await AuthService.registrarEmpresa(req.body);
      res.status(201).json({ message: "Empresa registrada com sucesso", id: user.id });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;
      const result = await AuthService.login(email, senha);
      res.json(result);
    } catch (error: any) {
      res.status(error.status || 400).json({ error: error.message });
    }
  },

  async solicitarRedefinicaoSenha(req: Request, res: Response) {
    try {
      const { email } = req.body;
      await AuthService.solicitarRedefinicaoSenha(email);
      res.json({ message: "Email de redefinição enviado com sucesso" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async redefinirSenha(req: Request, res: Response) {
    try {
      const { token, novaSenha } = req.body;
      await AuthService.redefinirSenha(token, novaSenha);
      res.json({ message: "Senha redefinida com sucesso" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },
};
