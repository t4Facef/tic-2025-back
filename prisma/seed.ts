import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Verificar se já existem dados básicos
  const tiposExistentes = await prisma.tipoDeficiencia.count();
  if (tiposExistentes > 0) {
    console.log('Dados básicos já existem. Pulando seed para preservar dados do usuário.');
    return;
  }

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

  // Candidato de teste
  await prisma.candidato.create({
    data: {
      nome: 'Luciano Mazarao Jr',
      email: 'lmazaraojr1@gmail.com',
      senha: hashCandidato,
      dataNascimento: new Date('1990-01-01'),
      areaInteresse: 'Tecnologia'
    }
  });

  // Empresa de teste
  const empresaTeste = await prisma.empresa.create({
    data: {
      razaoSocial: 'Empresa Teste Ltda',
      nomeFantasia: 'Empresa Teste',
      email: 'lmazaraojr2@gmail.com',
      senha: hashEmpresa,
      cnpj: '12345678000199',
      telefoneComercial: '11999999999',
      area: 'Tecnologia'
    }
  });

  // Candidatos extras para teste
  const candidatoTeste1 = await prisma.candidato.create({
    data: {
      nome: 'Ana Costa',
      email: 'ana@teste.com',
      senha: await bcrypt.hash('123456', 10),
      dataNascimento: new Date('1992-03-15'),
      areaInteresse: 'Tecnologia',
      habilidades: ['JavaScript', 'React', 'Node.js']
    }
  });

  const candidatoTeste2 = await prisma.candidato.create({
    data: {
      nome: 'Carlos Silva',
      email: 'carlos@teste.com',
      senha: await bcrypt.hash('123456', 10),
      dataNascimento: new Date('1988-07-22'),
      areaInteresse: 'Tecnologia',
      habilidades: ['Python', 'Django', 'PostgreSQL']
    }
  });

  // Associar candidatos com subtipos para compatibilidade
  await prisma.candidatoSubtipo.createMany({
    data: [
      { candidatoId: candidatoTeste1.id, subtipoId: baixaVisao.id },
      { candidatoId: candidatoTeste2.id, subtipoId: usuarioLibras.id },
    ]
  });

  // Vaga da empresa de teste com alta compatibilidade
  const vagaTeste = await prisma.vagas.create({
    data: {
      titulo: 'Desenvolvedor Full Stack',
      localizacao: 'São Paulo, SP',
      descricao: 'Vaga para desenvolvedor full stack com foco em acessibilidade',
      habilidades: ['JavaScript', 'React', 'Node.js', 'Python'],
      apoios: ['Software leitor de tela', 'Intérprete de Libras', 'Mesa ajustável'],
      compatibilidade: 0.885,
      dataInicio: new Date('2024-01-01'),
      dataFim: new Date('2024-12-31'),
      tipoContrato: 'CLT',
      tipoTrabalho: 'Híbrido',
      pagamento: 'R$ 6.000 - R$ 8.000',
      nivelTrabalho: 'Pleno',
      turno: 'Comercial',
      empresaId: empresaTeste.id
    }
  });

  // Candidaturas para a vaga de teste com alta compatibilidade
  await prisma.candidaturas.createMany({
    data: [
      { candidatoId: candidatoTeste1.id, vagaId: vagaTeste.id, status: 'PENDENTE' },
      { candidatoId: candidatoTeste2.id, vagaId: vagaTeste.id, status: 'PENDENTE' },
    ]
  });

  // Criar administrador padrão
  const adminExistente = await prisma.administrador.count();
  if (adminExistente === 0) {
    await prisma.administrador.create({
      data: {
        nome: "admin",
        senha: hashAdmin
      }
    });
    console.log("Administrador padrão criado: login=admin, senha=admin123");
  }

  console.log("Seed executado com sucesso!");
}

main()
  .catch((e) => {
    console.error('Seed execution failed:', e instanceof Error ? e.message : 'Unknown error');
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });