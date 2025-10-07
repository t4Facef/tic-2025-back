-- CreateTable
CREATE TABLE "EmpresaAcessibilidade" (
    "empresaId" INTEGER NOT NULL,
    "acessibilidadeId" INTEGER NOT NULL,

    CONSTRAINT "EmpresaAcessibilidade_pkey" PRIMARY KEY ("empresaId","acessibilidadeId")
);

-- CreateIndex
CREATE INDEX "EmpresaAcessibilidade_empresaId_idx" ON "EmpresaAcessibilidade"("empresaId");

-- AddForeignKey
ALTER TABLE "EmpresaAcessibilidade" ADD CONSTRAINT "EmpresaAcessibilidade_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmpresaAcessibilidade" ADD CONSTRAINT "EmpresaAcessibilidade_acessibilidadeId_fkey" FOREIGN KEY ("acessibilidadeId") REFERENCES "Acessibilidade"("id") ON DELETE CASCADE ON UPDATE CASCADE;
