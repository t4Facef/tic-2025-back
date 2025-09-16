import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
import { PrismaClient } from "@prisma/client";
import { EmailService } from "./email.service";

const prisma = new PrismaClient();

export const AuthService = {
  async verificarEmailExiste(email: string): Promise<boolean> {
    const candidato = await prisma.candidato.findUnique({ where: { email } });
    const empresa = await prisma.empresa.findUnique({ where: { email } });
    return !!(candidato || empresa);
  },

  async registrarCandidato(nome: string, email: string, senha: string, cpf: string, dataNascimento: Date) {
    const existeEmail = await prisma.candidato.findUnique({ where: { email } }) || 
                       await prisma.empresa.findUnique({ where: { email } });
    if (existeEmail) throw new Error("Email já cadastrado");

    const hash = await bcrypt.hash(senha, 10);
    return prisma.candidato.create({
      data: { 
        nome, 
        email, 
        senha: hash, 
        cpf, 
        dataNascimento, 
        telefones: [],
        laudo: Buffer.from('') // Campo obrigatório no schema
      },
    });
  },

  async registrarEmpresa(razaoSocial: string, nomeFantasia: string, email: string, senha: string, cnpj: string, telefoneComercial: string, numFunc: number, numFuncPcd: number, site: string, area: string) {
    const existeEmail = await prisma.candidato.findUnique({ where: { email } }) || 
                       await prisma.empresa.findUnique({ where: { email } });
    if (existeEmail) throw new Error("Email já cadastrado");

    const hash = await bcrypt.hash(senha, 10);
    return prisma.empresa.create({
      data: { 
        razaoSocial, 
        nomeFantasia, 
        email, 
        senha: hash, 
        site,
        cnpj, 
        telefoneComercial, 
        numFunc,
        numFuncPcd,
        area
      },
    });
  },

  async login(email: string, senha: string) {
    const candidato = await prisma.candidato.findUnique({ where: { email } });
    const empresa = !candidato ? await prisma.empresa.findUnique({ where: { email } }) : null;

    const user = candidato || empresa;
    if (!user) throw Object.assign(new Error("Usuário não encontrado"), { status: 404 });

    const valido = await bcrypt.compare(senha, user.senha);
    if (!valido) throw Object.assign(new Error("Senha inválida"), { status: 401 });

    const role = candidato ? "CANDIDATO" : "EMPRESA";
    const token = jwt.sign(
      { id: user.id, email: user.email, role },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "24h" }
    );

    return { token, role, user: { id: user.id, email: user.email, nome: candidato?.nome || empresa?.nomeFantasia } };
  },

  async solicitarRedefinicaoSenha(email: string) {
    const candidato = await prisma.candidato.findUnique({ where: { email } });
    const empresa = !candidato ? await prisma.empresa.findUnique({ where: { email } }) : null;
    
    const user = candidato || empresa;
    if (!user) throw new Error("Email não encontrado");

    const resetToken = randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hora

    // Salva o token no banco (você pode criar uma tabela específica para isso)
    const tokenData = {
      email,
      token: resetToken,
      expiresAt: resetTokenExpiry,
      used: false
    };

    // Por simplicidade, vou usar uma abordagem com JWT temporário
    const tempToken = jwt.sign(
      { email, type: 'password-reset' },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: '1h' }
    );

    const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${tempToken}`;
    
    await EmailService.enviarEmailRedefinicaoSenha(email, resetLink);

    return { message: "Email de redefinição enviado" };
  },

  async redefinirSenha(token: string, novaSenha: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any;
      
      if (decoded.type !== 'password-reset') {
        throw new Error("Token inválido");
      }

      const { email } = decoded;
      const hash = await bcrypt.hash(novaSenha, 10);

      // Atualiza a senha do candidato ou empresa
      const candidato = await prisma.candidato.findUnique({ where: { email } });
      if (candidato) {
        await prisma.candidato.update({
          where: { email },
          data: { senha: hash }
        });
      } else {
        await prisma.empresa.update({
          where: { email },
          data: { senha: hash }
        });
      }

      return { message: "Senha redefinida com sucesso" };
    } catch (error) {
      throw new Error("Token inválido ou expirado");
    }
  },
};
