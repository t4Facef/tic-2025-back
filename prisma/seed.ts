import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Limpar dados existentes
  await prisma.candidaturas.deleteMany();
  await prisma.vagas.deleteMany();
  await prisma.formacaoOuCurso.deleteMany();
  await prisma.experiencias.deleteMany();
  await prisma.habilidades.deleteMany();
  await prisma.candidatoSubtipo.deleteMany();
  await prisma.barreiraAcessibilidade.deleteMany();
  await prisma.acessibilidade.deleteMany();
  await prisma.subtipoBarreira.deleteMany();
  await prisma.candidato.deleteMany();
  await prisma.empresa.deleteMany();
  await prisma.endereco.deleteMany();
  await prisma.barreira.deleteMany();
  await prisma.subtipoDeficiencia.deleteMany();
  await prisma.tipoDeficiencia.deleteMany();

  // Criar tipos de deficiência
  const tipoVisual = await prisma.tipoDeficiencia.create({
    data: { nome: "Deficiência Visual" }
  });

  const tipoAuditiva = await prisma.tipoDeficiencia.create({
    data: { nome: "Deficiência Auditiva" }
  });

  const tipoFisica = await prisma.tipoDeficiencia.create({
    data: { nome: "Deficiência Física" }
  });

  // Criar subtipos de deficiência
  const cegueira = await prisma.subtipoDeficiencia.create({
    data: { nome: "Cegueira", tipoId: tipoVisual.id }
  });

  const baixaVisao = await prisma.subtipoDeficiencia.create({
    data: { nome: "Baixa Visão", tipoId: tipoVisual.id }
  });

  const surdez = await prisma.subtipoDeficiencia.create({
    data: { nome: "Surdez", tipoId: tipoAuditiva.id }
  });

  const cadeirante = await prisma.subtipoDeficiencia.create({
    data: { nome: "Cadeirante", tipoId: tipoFisica.id }
  });

  // Criar barreiras
  const barreiraVisual = await prisma.barreira.create({
    data: { descricao: "Barreira Visual" }
  });

  const barreiraAuditiva = await prisma.barreira.create({
    data: { descricao: "Barreira Auditiva" }
  });

  const barreiraMobilidade = await prisma.barreira.create({
    data: { descricao: "Barreira de Mobilidade" }
  });

  // Conectar subtipos com barreiras
  await prisma.subtipoBarreira.createMany({
    data: [
      { subtipoId: cegueira.id, barreiraId: barreiraVisual.id },
      { subtipoId: baixaVisao.id, barreiraId: barreiraVisual.id },
      { subtipoId: surdez.id, barreiraId: barreiraAuditiva.id },
      { subtipoId: cadeirante.id, barreiraId: barreiraMobilidade.id },
    ]
  });

  // Criar endereços
  const endereco1 = await prisma.endereco.create({
    data: {
      cep: "01310-100",
      estado: "SP",
      cidade: "São Paulo",
      bairro: "Bela Vista",
      rua: "Av. Paulista",
      numero: "1000"
    }
  });

  const endereco2 = await prisma.endereco.create({
    data: {
      cep: "22071-900",
      estado: "RJ",
      cidade: "Rio de Janeiro",
      bairro: "Copacabana",
      rua: "Av. Atlântica",
      numero: "500"
    }
  });

  // Criar empresas
  const empresa1 = await prisma.empresa.create({
    data: {
      razaoSocial: "Tech Solutions Ltda",
      nomeFantasia: "Tech Solutions",
      email: "contato@techsolutions.com",
      senha: await bcrypt.hash("123456", 10),
      cnpj: "12345678000190",
      telefoneComercial: "11123456789",
      numFunc: 50,
      numFuncPcd: 5,
      area: "Tecnologia",
      site: "https://techsolutions.com",
      enderecoId: endereco1.id
    }
  });

  const empresa2 = await prisma.empresa.create({
    data: {
      razaoSocial: "Inova RH Consultoria Ltda",
      nomeFantasia: "Inova RH",
      email: "contato@inovarh.com",
      senha: await bcrypt.hash("123456", 10),
      cnpj: "98765432000110",
      telefoneComercial: "21987654321",
      numFunc: 30,
      numFuncPcd: 3,
      area: "Recursos Humanos",
      site: "https://inovarh.com",
      enderecoId: endereco2.id
    }
  });

  // Criar acessibilidades para as empresas
  await prisma.acessibilidade.createMany({
    data: [
      { nome: "Rampa de acesso", empresaId: empresa1.id },
      { nome: "Intérprete de Libras", empresaId: empresa1.id },
      { nome: "Software leitor de tela", empresaId: empresa1.id },
      { nome: "Rampa de acesso", empresaId: empresa2.id },
      { nome: "Banheiro adaptado", empresaId: empresa2.id },
    ]
  });

  // Criar candidatos
  const candidato1 = await prisma.candidato.create({
    data: {
      nome: "João Silva",
      email: "joao@email.com",
      senha: await bcrypt.hash("123456", 10),
      cpf: "12345678900",
      dataNascimento: new Date("1990-05-15"),
      sexo: "Masculino",
      genero: "Masculino",
      telefones: ["11999991111"],
      areaInteresse: "Tecnologia",
      laudo: Buffer.from("laudo-medico-joao")
    }
  });

  const candidato2 = await prisma.candidato.create({
    data: {
      nome: "Maria Santos",
      email: "maria@email.com",
      senha: await bcrypt.hash("123456", 10),
      cpf: "98765432100",
      dataNascimento: new Date("1985-08-20"),
      sexo: "Feminino",
      genero: "Feminino",
      telefones: ["21888882222"],
      areaInteresse: "Administração",
      laudo: Buffer.from("laudo-medico-maria")
    }
  });

  // Conectar candidatos com subtipos de deficiência
  await prisma.candidatoSubtipo.createMany({
    data: [
      { candidatoId: candidato1.id, subtipoId: baixaVisao.id },
      { candidatoId: candidato2.id, subtipoId: surdez.id },
    ]
  });

  // Criar formações
  await prisma.formacaoOuCurso.createMany({
    data: [
      {
        candidatoId: candidato1.id,
        nomeCurso: "Ciência da Computação",
        instituicao: "USP",
        nivel: "Superior",
        situacao: "Concluído",
        area: "Tecnologia",
        dataInicio: new Date("2008-02-01"),
        dataFim: new Date("2012-12-01"),
        descricao: "Graduação completa."
      },
      {
        candidatoId: candidato2.id,
        nomeCurso: "Administração",
        instituicao: "FGV",
        nivel: "Superior",
        situacao: "Concluído",
        area: "Administração",
        dataInicio: new Date("2005-02-01"),
        dataFim: new Date("2009-12-01"),
        descricao: "Bacharelado em Administração."
      }
    ]
  });

  // Criar experiências
  await prisma.experiencias.createMany({
    data: [
      {
        candidatoId: candidato1.id,
        instituicao: "Empresa ABC",
        dataInicio: new Date("2013-01-01"),
        dataFim: new Date("2020-12-31"),
        descricao: "Desenvolvedor Full Stack",
        tipo: "CLT"
      },
      {
        candidatoId: candidato2.id,
        instituicao: "Consultoria XYZ",
        dataInicio: new Date("2010-03-01"),
        dataFim: new Date("2022-06-30"),
        descricao: "Analista de RH",
        tipo: "CLT"
      }
    ]
  });

  // Criar vagas
  const vaga1 = await prisma.vagas.create({
    data: {
      titulo: "Desenvolvedor Frontend",
      descricao: "Vaga para desenvolvedor frontend com foco em acessibilidade",
      requisitos: ["React", "JavaScript", "HTML", "CSS"],
      salario: 5000.00,
      modalidade: "Remoto",
      cargaHoraria: "40h semanais",
      habilidades: ["React", "Acessibilidade Web"],
      apoios: ["Software leitor de tela", "Teclado adaptado"],
      empresaId: empresa1.id
    }
  });

  const vaga2 = await prisma.vagas.create({
    data: {
      titulo: "Analista de RH",
      descricao: "Vaga para analista de recursos humanos",
      requisitos: ["Graduação em RH", "Experiência em recrutamento"],
      salario: 4000.00,
      modalidade: "Presencial",
      cargaHoraria: "40h semanais",
      habilidades: ["Recrutamento", "Seleção"],
      apoios: ["Intérprete de Libras"],
      empresaId: empresa2.id
    }
  });

  // Criar candidaturas
  await prisma.candidaturas.createMany({
    data: [
      { candidatoId: candidato1.id, vagaId: vaga1.id, status: "PENDENTE" },
      { candidatoId: candidato2.id, vagaId: vaga2.id, status: "APROVADO" },
    ]
  });

  console.log("Seed executado com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });