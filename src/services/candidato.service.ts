import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const CandidatoService = {
  async getProfile(candidatoId: number) {
    const candidato = await prisma.candidato.findUnique({
      where: { id: candidatoId },
      include: {
        endereco: true,
        formacoes: true,
        experiencia: true,
        subtipos: {
          include: {
            subtipo: {
              include: {
                tipo: true,
                barreiras: {
                  include: {
                    barreira: {
                      include: {
                        acessibilidades: {
                          include: {
                            acessibilidade: true
                          }
                        }
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

    if (!candidato) {
      throw new Error("Candidato não encontrado");
    }

    return candidato;
  },

  async update(candidatoId: number, data: any) {
    return await prisma.candidato.update({
      where: { id: candidatoId },
      data,
      include: {
        endereco: true,
        formacoes: true,
        experiencia: true,
        subtipos: {
          include: {
            subtipo: {
              include: {
                tipo: true
              }
            }
          }
        }
      }
    });
  },

  async updateFormacoesBatch(candidatoId: number, formacoes: any[]) {
    // Separar novas das existentes
    const novas = formacoes.filter(f => !f.id);
    const existentes = formacoes.filter(f => f.id);

    // 1. Criar novas formações
    if (novas.length > 0) {
      await prisma.formacaoOuCurso.createMany({
        data: novas.map(f => ({
          ...f,
          candidatoId,
          dataInicio: new Date(f.dataInicio),
          dataFim: new Date(f.dataFim)
        }))
      });
    }

    // 2. Atualizar existentes
    for (const formacao of existentes) {
      const { id, ...data } = formacao;
      await prisma.formacaoOuCurso.update({
        where: { id },
        data: {
          ...data,
          dataInicio: new Date(data.dataInicio),
          dataFim: new Date(data.dataFim)
        }
      });
    }
  },

  async updateExperienciasBatch(candidatoId: number, experiencias: any[]) {
    // Separar novas das existentes
    const novas = experiencias.filter(e => !e.id);
    const existentes = experiencias.filter(e => e.id);

    // 1. Criar novas experiências
    if (novas.length > 0) {
      await prisma.experiencias.createMany({
        data: novas.map(e => ({
          ...e,
          candidatoId,
          dataInicio: new Date(e.dataInicio),
          dataFim: new Date(e.dataFim)
        }))
      });
    }

    // 2. Atualizar existentes
    for (const experiencia of existentes) {
      const { id, ...data } = experiencia;
      await prisma.experiencias.update({
        where: { id },
        data: {
          ...data,
          dataInicio: new Date(data.dataInicio),
          dataFim: new Date(data.dataFim)
        }
      });
    }
  }
};