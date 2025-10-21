-- CreateEnum
CREATE TYPE "TipoArquivo" AS ENUM ('LAUDO', 'CURRICULO', 'FOTO');

-- AlterTable
ALTER TABLE "Vagas" ADD COLUMN     "setor" TEXT;

-- CreateTable
CREATE TABLE "Arquivo" (
    "id" SERIAL NOT NULL,
    "tipo" "TipoArquivo" NOT NULL,
    "filename" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "data" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "candidatoId" INTEGER,
    "empresaId" INTEGER,

    CONSTRAINT "Arquivo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Arquivo" ADD CONSTRAINT "Arquivo_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "Candidato"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Arquivo" ADD CONSTRAINT "Arquivo_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE SET NULL ON UPDATE CASCADE;
