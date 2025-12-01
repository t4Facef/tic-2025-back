import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Criar tipos de deficiência (combinando dados existentes + professor)
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

  // Criar subtipos de deficiência (incluindo os do professor)
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

  const usuarioLibras = await prisma.subtipoDeficiencia.create({
    data: { nome: "Usuário de Libras", tipoId: tipoAuditiva.id }
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

  const amputacaoMuleta = await prisma.subtipoDeficiencia.create({
    data: { nome: "Amputação MIE com muleta", tipoId: tipoFisica.id }
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

  // Criar barreiras (combinando dados existentes + professor)
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

  // Barreiras específicas do professor
  const escadas = await prisma.barreira.create({
    data: { descricao: "Escadas" }
  });

  const degrausAltos = await prisma.barreira.create({
    data: { descricao: "Degraus altos" }
  });

  const pisoIrregular = await prisma.barreira.create({
    data: { descricao: "Piso irregular" }
  });

  const faltaInterprete = await prisma.barreira.create({
    data: { descricao: "Ausência de intérprete de Libras" }
  });

  const faltaContraste = await prisma.barreira.create({
    data: { descricao: "Falta de contraste visual" }
  });

  const faltaSinalizacaoTatil = await prisma.barreira.create({
    data: { descricao: "Falta de sinalização tátil" }
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

  const endereco3 = await prisma.endereco.create({
    data: {
      cep: "01310-200",
      estado: "SP",
      cidade: "São Paulo",
      bairro: "Bela Vista",
      rua: "Rua Augusta",
      numero: "2000"
    }
  });

  const endereco4 = await prisma.endereco.create({
    data: {
      cep: "22020-000",
      estado: "RJ",
      cidade: "Rio de Janeiro",
      bairro: "Botafogo",
      rua: "Praia de Botafogo",
      numero: "300"
    }
  });

  const endereco5 = await prisma.endereco.create({
    data: {
      cep: "04038-001",
      estado: "SP",
      cidade: "São Paulo",
      bairro: "Vila Olímpia",
      rua: "Rua Funchal",
      numero: "418"
    }
  });

  const endereco6 = await prisma.endereco.create({
    data: {
      cep: "05426-000",
      estado: "SP",
      cidade: "São Paulo",
      bairro: "Vila Madalena",
      rua: "Rua Harmonia",
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
      habilidades: ["JavaScript", "React", "Node.js", "PostgreSQL"]
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
      habilidades: ["Recrutamento", "Gestão de Pessoas", "Excel", "PowerBI"]
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
      localizacao: "São Paulo, SP",
      descricao: "Vaga para desenvolvedor frontend com foco em acessibilidade web",
      habilidades: ["React", "JavaScript", "HTML", "CSS", "Acessibilidade Web"],
      apoios: ["Software leitor de tela", "Teclado adaptado"],
      compatibilidade: 0.855,
      dataInicio: new Date("2024-01-15"),
      dataFim: new Date("2024-12-31"),
      tipoContrato: "CLT",
      tipoTrabalho: "Remoto",
      pagamento: "R$ 5.000 - R$ 7.000",
      nivelTrabalho: "Pleno",
        turno: "Comercial",
        setor: empresa1.area,
        empresaId: empresa1.id
    }
  });

  const vaga2 = await prisma.vagas.create({
    data: {
      titulo: "Analista de RH",
      localizacao: "Rio de Janeiro, RJ",
      descricao: "Vaga para analista de recursos humanos especializado em inclusão",
      habilidades: ["Recrutamento", "Seleção", "Gestão de Pessoas", "Diversidade e Inclusão"],
      apoios: ["Intérprete de Libras", "Comunicação visual"],
      compatibilidade: 0.92,
      dataInicio: new Date("2024-02-01"),
      dataFim: new Date("2024-11-30"),
      tipoContrato: "CLT",
      tipoTrabalho: "Presencial",
      pagamento: "R$ 4.000 - R$ 5.500",
      nivelTrabalho: "Pleno",
        turno: "Comercial",
        setor: empresa2.area,
        empresaId: empresa2.id
    }
  });

  const vaga3 = await prisma.vagas.create({
    data: {
      titulo: "Desenvolvedor Backend",
      localizacao: "Belo Horizonte, MG",
      descricao: "Desenvolvedor Node.js para APIs REST e microserviços",
      habilidades: ["Node.js", "PostgreSQL", "Express", "Docker", "AWS"],
      apoios: ["Software leitor de tela", "Mesa ajustável", "Ambiente silencioso"],
      compatibilidade: 0.783,
      dataInicio: new Date("2024-03-01"),
      dataFim: new Date("2025-02-28"),
      tipoContrato: "PJ",
      tipoTrabalho: "Híbrido",
      pagamento: "R$ 6.000 - R$ 9.000",
      nivelTrabalho: "Sênior",
        turno: "Flexível",
        setor: empresa1.area,
        empresaId: empresa1.id
    }
  });

  const vaga4 = await prisma.vagas.create({
    data: {
      titulo: "Designer UX/UI",
      localizacao: "Porto Alegre, RS",
      descricao: "Designer focado em experiência do usuário inclusiva e acessível",
      habilidades: ["Figma", "Adobe XD", "Prototipagem", "Design System", "Acessibilidade"],
      apoios: ["Contraste de cores", "Software leitor de tela", "Linguagem simples"],
      compatibilidade: 0.887,
      dataInicio: new Date("2024-01-20"),
      dataFim: new Date("2024-10-20"),
      tipoContrato: "CLT",
      tipoTrabalho: "Remoto",
      pagamento: "R$ 4.500 - R$ 6.500",
      nivelTrabalho: "Pleno",
        turno: "Comercial",
        setor: empresa2.area,
        empresaId: empresa2.id
    }
  });

  const vaga5 = await prisma.vagas.create({
    data: {
      titulo: "Analista de Dados",
      localizacao: "Brasília, DF",
      descricao: "Análise de dados e business intelligence para tomada de decisões",
      habilidades: ["Python", "SQL", "Power BI", "Estatística", "Machine Learning"],
      apoios: ["Rampa de acesso", "Banheiro adaptado", "Elevador"],
      compatibilidade: 0.912,
      dataInicio: new Date("2024-04-01"),
      dataFim: new Date("2025-03-31"),
      tipoContrato: "CLT",
      tipoTrabalho: "Presencial",
      pagamento: "R$ 5.500 - R$ 8.000",
      nivelTrabalho: "Sênior",
        turno: "Comercial",
        setor: empresa1.area,
        empresaId: empresa1.id
    }
  });

  const vaga6 = await prisma.vagas.create({
    data: {
      titulo: "Estagiário de TI",
      localizacao: "Recife, PE",
      descricao: "Estágio em desenvolvimento de software com mentoria especializada",
      habilidades: ["JavaScript", "HTML", "CSS", "Git", "Lógica de Programação"],
      apoios: ["Instruções claras", "Ambiente silencioso", "Software leitor de tela"],
      compatibilidade: 0.95,
      dataInicio: new Date("2024-02-15"),
      dataFim: new Date("2024-08-15"),
      tipoContrato: "Estágio",
      tipoTrabalho: "Híbrido",
      pagamento: "R$ 1.200 - R$ 1.500",
      nivelTrabalho: "Júnior",
      turno: "Matutino",
        setor: empresa2.area,
        empresaId: empresa2.id
    }
  });

  const vaga7 = await prisma.vagas.create({
    data: {
      titulo: "Gerente de Projetos",
      localizacao: "Curitiba, PR",
      descricao: "Gestão de projetos de tecnologia com foco em metodologias ágeis",
      habilidades: ["Scrum", "Kanban", "Jira", "Gestão de Equipes", "Comunicação"],
      apoios: ["Intérprete de Libras", "Comunicação visual", "Legendas"],
      compatibilidade: 0.824,
      dataInicio: new Date("2024-05-01"),
      dataFim: new Date("2025-04-30"),
      tipoContrato: "CLT",
      tipoTrabalho: "Presencial",
      pagamento: "R$ 8.000 - R$ 12.000",
      nivelTrabalho: "Sênior",
      turno: "Comercial",
        setor: empresa1.area,
        empresaId: empresa1.id
    }
  });

  const vaga8 = await prisma.vagas.create({
    data: {
      titulo: "Desenvolvedor Mobile",
      localizacao: "Fortaleza, CE",
      descricao: "Desenvolvimento de aplicativos móveis acessíveis para Android e iOS",
      habilidades: ["React Native", "Flutter", "JavaScript", "TypeScript", "Acessibilidade Mobile"],
      apoios: ["Teclado adaptado", "Software leitor de tela", "Mesa ajustável"],
      compatibilidade: 0.871,
      dataInicio: new Date("2024-03-15"),
      dataFim: new Date("2024-12-15"),
      tipoContrato: "PJ",
      tipoTrabalho: "Remoto",
      pagamento: "R$ 7.000 - R$ 10.000",
      nivelTrabalho: "Pleno",
      turno: "Flexível",
        setor: empresa2.area,
        empresaId: empresa2.id
    }
  });

  // Criar candidaturas com datas variadas para testar estatísticas
  const hoje = new Date();
  const ontem = new Date(hoje);
  ontem.setDate(hoje.getDate() - 1);
  const semanaPassada = new Date(hoje);
  semanaPassada.setDate(hoje.getDate() - 7);
  const mesPassado = new Date(hoje);
  mesPassado.setMonth(hoje.getMonth() - 1);

  await prisma.candidaturas.createMany({
    data: [
      // Candidaturas de hoje
      { candidatoId: candidato1.id, vagaId: vaga1.id, status: "PENDENTE", dataCandidatura: hoje },
      { candidatoId: candidato2.id, vagaId: vaga2.id, status: "PENDENTE", dataCandidatura: hoje },
      { candidatoId: candidato1.id, vagaId: vaga4.id, status: "PENDENTE", dataCandidatura: hoje },
      
      // Candidaturas de ontem
      { candidatoId: candidato2.id, vagaId: vaga3.id, status: "APROVADO", dataCandidatura: ontem },
      { candidatoId: candidato1.id, vagaId: vaga5.id, status: "PENDENTE", dataCandidatura: ontem },
      
      // Candidaturas da semana passada
      { candidatoId: candidato2.id, vagaId: vaga6.id, status: "RECUSADO", dataCandidatura: semanaPassada },
      { candidatoId: candidato1.id, vagaId: vaga7.id, status: "PENDENTE", dataCandidatura: semanaPassada },
      
      // Candidaturas do mês passado
      { candidatoId: candidato2.id, vagaId: vaga8.id, status: "APROVADO", dataCandidatura: mesPassado },
      { candidatoId: candidato1.id, vagaId: vaga2.id, status: "RECUSADO", dataCandidatura: mesPassado },
    ]
  });

  // Criar usuários de teste solicitados
  const hashCandidato = await bcrypt.hash('Luciano14@', 10);
  const hashEmpresa = await bcrypt.hash('Luciano14@', 10);
  const hashAdmin = await bcrypt.hash('admin123', 10);

  // Criar endereços para candidatos de teste
  const enderecoLuciano = await prisma.endereco.create({
    data: {
      cep: "04038-001",
      estado: "SP",
      cidade: "São Paulo",
      bairro: "Vila Olímpia",
      rua: "Rua Funchal",
      numero: "263"
    }
  });

  const enderecoAna = await prisma.endereco.create({
    data: {
      cep: "01310-100",
      estado: "SP", 
      cidade: "São Paulo",
      bairro: "Bela Vista",
      rua: "Av. Paulista",
      numero: "1500"
    }
  });

  const enderecoCarlos = await prisma.endereco.create({
    data: {
      cep: "04567-000",
      estado: "SP",
      cidade: "São Paulo", 
      bairro: "Itaim Bibi",
      rua: "Av. Faria Lima",
      numero: "1000"
    }
  });

  const enderecoMarcos = await prisma.endereco.create({
    data: {
      cep: "01310-200",
      estado: "SP",
      cidade: "São Paulo",
      bairro: "Consolação", 
      rua: "Rua Augusta",
      numero: "800"
    }
  });

  // Candidato de teste principal (Luciano) com perfil completo
  const luciano = await prisma.candidato.create({
    data: {
      nome: 'Luciano Mazarao Jr',
      email: 'lmazaraojr1@gmail.com',
      senha: hashCandidato,
      cpf: '11122233344',
      dataNascimento: new Date('1995-08-15'),
      sexo: 'Masculino',
      genero: 'Masculino',
      telefones: ['11987654321', '1133334444'],
      areaInteresse: 'Tecnologia',
      habilidades: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'Git'],
      enderecoId: enderecoLuciano.id
    }
  });

  // Empresa de teste
  const empresaTeste = await prisma.empresa.create({
    data: {
      razaoSocial: 'Empresa Teste Ltda',
      nomeFantasia: 'Inovação Tech',
      email: 'lmazaraojr2@gmail.com',
      senha: hashEmpresa,
      cnpj: '12345678000199',
      telefoneComercial: '11999999999',
      numFunc: 150,
      numFuncPcd: 15,
      area: 'Tecnologia',
      site: 'https://inovacaotech.com.br',
      descricao: 'Empresa focada em soluções tecnológicas inovadoras e inclusivas',
      historia: 'Fundada em 2020 com o objetivo de criar tecnologia acessível para todos',
      missao: 'Desenvolver soluções tecnológicas que promovam a inclusão digital',
      valores: 'Inovação, Inclusão, Excelência, Colaboração',
      anoFundacao: 2020,
      certificacoes: ['ISO 9001', 'Empresa Cidadã']
    }
  });

  // Candidatos extras para teste com perfis completos
  const candidatoAna = await prisma.candidato.create({
    data: {
      nome: 'Ana Costa Silva',
      email: 'ana@teste.com',
      senha: await bcrypt.hash('123456', 10),
      cpf: '12345678901',
      dataNascimento: new Date('1992-03-15'),
      sexo: 'Feminino',
      genero: 'Feminino',
      telefones: ['11987651234'],
      areaInteresse: 'Tecnologia',
      habilidades: ['JavaScript', 'React', 'Vue.js', 'CSS', 'HTML'],
      enderecoId: enderecoAna.id
    }
  });

  const candidatoCarlos = await prisma.candidato.create({
    data: {
      nome: 'Carlos Silva Santos',
      email: 'carlos@teste.com',
      senha: await bcrypt.hash('123456', 10),
      cpf: '98765432101',
      dataNascimento: new Date('1988-07-22'),
      sexo: 'Masculino',
      genero: 'Masculino',
      telefones: ['11987659876'],
      areaInteresse: 'Tecnologia',
      habilidades: ['Python', 'Django', 'PostgreSQL', 'Linux', 'Docker'],
      enderecoId: enderecoCarlos.id
    }
  });

  const candidatoMarcos = await prisma.candidato.create({
    data: {
      nome: 'Marcos Pereira Lima',
      email: 'marcos@teste.com', 
      senha: await bcrypt.hash('123456', 10),
      cpf: '11223344556',
      dataNascimento: new Date('1990-12-10'),
      sexo: 'Masculino',
      genero: 'Masculino',
      telefones: ['11987654567'],
      areaInteresse: 'Design',
      habilidades: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'UX/UI'],
      enderecoId: enderecoMarcos.id
    }
  });

  // Associar candidatos com subtipos de deficiência
  await prisma.candidatoSubtipo.createMany({
    data: [
      { candidatoId: luciano.id, subtipoId: baixaVisao.id },
      { candidatoId: candidatoAna.id, subtipoId: daltonismo.id },
      { candidatoId: candidatoCarlos.id, subtipoId: surdez.id },
      { candidatoId: candidatoMarcos.id, subtipoId: cadeirante.id },
    ]
  });

  // Criar formações para candidatos de teste
  await prisma.formacaoOuCurso.createMany({
    data: [
      {
        candidatoId: luciano.id,
        nomeCurso: "Análise e Desenvolvimento de Sistemas",
        tipoFormacao: "Superior",
        instituicao: "FATEC São Paulo",
        situacao: "Concluído",
        dataInicio: new Date("2018-02-01"),
        dataFim: new Date("2021-12-01"),
        descricao: "Graduação focada em desenvolvimento de software e gestão de projetos"
      },
      {
        candidatoId: candidatoAna.id,
        nomeCurso: "Engenharia da Computação",
        tipoFormacao: "Superior", 
        instituicao: "Universidade de São Paulo",
        situacao: "Concluído",
        dataInicio: new Date("2010-02-01"),
        dataFim: new Date("2014-12-01"),
        descricao: "Engenharia com foco em hardware e software"
      },
      {
        candidatoId: candidatoCarlos.id,
        nomeCurso: "Ciência da Computação",
        tipoFormacao: "Superior",
        instituicao: "PUC-SP",
        situacao: "Concluído", 
        dataInicio: new Date("2006-02-01"),
        dataFim: new Date("2010-12-01"),
        descricao: "Graduação em Ciência da Computação com foco em IA"
      }
    ]
  });

  // Criar experiências para candidatos de teste
  await prisma.experiencias.createMany({
    data: [
      {
        candidatoId: luciano.id,
        titulo: "Desenvolvedor Full Stack Pleno",
        instituicao: "TechCorp Solutions",
        dataInicio: new Date("2022-01-15"),
        dataFim: new Date("2024-11-30"),
        descricao: "Desenvolvimento de aplicações web responsivas utilizando React, Node.js e PostgreSQL. Implementação de funcionalidades de acessibilidade seguindo padrões WCAG.",
        tipoContrato: "CLT"
      },
      {
        candidatoId: candidatoAna.id,
        titulo: "Desenvolvedora Frontend",
        instituicao: "WebDesign Pro",
        dataInicio: new Date("2020-03-01"),
        dataFim: new Date("2024-10-31"),
        descricao: "Criação de interfaces modernas e acessíveis, trabalhando com React, Vue.js e design responsivo.",
        tipoContrato: "CLT"
      },
      {
        candidatoId: candidatoCarlos.id,
        titulo: "Desenvolvedor Backend Sênior", 
        instituicao: "DataTech Innovations",
        dataInicio: new Date("2018-08-01"),
        dataFim: new Date("2024-09-30"),
        descricao: "Desenvolvimento de APIs REST e microserviços usando Python/Django. Gestão de bancos de dados e infraestrutura cloud.",
        tipoContrato: "CLT"
      }
    ]
  });

  // Associar acessibilidades com a empresa de teste
  await prisma.empresaAcessibilidade.createMany({
    data: [
      { empresaId: empresaTeste.id, acessibilidadeId: acessLeitor!.id },
      { empresaId: empresaTeste.id, acessibilidadeId: acessBraille!.id },
      { empresaId: empresaTeste.id, acessibilidadeId: acessLibras!.id },
      { empresaId: empresaTeste.id, acessibilidadeId: acessRampa!.id },
      { empresaId: empresaTeste.id, acessibilidadeId: acessElevador!.id },
      { empresaId: empresaTeste.id, acessibilidadeId: acessBanheiro!.id },
      { empresaId: empresaTeste.id, acessibilidadeId: acessMesa!.id },
      { empresaId: empresaTeste.id, acessibilidadeId: acessTeclado!.id },
      { empresaId: empresaTeste.id, acessibilidadeId: acessCores!.id },
    ]
  });

  // Criar empresas de diferentes ramos
  const empresaEducacao = await prisma.empresa.create({
    data: {
      razaoSocial: 'EduTech Brasil Ltda',
      nomeFantasia: 'EduTech',
      email: 'contato@edutech.com.br',
      senha: await bcrypt.hash('123456', 10),
      cnpj: '11222333000144',
      telefoneComercial: '1133445566',
      numFunc: 80,
      numFuncPcd: 8,
      area: 'Educação',
      site: 'https://edutech.com.br',
      enderecoId: endereco3.id
    }
  });

  const empresaSaude = await prisma.empresa.create({
    data: {
      razaoSocial: 'MedCare Soluções Ltda',
      nomeFantasia: 'MedCare',
      email: 'rh@medcare.com.br',
      senha: await bcrypt.hash('123456', 10),
      cnpj: '22333444000155',
      telefoneComercial: '1144556677',
      numFunc: 120,
      numFuncPcd: 12,
      area: 'Saúde',
      site: 'https://medcare.com.br',
      enderecoId: endereco4.id
    }
  });

  const empresaFinancas = await prisma.empresa.create({
    data: {
      razaoSocial: 'FinTech Solutions Ltda',
      nomeFantasia: 'FinTech Pro',
      email: 'vagas@fintechpro.com.br',
      senha: await bcrypt.hash('123456', 10),
      cnpj: '33444555000166', 
      telefoneComercial: '1155667788',
      numFunc: 200,
      numFuncPcd: 20,
      area: 'Financeiro',
      site: 'https://fintechpro.com.br',
      enderecoId: endereco5.id
    }
  });

  const empresaMarketing = await prisma.empresa.create({
    data: {
      razaoSocial: 'Creative Marketing Ltda',
      nomeFantasia: 'Creative',
      email: 'jobs@creative.com.br',
      senha: await bcrypt.hash('123456', 10),
      cnpj: '44555666000177',
      telefoneComercial: '1166778899',
      numFunc: 60,
      numFuncPcd: 6,
      area: 'Marketing',
      site: 'https://creative.com.br',
      enderecoId: endereco6.id
    }
  });

  // Vaga da empresa de teste com 100% de compatibilidade com Luciano
  const vagaLuciano = await prisma.vagas.create({
    data: {
      titulo: 'Desenvolvedor Full Stack Pleno',
      localizacao: 'São Paulo, SP',
      descricao: 'Buscamos desenvolvedor experiente para criar aplicações web modernas e acessíveis. Trabalho em equipe multidisciplinar com foco em inclusão digital.',
      habilidades: ['JavaScript', 'TypeScript', 'React', 'Node.js'],
      apoios: ['Software leitor de tela', 'Contraste de cores', 'Teclado adaptado'],
      compatibilidade: 1.0,
      dataInicio: new Date('2024-12-01'),
      dataFim: new Date('2025-11-30'),
      tipoContrato: 'CLT',
      tipoTrabalho: 'Remoto',
      pagamento: 'R$ 7.500 - R$ 9.500',
      nivelTrabalho: 'Pleno',
      turno: 'Comercial',
      setor: empresaTeste.area,
      empresaId: empresaTeste.id
    }
  });

  // Segunda vaga da empresa de teste
  const vagaTeste2 = await prisma.vagas.create({
    data: {
      titulo: 'Analista de Sistemas Júnior',
      localizacao: 'São Paulo, SP', 
      descricao: 'Oportunidade para analista iniciante trabalhar com levantamento de requisitos e documentação técnica.',
      habilidades: ['SQL', 'UML', 'Análise de Sistemas', 'Documentação'],
      apoios: ['Intérprete de Libras', 'Instruções claras', 'Ambiente silencioso'],
      compatibilidade: 0.78,
      dataInicio: new Date('2024-12-15'),
      dataFim: new Date('2025-12-14'),
      tipoContrato: 'CLT',
      tipoTrabalho: 'Presencial', 
      pagamento: 'R$ 4.000 - R$ 5.500',
      nivelTrabalho: 'Júnior',
      turno: 'Comercial',
      setor: empresaTeste.area,
      empresaId: empresaTeste.id
    }
  });

  // 8 vagas adicionais de diferentes ramos
  const vaga9 = await prisma.vagas.create({
    data: {
      titulo: "Professor de Matemática",
      localizacao: "São Paulo, SP",
      descricao: "Lecionar matemática para ensino médio com metodologias inclusivas",
      habilidades: ["Didática", "Matemática", "Inclusão", "Tecnologia Educacional"],
      apoios: ["Intérprete de Libras", "Material em Braille", "Recursos visuais"],
      compatibilidade: 0.82,
      dataInicio: new Date("2025-02-01"),
      dataFim: new Date("2025-12-20"),
      tipoContrato: "CLT",
      tipoTrabalho: "Presencial",
      pagamento: "R$ 3.500 - R$ 5.000",
      nivelTrabalho: "Pleno",
      turno: "Matutino",
      setor: empresaEducacao.area,
      empresaId: empresaEducacao.id
    }
  });

  const vaga10 = await prisma.vagas.create({
    data: {
      titulo: "Enfermeiro Assistencial",
      localizacao: "Rio de Janeiro, RJ", 
      descricao: "Assistência direta ao paciente em ambiente hospitalar inclusivo",
      habilidades: ["Enfermagem", "Cuidados Intensivos", "Comunicação", "Empatia"],
      apoios: ["Rampa de acesso", "Banheiro adaptado", "Comunicação visual"],
      compatibilidade: 0.89,
      dataInicio: new Date("2025-01-15"),
      dataFim: new Date("2025-12-31"),
      tipoContrato: "CLT",
      tipoTrabalho: "Presencial",
      pagamento: "R$ 4.500 - R$ 6.500",
      nivelTrabalho: "Pleno",
      turno: "Plantão",
      setor: empresaSaude.area,
      empresaId: empresaSaude.id
    }
  });

  const vaga11 = await prisma.vagas.create({
    data: {
      titulo: "Analista Financeiro",
      localizacao: "Brasília, DF",
      descricao: "Análise de investimentos e relatórios financeiros para clientes PF e PJ",
      habilidades: ["Excel Avançado", "Power BI", "Análise Financeira", "Matemática Financeira"],
      apoios: ["Software leitor de tela", "Instruções claras", "Mesa ajustável"],
      compatibilidade: 0.75,
      dataInicio: new Date("2025-01-20"),
      dataFim: new Date("2026-01-19"),
      tipoContrato: "CLT", 
      tipoTrabalho: "Híbrido",
      pagamento: "R$ 5.000 - R$ 7.500",
      nivelTrabalho: "Pleno",
      turno: "Comercial",
      setor: empresaFinancas.area,
      empresaId: empresaFinancas.id
    }
  });

  const vaga12 = await prisma.vagas.create({
    data: {
      titulo: "Designer Gráfico",
      localizacao: "Belo Horizonte, MG",
      descricao: "Criação de materiais visuais para campanhas publicitárias inclusivas",
      habilidades: ["Photoshop", "Illustrator", "InDesign", "Design Gráfico", "Criatividade"],
      apoios: ["Contraste de cores", "Software leitor de tela", "Ambiente silencioso"],
      compatibilidade: 0.88,
      dataInicio: new Date("2025-02-10"),
      dataFim: new Date("2025-11-30"),
      tipoContrato: "PJ",
      tipoTrabalho: "Remoto",
      pagamento: "R$ 3.500 - R$ 5.500",
      nivelTrabalho: "Júnior",
      turno: "Flexível", 
      setor: empresaMarketing.area,
      empresaId: empresaMarketing.id
    }
  });

  const vaga13 = await prisma.vagas.create({
    data: {
      titulo: "Assistente Administrativo",
      localizacao: "Porto Alegre, RS",
      descricao: "Suporte administrativo geral com foco em organização e atendimento",
      habilidades: ["Organização", "Atendimento", "Pacote Office", "Comunicação"],
      apoios: ["Intérprete de Libras", "Linguagem simples", "Instruções claras"],
      compatibilidade: 0.72,
      dataInicio: new Date("2025-01-08"),
      dataFim: new Date("2025-12-31"),
      tipoContrato: "CLT",
      tipoTrabalho: "Presencial",
      pagamento: "R$ 2.500 - R$ 3.500",
      nivelTrabalho: "Júnior",
      turno: "Comercial",
      setor: "Administração",
      empresaId: empresa2.id
    }
  });

  const vaga14 = await prisma.vagas.create({
    data: {
      titulo: "Coordenador Pedagógico",
      localizacao: "Curitiba, PR",
      descricao: "Coordenação de projetos educacionais com foco em educação inclusiva",
      habilidades: ["Pedagogia", "Gestão Educacional", "Inclusão", "Liderança"],
      apoios: ["Material em Braille", "Ambiente acessível", "Tecnologia assistiva"],
      compatibilidade: 0.91,
      dataInicio: new Date("2025-03-01"),
      dataFim: new Date("2025-12-20"),
      tipoContrato: "CLT",
      tipoTrabalho: "Presencial",
      pagamento: "R$ 6.000 - R$ 8.500",
      nivelTrabalho: "Sênior",
      turno: "Comercial",
      setor: empresaEducacao.area,
      empresaId: empresaEducacao.id
    }
  });

  const vaga15 = await prisma.vagas.create({
    data: {
      titulo: "Fisioterapeuta",
      localizacao: "Salvador, BA",
      descricao: "Atendimento fisioterapêutico especializado em reabilitação",
      habilidades: ["Fisioterapia", "Reabilitação", "Anatomia", "Cuidado Humanizado"],
      apoios: ["Elevador", "Equipamentos adaptados", "Comunicação visual"],
      compatibilidade: 0.86,
      dataInicio: new Date("2025-01-30"),
      dataFim: new Date("2026-01-29"),
      tipoContrato: "CLT",
      tipoTrabalho: "Presencial", 
      pagamento: "R$ 4.000 - R$ 6.000",
      nivelTrabalho: "Pleno",
      turno: "Comercial",
      setor: empresaSaude.area,
      empresaId: empresaSaude.id
    }
  });

  const vaga16 = await prisma.vagas.create({
    data: {
      titulo: "Consultor de Vendas",
      localizacao: "Fortaleza, CE",
      descricao: "Vendas consultivas de produtos financeiros com atendimento humanizado",
      habilidades: ["Vendas", "Relacionamento", "Produtos Financeiros", "Negociação"],
      apoios: ["Ambiente acessível", "Material em formatos alternativos", "Flexibilidade"],
      compatibilidade: 0.77,
      dataInicio: new Date("2025-02-15"),
      dataFim: new Date("2025-12-31"),
      tipoContrato: "CLT",
      tipoTrabalho: "Presencial",
      pagamento: "R$ 3.000 + comissões",
      nivelTrabalho: "Júnior",
      turno: "Comercial",
      setor: empresaFinancas.area,
      empresaId: empresaFinancas.id
    }
  });

  // Candidaturas com mensagens para a vaga do Luciano (vaga que terá 100% compatibilidade)
  await prisma.candidaturas.createMany({
    data: [
      {
        candidatoId: candidatoAna.id,
        vagaId: vagaLuciano.id,
        status: "PENDENTE",
        mensagem: "Olá! Tenho grande interesse nesta vaga. Sou desenvolvedora frontend com 4 anos de experiência e estou sempre buscando trabalhar em projetos que priorizem acessibilidade. Acredito que posso contribuir muito com a equipe!",
        dataCandidatura: new Date("2024-12-01T09:30:00")
      },
      {
        candidatoId: candidatoCarlos.id,
        vagaId: vagaLuciano.id,
        status: "PENDENTE", 
        mensagem: "Bom dia! Esta oportunidade me chamou muito a atenção pela proposta de trabalhar com inclusão digital. Tenho sólida experiência em backend com Python e bancos de dados, e gostaria de expandir meus conhecimentos para full stack.",
        dataCandidatura: new Date("2024-12-01T14:15:00")
      },
      {
        candidatoId: candidatoMarcos.id,
        vagaId: vagaLuciano.id, 
        status: "PENDENTE",
        mensagem: "Prezados, embora minha experiência seja mais focada em design, tenho interesse em fazer a transição para desenvolvimento. Acredito que minha visão de UX/UI pode agregar valor ao time técnico.",
        dataCandidatura: new Date("2024-12-01T16:45:00")
      }
    ]
  });

  // Criar administrador padrão se não existir
  const adminPadraoExiste = await prisma.administrador.findUnique({
    where: { nome: "admin@tic2025.com" }
  });
  
  if (!adminPadraoExiste) {
    await prisma.administrador.create({
      data: {
        nome: "admin@tic2025.com", // Armazenado como nome mas é um email
        senha: hashAdmin
      }
    });
    console.log("Administrador padrão criado: email=admin@tic2025.com, senha=admin123");
  } else {
    console.log("Administrador padrão já existe: admin@tic2025.com");
  }

  // Criar admin adicional para Luciano
  const adminLucianoExiste = await prisma.administrador.findUnique({
    where: { nome: "lmazaraojr@gmail.com" }
  });
  
  if (!adminLucianoExiste) {
    const hashAdminLuciano = await bcrypt.hash('1', 10);
    await prisma.administrador.create({
      data: {
        nome: "lmazaraojr@gmail.com",
        senha: hashAdminLuciano
      }
    });
    console.log("Admin adicional criado: email=lmazaraojr@gmail.com, senha=1");
  } else {
    console.log("Admin adicional já existe: lmazaraojr@gmail.com");
  }

  console.log("🎯 Seed executado com sucesso para apresentação!");
  console.log("");
  console.log("📋 DADOS PARA APRESENTAÇÃO:");
  console.log("==============================");
  console.log("👤 SEU CANDIDATO:");
  console.log("   Email: lmazaraojr1@gmail.com");
  console.log("   Senha: Luciano14@");
  console.log("");
  console.log("🏢 SUA EMPRESA:");
  console.log("   Email: lmazaraojr2@gmail.com");
  console.log("   Senha: Luciano14@");
  console.log("");
  console.log("🔧 ADMIN:");
  console.log("   Email: admin@tic2025.com");
  console.log("   Senha: admin123");
  console.log("");
  console.log("✅ Sistema pronto com:");
  console.log("   • 16 vagas de diferentes ramos");
  console.log("   • 2 vagas da sua empresa de teste");
  console.log("   • 4 candidatos com perfis completos");
  console.log("   • 3 candidaturas com mensagens na vaga principal");
  console.log("   • 1 vaga com 100% de compatibilidade para seu perfil");
  console.log("");
}

main()
  .catch((e) => {
    console.error('Seed execution failed:', e instanceof Error ? e.message : 'Unknown error');
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });