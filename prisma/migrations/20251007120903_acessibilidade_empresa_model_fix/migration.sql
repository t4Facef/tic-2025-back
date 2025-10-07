/*
  Warnings:

  - You are about to drop the column `empresaId` on the `Acessibilidade` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Acessibilidade" DROP CONSTRAINT "Acessibilidade_empresaId_fkey";

-- AlterTable
ALTER TABLE "Acessibilidade" DROP COLUMN "empresaId";
