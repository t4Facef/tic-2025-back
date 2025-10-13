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
  await prisma.empresaAcessibilidade.deleteMany();
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

  const tipoIntelectual = await prisma.tipoDeficiencia.create({
    data: { nome: "Deficiência Intelectual" }
  });

  const tipoMultipla = await prisma.tipoDeficiencia.create({
    data: { nome: "Deficiência Múltipla" }
  });

  // Criar subtipos de deficiência
  const cegueira = await prisma.subtipoDeficiencia.create({
    data: { nome: "Cegueira", tipoId: tipoVisual.id }
  });

  const baixaVisao = await prisma.subtipoDeficiencia.create({
    data: { nome: "Baixa Visão", tipoId: tipoVisual.id }
  });

  const daltonismo = await prisma.subtipoDeficiencia.create({
    data: { nome: "Daltonismo", tipoId: tipoVisual.id }
  });

  const surdez = await prisma.subtipoDeficiencia.create({
    data: { nome: "Surdez", tipoId: tipoAuditiva.id }
  });

  const deficienciaAuditiva = await prisma.subtipoDeficiencia.create({
    data: { nome: "Deficiência Auditiva Leve", tipoId: tipoAuditiva.id }
  });

  const cadeirante = await prisma.subtipoDeficiencia.create({
    data: { nome: "Cadeirante", tipoId: tipoFisica.id }
  });

  const amputacao = await prisma.subtipoDeficiencia.create({
    data: { nome: "Amputação", tipoId: tipoFisica.id }
  });

  const paralisiaCerebral = await prisma.subtipoDeficiencia.create({
    data: { nome: "Paralisia Cerebral", tipoId: tipoFisica.id }
  });

  const sindromeDow = await prisma.subtipoDeficiencia.create({
    data: { nome: "Síndrome de Down", tipoId: tipoIntelectual.id }
  });

  const autismo = await prisma.subtipoDeficiencia.create({
    data: { nome: "Autismo", tipoId: tipoIntelectual.id }
  });

  const surdocegueira = await prisma.subtipoDeficiencia.create({
    data: { nome: "Surdocegueira", tipoId: tipoMultipla.id }
  });

  // Criar barreiras
  const barreiraLeitura = await prisma.barreira.create({
    data: { descricao: "Dificuldade de leitura de textos" }
  });

  const barreiraNavegacao = await prisma.barreira.create({
    data: { descricao: "Dificuldade de navegação visual" }
  });

  const barreiraCores = await prisma.barreira.create({
    data: { descricao: "Dificuldade de distinção de cores" }
  });

  const barreiraComunicacao = await prisma.barreira.create({
    data: { descricao: "Dificuldade de comunicação oral" }
  });

  const barreiraAudio = await prisma.barreira.create({
    data: { descricao: "Dificuldade de percepção de áudio" }
  });

  const barreiraAcesso = await prisma.barreira.create({
    data: { descricao: "Dificuldade de acesso físico" }
  });

  const barreiraLocomocao = await prisma.barreira.create({
    data: { descricao: "Dificuldade de locomoção" }
  });

  const barreiraManipulacao = await prisma.barreira.create({
    data: { descricao: "Dificuldade de manipulação de objetos" }
  });

  const barreiraCompreensao = await prisma.barreira.create({
    data: { descricao: "Dificuldade de compreensão" }
  });

  const barreiraConcentracao = await prisma.barreira.create({
    data: { descricao: "Dificuldade de concentração" }
  });

  // Conectar subtipos com barreiras
  await prisma.subtipoBarreira.createMany({
    data: [
      // Cegueira
      { subtipoId: cegueira.id, barreiraId: barreiraLeitura.id },
      { subtipoId: cegueira.id, barreiraId: barreiraNavegacao.id },
      // Baixa Visão
      { subtipoId: baixaVisao.id, barreiraId: barreiraLeitura.id },
      { subtipoId: baixaVisao.id, barreiraId: barreiraNavegacao.id },
      // Daltonismo
      { subtipoId: daltonismo.id, barreiraId: barreiraCores.id },
      // Surdez
      { subtipoId: surdez.id, barreiraId: barreiraComunicacao.id },
      { subtipoId: surdez.id, barreiraId: barreiraAudio.id },
      // Deficiência Auditiva Leve
      { subtipoId: deficienciaAuditiva.id, barreiraId: barreiraAudio.id },
      // Cadeirante
      { subtipoId: cadeirante.id, barreiraId: barreiraAcesso.id },
      { subtipoId: cadeirante.id, barreiraId: barreiraLocomocao.id },
      // Amputação
      { subtipoId: amputacao.id, barreiraId: barreiraManipulacao.id },
      { subtipoId: amputacao.id, barreiraId: barreiraAcesso.id },
      // Paralisia Cerebral
      { subtipoId: paralisiaCerebral.id, barreiraId: barreiraLocomocao.id },
      { subtipoId: paralisiaCerebral.id, barreiraId: barreiraManipulacao.id },
      // Síndrome de Down
      { subtipoId: sindromeDow.id, barreiraId: barreiraCompreensao.id },
      { subtipoId: sindromeDow.id, barreiraId: barreiraConcentracao.id },
      // Autismo
      { subtipoId: autismo.id, barreiraId: barreiraConcentracao.id },
      { subtipoId: autismo.id, barreiraId: barreiraComunicacao.id },
      // Surdocegueira
      { subtipoId: surdocegueira.id, barreiraId: barreiraLeitura.id },
      { subtipoId: surdocegueira.id, barreiraId: barreiraComunicacao.id },
      { subtipoId: surdocegueira.id, barreiraId: barreiraNavegacao.id },
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

  // Criar acessibilidades padrão
  await prisma.acessibilidade.createMany({
    data: [
      { nome: "Software leitor de tela" },
      { nome: "Sinalização em Braille" },
      { nome: "Audiodescrição" },
      { nome: "Piso tátil" },
      { nome: "Contraste de cores" },
      { nome: "Intérprete de Libras" },
      { nome: "Legendas" },
      { nome: "Amplificação sonora" },
      { nome: "Rampa de acesso" },
      { nome: "Elevador" },
      { nome: "Banheiro adaptado" },
      { nome: "Mesa ajustável" },
      { nome: "Teclado adaptado" },
      { nome: "Linguagem simples" },
      { nome: "Instruções claras" },
      { nome: "Ambiente silencioso" },
      { nome: "Comunicação visual" },
      { nome: "Tadoma" },
    ]
  });

  // Buscar IDs das acessibilidades criadas
  const acessLeitor = await prisma.acessibilidade.findUnique({ where: { nome: "Software leitor de tela" } });
  const acessBraille = await prisma.acessibilidade.findUnique({ where: { nome: "Sinalização em Braille" } });
  const acessAudio = await prisma.acessibilidade.findUnique({ where: { nome: "Audiodescrição" } });
  const acessPiso = await prisma.acessibilidade.findUnique({ where: { nome: "Piso tátil" } });
  const acessCores = await prisma.acessibilidade.findUnique({ where: { nome: "Contraste de cores" } });
  const acessLibras = await prisma.acessibilidade.findUnique({ where: { nome: "Intérprete de Libras" } });
  const acessLegendas = await prisma.acessibilidade.findUnique({ where: { nome: "Legendas" } });
  const acessAmplificacao = await prisma.acessibilidade.findUnique({ where: { nome: "Amplificação sonora" } });
  const acessRampa = await prisma.acessibilidade.findUnique({ where: { nome: "Rampa de acesso" } });
  const acessElevador = await prisma.acessibilidade.findUnique({ where: { nome: "Elevador" } });
  const acessBanheiro = await prisma.acessibilidade.findUnique({ where: { nome: "Banheiro adaptado" } });
  const acessMesa = await prisma.acessibilidade.findUnique({ where: { nome: "Mesa ajustável" } });
  const acessTeclado = await prisma.acessibilidade.findUnique({ where: { nome: "Teclado adaptado" } });
  const acessLinguagem = await prisma.acessibilidade.findUnique({ where: { nome: "Linguagem simples" } });
  const acessInstrucoes = await prisma.acessibilidade.findUnique({ where: { nome: "Instruções claras" } });
  const acessSilencio = await prisma.acessibilidade.findUnique({ where: { nome: "Ambiente silencioso" } });
  const acessVisual = await prisma.acessibilidade.findUnique({ where: { nome: "Comunicação visual" } });
  const acessTadoma = await prisma.acessibilidade.findUnique({ where: { nome: "Tadoma" } });

  // Conectar barreiras com acessibilidades
  await prisma.barreiraAcessibilidade.createMany({
    data: [
      // Barreira de leitura
      { barreiraId: barreiraLeitura.id, acessibilidadeId: acessLeitor!.id },
      { barreiraId: barreiraLeitura.id, acessibilidadeId: acessBraille!.id },
      { barreiraId: barreiraLeitura.id, acessibilidadeId: acessAudio!.id },
      // Barreira de navegação
      { barreiraId: barreiraNavegacao.id, acessibilidadeId: acessPiso!.id },
      { barreiraId: barreiraNavegacao.id, acessibilidadeId: acessLeitor!.id },
      { barreiraId: barreiraNavegacao.id, acessibilidadeId: acessAudio!.id },
      // Barreira de cores
      { barreiraId: barreiraCores.id, acessibilidadeId: acessCores!.id },
      // Barreira de comunicação
      { barreiraId: barreiraComunicacao.id, acessibilidadeId: acessLibras!.id },
      { barreiraId: barreiraComunicacao.id, acessibilidadeId: acessVisual!.id },
      { barreiraId: barreiraComunicacao.id, acessibilidadeId: acessTadoma!.id },
      // Barreira de áudio
      { barreiraId: barreiraAudio.id, acessibilidadeId: acessLegendas!.id },
      { barreiraId: barreiraAudio.id, acessibilidadeId: acessAmplificacao!.id },
      { barreiraId: barreiraAudio.id, acessibilidadeId: acessLibras!.id },
      // Barreira de acesso
      { barreiraId: barreiraAcesso.id, acessibilidadeId: acessRampa!.id },
      { barreiraId: barreiraAcesso.id, acessibilidadeId: acessElevador!.id },
      { barreiraId: barreiraAcesso.id, acessibilidadeId: acessBanheiro!.id },
      // Barreira de locomoção
      { barreiraId: barreiraLocomocao.id, acessibilidadeId: acessRampa!.id },
      { barreiraId: barreiraLocomocao.id, acessibilidadeId: acessElevador!.id },
      // Barreira de manipulação
      { barreiraId: barreiraManipulacao.id, acessibilidadeId: acessMesa!.id },
      { barreiraId: barreiraManipulacao.id, acessibilidadeId: acessTeclado!.id },
      // Barreira de compreensão
      { barreiraId: barreiraCompreensao.id, acessibilidadeId: acessLinguagem!.id },
      { barreiraId: barreiraCompreensao.id, acessibilidadeId: acessInstrucoes!.id },
      // Barreira de concentração
      { barreiraId: barreiraConcentracao.id, acessibilidadeId: acessSilencio!.id },
      { barreiraId: barreiraConcentracao.id, acessibilidadeId: acessInstrucoes!.id },
    ]
  });

  // Associar acessibilidades com empresas
  await prisma.empresaAcessibilidade.createMany({
    data: [
      { empresaId: empresa1.id, acessibilidadeId: acessRampa!.id },
      { empresaId: empresa1.id, acessibilidadeId: acessLibras!.id },
      { empresaId: empresa1.id, acessibilidadeId: acessLeitor!.id },
      { empresaId: empresa1.id, acessibilidadeId: acessBraille!.id },
      { empresaId: empresa2.id, acessibilidadeId: acessRampa!.id },
      { empresaId: empresa2.id, acessibilidadeId: acessBanheiro!.id },
      { empresaId: empresa2.id, acessibilidadeId: acessElevador!.id },
      { empresaId: empresa2.id, acessibilidadeId: acessLinguagem!.id },
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
        tipoFormacao: "Superior",
        instituicao: "USP",
        situacao: "Concluído",
        dataInicio: new Date("2008-02-01"),
        dataFim: new Date("2012-12-01"),
        descricao: "Graduação completa."
      },
      {
        candidatoId: candidato2.id,
        nomeCurso: "Administração",
        tipoFormacao: "Superior",
        instituicao: "FGV",
        situacao: "Concluído",
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
        titulo: "Desenvolvedor Full Stack",
        instituicao: "Empresa ABC",
        dataInicio: new Date("2013-01-01"),
        dataFim: new Date("2020-12-31"),
        descricao: "Desenvolvimento de aplicações web",
        tipoContrato: "CLT"
      },
      {
        candidatoId: candidato2.id,
        titulo: "Analista de RH",
        instituicao: "Consultoria XYZ",
        dataInicio: new Date("2010-03-01"),
        dataFim: new Date("2022-06-30"),
        descricao: "Gestão de recursos humanos",
        tipoContrato: "CLT"
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