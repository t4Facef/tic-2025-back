import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // 🔹 Limpa as tabelas (para desenvolvimento)
  await prisma.application.deleteMany();
  await prisma.jobPosition.deleteMany();
  await prisma.formacaoOuCurso.deleteMany();
  await prisma.candidatoSubtipo.deleteMany();
  await prisma.subtipoBarreira.deleteMany();
  await prisma.barreiraAcessibilidade.deleteMany();
  await prisma.acessibilidade.deleteMany();
  await prisma.barreira.deleteMany();
  await prisma.subtipoDeficiencia.deleteMany();
  await prisma.tipoDeficiencia.deleteMany();
  await prisma.empresa.deleteMany();
  await prisma.candidato.deleteMany();
  await prisma.endereco.deleteMany();

  // 🔹 Criar endereços
  const enderecos = await prisma.endereco.createMany({
    data: [
      { cep: "01000-000", estado: "SP", cidade: "São Paulo", bairro: "Centro", rua: "Av. Paulista", numero: "1000", complemento: "Conjunto 101" },
      { cep: "20000-000", estado: "RJ", cidade: "Rio de Janeiro", bairro: "Copacabana", rua: "Rua Atlântica", numero: "500", complemento: null },
      { cep: "30100-000", estado: "MG", cidade: "Belo Horizonte", bairro: "Savassi", rua: "Rua da Bahia", numero: "200", complemento: "Ap 12" },
      { cep: "80000-000", estado: "PR", cidade: "Curitiba", bairro: "Batel", rua: "Av. Batel", numero: "1500", complemento: null }
    ]
  });

  // 🔹 Criar empresas
  const senhaEmpresa = await bcrypt.hash("senha123", 10);
  const empresa1 = await prisma.empresa.create({
    data: {
      nome: "Tech Solutions",
      razaoSocial: "Tech Solutions LTDA",
      nomeFantasia: "TechSol",
      email: "contato@techsol.com",
      senha: senhaEmpresa,
      cnpj: "12345678000199",
      telefoneComercial: "1133224455",
      site: "https://techsol.com",
      descricao: "Empresa de tecnologia especializada em soluções web.",
      missao: "Transformar negócios por meio da tecnologia.",
      valores: "Inovação, Ética, Transparência",
      certificacoes: ["ISO 9001", "Selo Acessibilidade Digital"],
      endereco: { connect: { id: 1 } }
    }
  });

  const empresa2 = await prisma.empresa.create({
    data: {
      nome: "Inova RH",
      razaoSocial: "Inova Recursos Humanos",
      nomeFantasia: "Inova RH",
      email: "contato@inovarh.com",
      senha: senhaEmpresa,
      cnpj: "22345678000188",
      telefoneComercial: "2133445566",
      site: "https://inovarh.com",
      descricao: "Consultoria em recrutamento inclusivo.",
      missao: "Gerar oportunidades iguais no mercado de trabalho.",
      valores: "Diversidade, Inclusão, Respeito",
      certificacoes: ["Selo Diversidade"],
      endereco: { connect: { id: 2 } }
    }
  });

  // 🔹 Criar candidatos
  const senhaCandidato = await bcrypt.hash("123456", 10);
  const candidato1 = await prisma.candidato.create({
    data: {
      nome: "Ana Silva",
      email: "ana.silva@email.com",
      senha: senhaCandidato,
      cpf: "12345678901",
      dataNascimento: new Date("1990-05-10"),
      sexo: "Feminino",
      genero: "Mulher cis",
      telefones: ["11987654321"],
      endereco: { connect: { id: 3 } }
    }
  });

  const candidato2 = await prisma.candidato.create({
    data: {
      nome: "Carlos Souza",
      email: "carlos.souza@email.com",
      senha: senhaCandidato,
      cpf: "98765432100",
      dataNascimento: new Date("1985-08-22"),
      sexo: "Masculino",
      genero: "Homem cis",
      telefones: ["21988776655"],
      endereco: { connect: { id: 4 } }
    }
  });

  // 🔹 Formações
  await prisma.formacaoOuCurso.createMany({
    data: [
      { candidatoId: candidato1.id, nome: "Ciência da Computação", instituicao: "USP", nivel: "Superior", dataInicio: new Date("2008-02-01"), dataFim: new Date("2012-12-01"), descricao: "Graduação completa." },
      { candidatoId: candidato1.id, nome: "Acessibilidade Web", instituicao: "Alura", nivel: "Curso Livre", dataInicio: new Date("2020-01-01"), dataFim: new Date("2020-03-01"), descricao: "Curso de acessibilidade em desenvolvimento web." },
      { candidatoId: candidato2.id, nome: "Administração", instituicao: "FGV", nivel: "Superior", dataInicio: new Date("2005-02-01"), dataFim: new Date("2009-12-01"), descricao: "Bacharelado em Administração." }
    ]
  });

  // 🔹 Tipos e Subtipos de Deficiência
  const motora = await prisma.tipoDeficiencia.create({ data: { nome: "Deficiência Motora" } });
  const auditiva = await prisma.tipoDeficiencia.create({ data: { nome: "Deficiência Auditiva" } });

  const subtipoMotora = await prisma.subtipoDeficiencia.create({ data: { nome: "Paraplegia", tipoId: motora.id } });
  const subtipoAuditiva = await prisma.subtipoDeficiencia.create({ data: { nome: "Surdez Parcial", tipoId: auditiva.id } });

  await prisma.candidatoSubtipo.createMany({
    data: [
      { candidatoId: candidato1.id, subtipoId: subtipoMotora.id },
      { candidatoId: candidato2.id, subtipoId: subtipoAuditiva.id }
    ]
  });

  // 🔹 Barreiras e Acessibilidades
  const escadas = await prisma.barreira.create({ data: { descricao: "Escadas íngremes" } });
  const comunicacaoOral = await prisma.barreira.create({ data: { descricao: "Dificuldade de comunicação oral" } });

  const rampa = await prisma.acessibilidade.create({ data: { descricao: "Rampa de acesso" } });
  const interprete = await prisma.acessibilidade.create({ data: { descricao: "Intérprete de Libras" } });

  await prisma.subtipoBarreira.createMany({
    data: [
      { subtipoId: subtipoMotora.id, barreiraId: escadas.id },
      { subtipoId: subtipoAuditiva.id, barreiraId: comunicacaoOral.id }
    ]
  });

  await prisma.barreiraAcessibilidade.createMany({
    data: [
      { barreiraId: escadas.id, acessibilidadeId: rampa.id },
      { barreiraId: comunicacaoOral.id, acessibilidadeId: interprete.id }
    ]
  });

  // 🔹 Vagas
  const vaga1 = await prisma.jobPosition.create({
    data: {
      titulo: "Desenvolvedor Frontend",
      descricao: "Atuar no desenvolvimento de aplicações web acessíveis.",
      requisitos: ["React", "TypeScript", "Acessibilidade Web"],
      salario: 6000,
      modalidade: "Remoto",
      cargaHoraria: "40h semanais",
      empresaId: empresa1.id
    }
  });

  const vaga2 = await prisma.jobPosition.create({
    data: {
      titulo: "Analista de RH",
      descricao: "Responsável por processos seletivos inclusivos.",
      requisitos: ["Gestão de Pessoas", "Diversidade e Inclusão"],
      salario: 4000,
      modalidade: "Presencial",
      cargaHoraria: "44h semanais",
      empresaId: empresa2.id
    }
  });

  // 🔹 Candidaturas
  await prisma.application.createMany({
    data: [
      { candidatoId: candidato1.id, vagaId: vaga1.id, status: "PENDENTE" },
      { candidatoId: candidato2.id, vagaId: vaga2.id, status: "ACEITO" }
    ]
  });

  console.log("🌱 Seed finalizado com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
