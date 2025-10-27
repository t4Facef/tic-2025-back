import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const CompatibilidadeService = {
  async calcularCompatibilidade(candidatoId: number, vagaId: number): Promise<number> {
    // Buscar dados do candidato com suas deficiências e habilidades
    const candidato = await prisma.candidato.findUnique({
      where: { id: candidatoId },
      include: {
        subtipos: {
          include: {
            subtipo: {
              include: {
                barreiras: {
                  include: {
                    barreira: true
                  }
                }
              }
            }
          }
        }
      }
    });

    // Buscar dados da vaga
    const vaga = await prisma.vagas.findUnique({
      where: { id: vagaId },
      include: {
        empresa: true
      }
    });

    if (!candidato || !vaga) {
      throw new Error("Candidato ou vaga não encontrados");
    }

    // 1. Calcular compatibilidade de acessibilidade (50% do peso total)
    const compatibilidadeAcessibilidade = await this.calcularCompatibilidadeAcessibilidade(candidato, vaga);
    
    // 2. Calcular compatibilidade de habilidades (40% do peso total)
    const compatibilidadeHabilidades = this.calcularCompatibilidadeHabilidades(candidato, vaga);
    
    // 3. Calcular compatibilidade de apoios da vaga (10% do peso total)
    const compatibilidadeApoios = this.calcularCompatibilidadeApoios(candidato, vaga);

    // Calcular compatibilidade final com pesos
    const compatibilidadeFinal = (
      compatibilidadeAcessibilidade * 0.5 +
      compatibilidadeHabilidades * 0.4 +
      compatibilidadeApoios * 0.1
    );

    return Math.round(compatibilidadeFinal * 100) / 100; // Arredondar para 2 casas decimais
  },

  async calcularCompatibilidadeAcessibilidade(candidato: any, vaga: any): Promise<number> {
    // Usar apoios da vaga para calcular compatibilidade
    return this.calcularCompatibilidadeApoios(candidato, vaga);
  },

  calcularCompatibilidadeHabilidades(candidato: any, vaga: any): number {
    // Candidato tem habilidades como array de strings
    const habilidadesCandidato = candidato.habilidades.map((h: string) => h.toLowerCase().trim());
    const habilidadesVaga = vaga.habilidades.map((h: string) => h.toLowerCase().trim());

    if (habilidadesVaga.length === 0) {
      return 1.0; // Se a vaga não exige habilidades específicas
    }

    // Contar habilidades que coincidem (com sinônimos)
    const sinonimos: { [key: string]: string[] } = {
      'javascript': ['js', 'javascript', 'ecmascript'],
      'typescript': ['ts', 'typescript'],
      'python': ['py', 'python'],
      'react': ['react', 'reactjs', 'react.js'],
      'node': ['node', 'nodejs', 'node.js'],
      'sql': ['sql', 'mysql', 'postgresql', 'postgres']
    };
    
    const habilidadesCoincidentes = habilidadesVaga.filter((habilidadeVaga: string) => {
      return habilidadesCandidato.some((habilidadeCandidato: string) => {
        // Verificação direta
        if (habilidadeCandidato.includes(habilidadeVaga) || habilidadeVaga.includes(habilidadeCandidato)) {
          return true;
        }
        
        // Verificação com sinônimos
        for (const [chave, valores] of Object.entries(sinonimos)) {
          if (valores.includes(habilidadeCandidato) && valores.includes(habilidadeVaga)) {
            return true;
          }
        }
        
        return false;
      });
    });

    return habilidadesCoincidentes.length / habilidadesVaga.length;
  },

  calcularCompatibilidadeApoios(candidato: any, vaga: any): number {
    // Verificar se os apoios da vaga atendem às necessidades do candidato
    const apoiosVaga = vaga.apoios.map((a: string) => a.toLowerCase().trim());
    
    // Obter barreiras do candidato para verificar se os apoios são relevantes
    const barreiras = candidato.subtipos.flatMap((cs: any) => 
      cs.subtipo.barreiras.map((sb: any) => sb.barreira.descricao.toLowerCase())
    );

    if (barreiras.length === 0) {
      return 1.0; // Se não há barreiras, apoios não são críticos
    }

    // Verificar se os apoios da vaga são relevantes para as barreiras do candidato
    let apoiosRelevantes = 0;
    
    for (const barreira of barreiras) {
      const barreirasTexto = barreira.toLowerCase();
      const apoioRelevante = apoiosVaga.some((apoio: string) => {
        // Apoios gerais
        if (apoio.includes('acessibilidade') || apoio.includes('adaptação') || apoio.includes('suporte')) {
          return true;
        }
        
        // Apoios específicos para barreiras visuais
        if (barreirasTexto.includes('leitura') || barreirasTexto.includes('navegação visual')) {
          return apoio.includes('leitor de tela') || apoio.includes('braille') || apoio.includes('audiodescrição');
        }
        
        // Apoios específicos para barreiras auditivas
        if (barreirasTexto.includes('comunicação') || barreirasTexto.includes('áudio')) {
          return apoio.includes('libras') || apoio.includes('legendas') || apoio.includes('amplificação');
        }
        
        // Apoios específicos para barreiras físicas
        if (barreirasTexto.includes('acesso') || barreirasTexto.includes('locomoção')) {
          return apoio.includes('rampa') || apoio.includes('elevador') || apoio.includes('banheiro adaptado');
        }
        
        // Apoios específicos para barreiras cognitivas
        if (barreirasTexto.includes('compreensão') || barreirasTexto.includes('concentração')) {
          return apoio.includes('instruções claras') || apoio.includes('linguagem simples') || apoio.includes('ambiente silencioso');
        }
        
        return false;
      });
      
      if (apoioRelevante) {
        apoiosRelevantes++;
      }
    }

    return barreiras.length > 0 ? Math.min(apoiosRelevantes / barreiras.length, 1.0) : 1.0;
  },

  async calcularCompatibilidadeParaTodasVagas(candidatoId: number) {
    const vagas = await prisma.vagas.findMany({
      where: { status: "DISPONIVEL" }
    });

    const compatibilidades = [];

    for (const vaga of vagas) {
      try {
        const compatibilidade = await this.calcularCompatibilidade(candidatoId, vaga.id);
        compatibilidades.push({
          vagaId: vaga.id,
          titulo: vaga.titulo,
          compatibilidade: compatibilidade
        });
      } catch (error) {
        console.error(`Erro ao calcular compatibilidade para vaga ${vaga.id}:`, error);
      }
    }

    // Ordenar por compatibilidade decrescente
    return compatibilidades.sort((a, b) => b.compatibilidade - a.compatibilidade);
  },

  async atualizarCompatibilidadeVaga(vagaId: number) {
    // Buscar todos os candidatos e calcular compatibilidade média para a vaga
    const candidatos = await prisma.candidato.findMany();
    let somaCompatibilidade = 0;
    let contadorCandidatos = 0;

    for (const candidato of candidatos) {
      try {
        const compatibilidade = await this.calcularCompatibilidade(candidato.id, vagaId);
        somaCompatibilidade += compatibilidade;
        contadorCandidatos++;
      } catch (error) {
        console.error(`Erro ao calcular compatibilidade para candidato ${candidato.id}:`, error);
      }
    }

    const compatibilidadeMedia = contadorCandidatos > 0 ? somaCompatibilidade / contadorCandidatos : 0;

    // Atualizar a vaga com a compatibilidade média
    await prisma.vagas.update({
      where: { id: vagaId },
      data: { compatibilidade: compatibilidadeMedia }
    });

    return compatibilidadeMedia;
  }
};