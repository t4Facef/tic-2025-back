/*
  Warnings:

  - You are about to drop the column `nome` on the `Administrador` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Administrador` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Administrador` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Administrador_nome_key";

-- AlterTable
ALTER TABLE "Administrador" DROP COLUMN "nome",
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Administrador_email_key" ON "Administrador"("email");
