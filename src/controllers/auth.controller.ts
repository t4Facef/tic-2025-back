import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

// Controller: recebe as requisições HTTP e chama o service
export const AuthController = {
  // Cadastro de candidato
  async registrarCandidato(req: Request, res: Response) {
    const { nome, email, senha, cpf } = req.body;
    const user = await AuthService.registrarCandidato(nome, email, senha, cpf);
    res.status(201).json(user);
  },

  // Cadastro de empresa
  async registrarEmpresa(req: Request, res: Response) {
    const { nome, email, senha, cnpj } = req.body;
    const user = await AuthService.registrarEmpresa(nome, email, senha, cnpj);
    res.status(201).json(user);
  },

  // Login
  async login(req: Request, res: Response) {
    const { email, senha } = req.body;
    const result = await AuthService.login(email, senha);
    res.json(result);
  },
};
