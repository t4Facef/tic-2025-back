/*
  Warnings:

  - You are about to drop the column `data` on the `Arquivo` table. All the data in the column will be lost.
  - You are about to drop the column `foto` on the `Candidato` table. All the data in the column will be lost.
  - You are about to drop the column `laudo` on the `Candidato` table. All the data in the column will be lost.
  - You are about to drop the column `foto` on the `Empresa` table. All the data in the column will be lost.
  - Made the column `filePath` on table `Arquivo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Arquivo" DROP COLUMN "data",
ALTER COLUMN "filePath" SET NOT NULL;

-- AlterTable
ALTER TABLE "Candidato" DROP COLUMN "foto",
DROP COLUMN "laudo";

-- AlterTable
ALTER TABLE "Empresa" DROP COLUMN "foto";

-- CreateTable
CREATE TABLE "VagaAcessibilidade" (
    "vagaId" INTEGER NOT NULL,
    "acessibilidadeId" INTEGER NOT NULL,

    CONSTRAINT "VagaAcessibilidade_pkey" PRIMARY KEY ("vagaId","acessibilidadeId")
);

-- CreateTable
CREATE TABLE "Notificacao" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notificacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificacaoCandidato" (
    "notificacaoId" INTEGER NOT NULL,
    "candidatoId" INTEGER NOT NULL,
    "lida" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NotificacaoCandidato_pkey" PRIMARY KEY ("notificacaoId","candidatoId")
);

-- CreateTable
CREATE TABLE "NotificacaoEmpresa" (
    "notificacaoId" INTEGER NOT NULL,
    "empresaId" INTEGER NOT NULL,
    "lida" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NotificacaoEmpresa_pkey" PRIMARY KEY ("notificacaoId","empresaId")
);

-- CreateIndex
CREATE INDEX "VagaAcessibilidade_vagaId_idx" ON "VagaAcessibilidade"("vagaId");

-- AddForeignKey
ALTER TABLE "VagaAcessibilidade" ADD CONSTRAINT "VagaAcessibilidade_vagaId_fkey" FOREIGN KEY ("vagaId") REFERENCES "Vagas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VagaAcessibilidade" ADD CONSTRAINT "VagaAcessibilidade_acessibilidadeId_fkey" FOREIGN KEY ("acessibilidadeId") REFERENCES "Acessibilidade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificacaoCandidato" ADD CONSTRAINT "NotificacaoCandidato_notificacaoId_fkey" FOREIGN KEY ("notificacaoId") REFERENCES "Notificacao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificacaoCandidato" ADD CONSTRAINT "NotificacaoCandidato_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "Candidato"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificacaoEmpresa" ADD CONSTRAINT "NotificacaoEmpresa_notificacaoId_fkey" FOREIGN KEY ("notificacaoId") REFERENCES "Notificacao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificacaoEmpresa" ADD CONSTRAINT "NotificacaoEmpresa_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
