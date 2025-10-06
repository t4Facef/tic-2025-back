/*
  Warnings:

  - You are about to drop the column `descricao` on the `Acessibilidade` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Empresa` table. All the data in the column will be lost.
  - You are about to drop the column `nivel` on the `FormacaoOuCurso` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `FormacaoOuCurso` table. All the data in the column will be lost.
  - You are about to drop the `Application` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JobPosition` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[nome]` on the table `Acessibilidade` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `empresaId` to the `Acessibilidade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Acessibilidade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `areaInteresse` to the `Candidato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `laudo` to the `Candidato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `area` to the `Empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numFunc` to the `Empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numFuncPcd` to the `Empresa` table without a default value. This is not possible if the table is not empty.
  - Made the column `cnpj` on table `Empresa` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `nomeCurso` to the `FormacaoOuCurso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `situacao` to the `FormacaoOuCurso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoFormacao` to the `FormacaoOuCurso` table without a default value. This is not possible if the table is not empty.
  - Made the column `dataInicio` on table `FormacaoOuCurso` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dataFim` on table `FormacaoOuCurso` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "StatusCandidaturas" AS ENUM ('PENDENTE', 'APROVADO', 'RECUSADO');

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_candidatoId_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_vagaId_fkey";

-- DropForeignKey
ALTER TABLE "JobPosition" DROP CONSTRAINT "JobPosition_empresaId_fkey";

-- DropIndex
DROP INDEX "Acessibilidade_descricao_key";

-- AlterTable
ALTER TABLE "Acessibilidade" DROP COLUMN "descricao",
ADD COLUMN     "empresaId" INTEGER NOT NULL,
ADD COLUMN     "nome" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Candidato" ADD COLUMN     "areaInteresse" TEXT NOT NULL,
ADD COLUMN     "foto" BYTEA,
ADD COLUMN     "laudo" BYTEA NOT NULL;

-- AlterTable
ALTER TABLE "Empresa" DROP COLUMN "nome",
ADD COLUMN     "area" TEXT NOT NULL,
ADD COLUMN     "foto" BYTEA,
ADD COLUMN     "numFunc" INTEGER NOT NULL,
ADD COLUMN     "numFuncPcd" INTEGER NOT NULL,
ALTER COLUMN "cnpj" SET NOT NULL;

-- AlterTable
ALTER TABLE "FormacaoOuCurso" DROP COLUMN "nivel",
DROP COLUMN "nome",
ADD COLUMN     "nomeCurso" TEXT NOT NULL,
ADD COLUMN     "situacao" TEXT NOT NULL,
ADD COLUMN     "tipoFormacao" TEXT NOT NULL,
ALTER COLUMN "dataInicio" SET NOT NULL,
ALTER COLUMN "dataFim" SET NOT NULL;

-- DropTable
DROP TABLE "Application";

-- DropTable
DROP TABLE "JobPosition";

-- CreateTable
CREATE TABLE "Vagas" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "requisitos" TEXT[],
    "salario" DOUBLE PRECISION,
    "modalidade" TEXT,
    "cargaHoraria" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DISPONIVEL',
    "habilidades" TEXT[],
    "apoios" TEXT[],
    "empresaId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vagas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Candidaturas" (
    "id" SERIAL NOT NULL,
    "candidatoId" INTEGER NOT NULL,
    "vagaId" INTEGER NOT NULL,
    "status" "StatusCandidaturas" NOT NULL DEFAULT 'PENDENTE',
    "dataCandidatura" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Candidaturas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Habilidades" (
    "id" SERIAL NOT NULL,
    "candidatoId" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Habilidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experiencias" (
    "id" SERIAL NOT NULL,
    "candidatoId" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "instituicao" TEXT NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT,
    "tipoContrato" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Experiencias_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Candidaturas_candidatoId_vagaId_key" ON "Candidaturas"("candidatoId", "vagaId");

-- CreateIndex
CREATE UNIQUE INDEX "Acessibilidade_nome_key" ON "Acessibilidade"("nome");

-- AddForeignKey
ALTER TABLE "Acessibilidade" ADD CONSTRAINT "Acessibilidade_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vagas" ADD CONSTRAINT "Vagas_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidaturas" ADD CONSTRAINT "Candidaturas_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "Candidato"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidaturas" ADD CONSTRAINT "Candidaturas_vagaId_fkey" FOREIGN KEY ("vagaId") REFERENCES "Vagas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Habilidades" ADD CONSTRAINT "Habilidades_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "Candidato"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experiencias" ADD CONSTRAINT "Experiencias_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "Candidato"("id") ON DELETE CASCADE ON UPDATE CASCADE;
