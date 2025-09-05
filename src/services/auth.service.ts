import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const AuthService = {
  // Cadastro de candidato
  async registrarCandidato(nome: string, email: string, senha: string, cpf: string, dataNascimento: Date) {
    const hash = await bcrypt.hash(senha, 10);
    return prisma.candidato.create({
      data: { nome, email, senha: hash, cpf, dataNascimento, telefones: [] },
    });
  },

  // Cadastro de empresa
  async registrarEmpresa(nome: string, email: string, senha: string, cnpj: string, razaoSocial: string, nomeFantasia: string, telefoneComercial: string) {
    const hash = await bcrypt.hash(senha, 10);
    return prisma.empresa.create({
      data: { nome, email, senha: hash, cnpj, razaoSocial, nomeFantasia, telefoneComercial, certificacoes: [] },
    });
  },

  // Login (candidato ou empresa)
  async login(email: string, senha: string) {
    // Busca usuário em candidato ou empresa
    const candidato = await prisma.candidato.findUnique({ where: { email } });
    const empresa = !candidato ? await prisma.empresa.findUnique({ where: { email } }) : null;

    const user = candidato || empresa;
    if (!user) throw Object.assign(new Error("Usuário não encontrado"), { status: 404 });

    // Verifica senha
    const valido = await bcrypt.compare(senha, user.senha);
    if (!valido) throw Object.assign(new Error("Senha inválida"), { status: 401 });

    // Define tipo de usuário
    const role = candidato ? "CANDIDATO" : "EMPRESA";

    // Gera token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    return { token, role };
  },
};
