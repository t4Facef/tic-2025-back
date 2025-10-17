/*
  Warnings:

  - You are about to drop the `Habilidades` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Habilidades" DROP CONSTRAINT "Habilidades_candidatoId_fkey";

-- AlterTable
ALTER TABLE "Candidato" ADD COLUMN     "habilidades" TEXT[];

-- DropTable
DROP TABLE "Habilidades";
