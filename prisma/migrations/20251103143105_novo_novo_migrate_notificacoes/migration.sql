-- AlterTable
ALTER TABLE "Notificacao" ADD COLUMN     "remetenteEmpresaId" INTEGER;

-- AddForeignKey
ALTER TABLE "Notificacao" ADD CONSTRAINT "Notificacao_remetenteEmpresaId_fkey" FOREIGN KEY ("remetenteEmpresaId") REFERENCES "Empresa"("id") ON DELETE SET NULL ON UPDATE CASCADE;
