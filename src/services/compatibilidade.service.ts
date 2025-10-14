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
        },
        habilidades: true
      }
    });

    // Buscar dados da vaga com empresa e acessibilidades
    const vaga = await prisma.vagas.findUnique({
      where: { id: vagaId },
      include: {
        empresa: {
          include: {
            empresaAcessibilidade: {
              include: {
                acessibilidade: {
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
        }
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
    // Obter todas as barreiras do candidato
    const barreiras = candidato.subtipos.flatMap((cs: any) => 
      cs.subtipo.barreiras.map((sb: any) => sb.barreira)
    );

    if (barreiras.length === 0) {
      return 1.0; // Se não há barreiras, compatibilidade máxima
    }

    // Obter todas as acessibilidades da empresa
    const acessibilidades = vaga.empresa.empresaAcessibilidade.map((ea: any) => ea.acessibilidade);

    // Verificar quantas barreiras são resolvidas pelas acessibilidades
    let barreirasResolvidas = 0;

    for (const barreira of barreiras) {
      const barreiraResolvida = acessibilidades.some((acessibilidade: any) =>
        acessibilidade.barreiras.some((ba: any) => ba.barreira.id === barreira.id)
      );
      
      if (barreiraResolvida) {
        barreirasResolvidas++;
      }
    }

    return barreiras.length > 0 ? barreirasResolvidas / barreiras.length : 1.0;
  },

  calcularCompatibilidadeHabilidades(candidato: any, vaga: any): number {
    const habilidadesCandidato = candidato.habilidades.map((h: any) => h.nome.toLowerCase().trim());
    const habilidadesVaga = vaga.habilidades.map((h: string) => h.toLowerCase().trim());

    if (habilidadesVaga.length === 0) {
      return 1.0; // Se a vaga não exige habilidades específicas
    }

    // Contar habilidades que coincidem
    const habilidadesCoincidentes = habilidadesVaga.filter((habilidadeVaga: string) =>
      habilidadesCandidato.some((habilidadeCandidato: string) =>
        habilidadeCandidato.includes(habilidadeVaga) || habilidadeVaga.includes(habilidadeCandidato)
      )
    );

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
      const apoioRelevante = apoiosVaga.some((apoio: string) =>
        apoio.includes('acessibilidade') ||
        apoio.includes('adaptação') ||
        apoio.includes('suporte') ||
        barreira.includes(apoio) ||
        apoio.includes(barreira.split(' ')[0]) // Primeira palavra da barreira
      );
      
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