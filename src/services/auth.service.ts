import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
import { PrismaClient } from "@prisma/client";
import { EmailService } from "./email.service";

const prisma = new PrismaClient();

export const AuthService = {
  async verificarEmailExiste(email: string): Promise<boolean> {
    // Verificar se é um administrador (por nome)
    const admin = await prisma.administrador.findUnique({ where: { nome: email } });
    if (admin) return true;
    
    // Verificar candidatos e empresas (por email)
    const candidato = await prisma.candidato.findUnique({ where: { email } });
    const empresa = await prisma.empresa.findUnique({ where: { email } });
    return !!(candidato || empresa);
  },

  async VerificarCPFExiste(cpf: string): Promise<boolean> {
    const candidato = await prisma.candidato.findUnique({ where: { cpf } });
    return !!candidato;
  },

  async VerificarCNPJExiste(cnpj: string): Promise<boolean> {
    const empresa = await prisma.empresa.findUnique({ where: { cnpj } });
    return !!empresa;
  },

  async registrarCandidato(dadosCandidato: any) {
    const { nome, email, senha, cpf, dataNascimento, sexo, genero, telefones, endereco, areaInteresse, formacao, experiencia, subtiposDeficiencia } = dadosCandidato;
    
    const existeEmail = await prisma.candidato.findUnique({ where: { email } }) || 
                       await prisma.empresa.findUnique({ where: { email } });
    if (existeEmail) throw new Error("Email já cadastrado");

    const hash = await bcrypt.hash(senha, 10);
    
    const dataNasc = new Date(dataNascimento);
    if (isNaN(dataNasc.getTime())) {
      throw new Error(`Data de nascimento inválida: ${dataNascimento}`);
    }
    
    return prisma.candidato.create({
      data: { 
        nome, 
        cpf, 
        dataNascimento: dataNasc, 
        sexo: sexo || null,
        genero: genero || null,
        email, 
        telefones: telefones || [],
        areaInteresse,
        senha: hash,
        
        // Criar endereço junto (nested create)
        endereco: endereco && endereco.cep ? {
          create: {
            cep: endereco.cep,
            estado: endereco.estado,
            cidade: endereco.cidade,
            bairro: endereco.bairro,
            rua: endereco.rua,
            numero: endereco.numero,
            complemento: endereco.complemento || null
          }
        } : undefined,
        
        // Criar formação junto (nested create)
        formacoes: formacao ? {
          create: {
            nomeCurso: formacao.nomeCurso,
            tipoFormacao: formacao.tipo,
            instituicao: formacao.instituicao,
            situacao: formacao.situacao,
            dataInicio: new Date(formacao.dataInicio),
            dataFim: new Date(formacao.dataFim),
            descricao: formacao.descricao,
          }
        } : undefined,
        
        // Criar experiência junto (nested create)
        experiencia: experiencia && experiencia.empresa ? {
          create: {
            titulo: experiencia.titulo,
            instituicao: experiencia.empresa,
            dataInicio: new Date(experiencia.dataInicio),
            dataFim: new Date(experiencia.dataFim),
            descricao: experiencia.descricao,
            tipoContrato: experiencia.tipo
          }
        } : undefined,
        
        // Conectar subtipos de deficiência (apenas IDs)
        subtipos: subtiposDeficiencia && subtiposDeficiencia.length > 0 ? {
          create: subtiposDeficiencia
            .filter((id: any) => !isNaN(Number(id)))
            .map((subtipoId: any) => ({
              subtipoId: Number(subtipoId)
            }))
        } : undefined,
      },
    });
  },

  async registrarEmpresa(dadosEmpresa: any) {
    const {razaoSocial, nomeFantasia, cnpj, numFunc, numFuncPcd, anoFundacao, descricao, historia, missao, area, email, telefoneComercial, site, endereco, acessibilidades, senha} = dadosEmpresa;
    
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
        anoFundacao,
        descricao,
        historia,
        missao,
        area,
        endereco: endereco && endereco.cep ? {
          create: {
            cep: endereco.cep,
            estado: endereco.estado,
            cidade: endereco.cidade,
            bairro: endereco.bairro,
            rua: endereco.rua,
            numero: endereco.numero,
            complemento: endereco.complemento || null
          }
        } : undefined,
        empresaAcessibilidade: acessibilidades && acessibilidades.length > 0 ? {
          create: acessibilidades.map((id: number) => ({acessibilidadeId: id}))
        } : undefined
      },
    });
  },

  async registrarAdmin(dadosAdmin: any) {
    const { nome, senha } = dadosAdmin;
    
    const existeAdmin = await prisma.administrador.findUnique({ where: { nome } });
    if (existeAdmin) throw new Error("Nome de administrador já existe");

    const hash = await bcrypt.hash(senha, 10);
    
    return prisma.administrador.create({
      data: { nome, senha: hash }
    });
  },

  async login(email: string, senha: string) {
    // Verificar se é login de admin (por nome ao invés de email)
    const admin = await prisma.administrador.findUnique({ where: { nome: email } });
    
    if (admin) {
      const valido = await bcrypt.compare(senha, admin.senha);
      if (!valido) throw Object.assign(new Error("Senha inválida"), { status: 401 });
      
      const token = jwt.sign(
        { id: admin.id, nome: admin.nome, role: "ADMIN" },
        process.env.JWT_SECRET || "fallback-secret",
        { expiresIn: "24h" }
      );
      
      return { token, role: "ADMIN", user: { id: admin.id, nome: admin.nome } };
    }

    // Login normal (candidato/empresa)
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
    // Verificar se existe usuário com este email
    const candidato = await prisma.candidato.findUnique({ where: { email } });
    const empresa = !candidato ? await prisma.empresa.findUnique({ where: { email } }) : null;
    
    const user = candidato || empresa;
    if (!user) {
      throw new Error("Não existe nenhum usuário cadastrado com esse email");
    }

    // Gerar token JWT temporário para redefinição
    const resetToken = jwt.sign(
      { 
        email, 
        type: 'password-reset',
        userId: user.id,
        userType: candidato ? 'candidato' : 'empresa'
      },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: '1h' }
    );

    // Criar link de redefinição
    const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`;
    
    // Enviar email
    await EmailService.enviarEmailRedefinicaoSenha(email, resetLink);

    return { message: "Email de redefinição enviado com sucesso" };
  },

  async redefinirSenha(token: string, novaSenha: string) {
    try {
      // Verificar e decodificar o token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any;
      
      if (decoded.type !== 'password-reset') {
        throw new Error("Token inválido");
      }

      const { email, userType } = decoded;
      
      // Validar nova senha
      if (!novaSenha || novaSenha.length < 6) {
        throw new Error("A nova senha deve ter pelo menos 6 caracteres");
      }

      const hash = await bcrypt.hash(novaSenha, 10);

      // Atualizar senha baseado no tipo de usuário
      if (userType === 'candidato') {
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
    } catch (error: any) {
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        throw new Error("Token inválido ou expirado");
      }
      throw error;
    }
  },
};
