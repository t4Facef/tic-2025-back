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
        habilidades: true,
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
  }
};