-- CreateTable
CREATE TABLE "Endereco" (
    "id" SERIAL NOT NULL,
    "cep" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT,

    CONSTRAINT "Endereco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Empresa" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "razaoSocial" TEXT NOT NULL,
    "nomeFantasia" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cnpj" TEXT,
    "telefoneComercial" TEXT NOT NULL,
    "site" TEXT,
    "descricao" TEXT,
    "historia" TEXT,
    "missao" TEXT,
    "valores" TEXT,
    "certificacoes" TEXT[],
    "enderecoId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Candidato" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cpf" TEXT,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "sexo" TEXT,
    "genero" TEXT,
    "telefones" TEXT[],
    "enderecoId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Candidato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoDeficiencia" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TipoDeficiencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubtipoDeficiencia" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "tipoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubtipoDeficiencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidatoSubtipo" (
    "candidatoId" INTEGER NOT NULL,
    "subtipoId" INTEGER NOT NULL,

    CONSTRAINT "CandidatoSubtipo_pkey" PRIMARY KEY ("candidatoId","subtipoId")
);

-- CreateTable
CREATE TABLE "Barreira" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Barreira_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubtipoBarreira" (
    "subtipoId" INTEGER NOT NULL,
    "barreiraId" INTEGER NOT NULL,

    CONSTRAINT "SubtipoBarreira_pkey" PRIMARY KEY ("subtipoId","barreiraId")
);

-- CreateTable
CREATE TABLE "Acessibilidade" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Acessibilidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BarreiraAcessibilidade" (
    "barreiraId" INTEGER NOT NULL,
    "acessibilidadeId" INTEGER NOT NULL,

    CONSTRAINT "BarreiraAcessibilidade_pkey" PRIMARY KEY ("barreiraId","acessibilidadeId")
);

-- CreateTable
CREATE TABLE "JobPosition" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "requisitos" TEXT[],
    "salario" DOUBLE PRECISION,
    "modalidade" TEXT,
    "cargaHoraria" TEXT,
    "empresaId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobPosition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "candidatoId" INTEGER NOT NULL,
    "vagaId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDENTE',
    "dataCandidatura" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormacaoOuCurso" (
    "id" SERIAL NOT NULL,
    "candidatoId" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "instituicao" TEXT NOT NULL,
    "nivel" TEXT NOT NULL,
    "dataInicio" TIMESTAMP(3),
    "dataFim" TIMESTAMP(3),
    "descricao" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FormacaoOuCurso_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_email_key" ON "Empresa"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_cnpj_key" ON "Empresa"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_enderecoId_key" ON "Empresa"("enderecoId");

-- CreateIndex
CREATE UNIQUE INDEX "Candidato_email_key" ON "Candidato"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Candidato_cpf_key" ON "Candidato"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Candidato_enderecoId_key" ON "Candidato"("enderecoId");

-- CreateIndex
CREATE UNIQUE INDEX "TipoDeficiencia_nome_key" ON "TipoDeficiencia"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "SubtipoDeficiencia_tipoId_nome_key" ON "SubtipoDeficiencia"("tipoId", "nome");

-- CreateIndex
CREATE UNIQUE INDEX "Barreira_descricao_key" ON "Barreira"("descricao");

-- CreateIndex
CREATE INDEX "SubtipoBarreira_barreiraId_idx" ON "SubtipoBarreira"("barreiraId");

-- CreateIndex
CREATE UNIQUE INDEX "Acessibilidade_descricao_key" ON "Acessibilidade"("descricao");

-- CreateIndex
CREATE INDEX "BarreiraAcessibilidade_acessibilidadeId_idx" ON "BarreiraAcessibilidade"("acessibilidadeId");

-- CreateIndex
CREATE UNIQUE INDEX "Application_candidatoId_vagaId_key" ON "Application"("candidatoId", "vagaId");

-- AddForeignKey
ALTER TABLE "Empresa" ADD CONSTRAINT "Empresa_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "Endereco"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidato" ADD CONSTRAINT "Candidato_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "Endereco"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubtipoDeficiencia" ADD CONSTRAINT "SubtipoDeficiencia_tipoId_fkey" FOREIGN KEY ("tipoId") REFERENCES "TipoDeficiencia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidatoSubtipo" ADD CONSTRAINT "CandidatoSubtipo_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "Candidato"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidatoSubtipo" ADD CONSTRAINT "CandidatoSubtipo_subtipoId_fkey" FOREIGN KEY ("subtipoId") REFERENCES "SubtipoDeficiencia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubtipoBarreira" ADD CONSTRAINT "SubtipoBarreira_subtipoId_fkey" FOREIGN KEY ("subtipoId") REFERENCES "SubtipoDeficiencia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubtipoBarreira" ADD CONSTRAINT "SubtipoBarreira_barreiraId_fkey" FOREIGN KEY ("barreiraId") REFERENCES "Barreira"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BarreiraAcessibilidade" ADD CONSTRAINT "BarreiraAcessibilidade_barreiraId_fkey" FOREIGN KEY ("barreiraId") REFERENCES "Barreira"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BarreiraAcessibilidade" ADD CONSTRAINT "BarreiraAcessibilidade_acessibilidadeId_fkey" FOREIGN KEY ("acessibilidadeId") REFERENCES "Acessibilidade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobPosition" ADD CONSTRAINT "JobPosition_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "Candidato"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_vagaId_fkey" FOREIGN KEY ("vagaId") REFERENCES "JobPosition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormacaoOuCurso" ADD CONSTRAINT "FormacaoOuCurso_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "Candidato"("id") ON DELETE CASCADE ON UPDATE CASCADE;
