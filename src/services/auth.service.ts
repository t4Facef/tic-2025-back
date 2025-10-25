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
