-- AlterTable
ALTER TABLE "Notificacao" ADD COLUMN     "remetenteEmpresaId" INTEGER;

-- CreateTable
CREATE TABLE "Administrador" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Administrador_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Administrador_nome_key" ON "Administrador"("nome");

-- AddForeignKey
ALTER TABLE "Notificacao" ADD CONSTRAINT "Notificacao_remetenteEmpresaId_fkey" FOREIGN KEY ("remetenteEmpresaId") REFERENCES "Empresa"("id") ON DELETE SET NULL ON UPDATE CASCADE;
