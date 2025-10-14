/*
  Warnings:

  - You are about to drop the column `cargaHoraria` on the `Vagas` table. All the data in the column will be lost.
  - You are about to drop the column `modalidade` on the `Vagas` table. All the data in the column will be lost.
  - You are about to drop the column `requisitos` on the `Vagas` table. All the data in the column will be lost.
  - You are about to drop the column `salario` on the `Vagas` table. All the data in the column will be lost.
  - Added the required column `dataFim` to the `Vagas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataInicio` to the `Vagas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `localizacao` to the `Vagas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nivelTrabalho` to the `Vagas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pagamento` to the `Vagas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoContrato` to the `Vagas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoTrabalho` to the `Vagas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `turno` to the `Vagas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vagas" DROP COLUMN "cargaHoraria",
DROP COLUMN "modalidade",
DROP COLUMN "requisitos",
DROP COLUMN "salario",
ADD COLUMN     "compatibilidade" DOUBLE PRECISION,
ADD COLUMN     "dataFim" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dataInicio" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "localizacao" TEXT NOT NULL,
ADD COLUMN     "nivelTrabalho" TEXT NOT NULL,
ADD COLUMN     "pagamento" TEXT NOT NULL,
ADD COLUMN     "tipoContrato" TEXT NOT NULL,
ADD COLUMN     "tipoTrabalho" TEXT NOT NULL,
ADD COLUMN     "turno" TEXT NOT NULL;
