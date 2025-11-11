-- CreateTable
CREATE TABLE "CandidatoBarreira" (
    "candidatoId" INTEGER NOT NULL,
    "barreiraId" INTEGER NOT NULL,

    CONSTRAINT "CandidatoBarreira_pkey" PRIMARY KEY ("candidatoId","barreiraId")
);

-- AddForeignKey
ALTER TABLE "CandidatoBarreira" ADD CONSTRAINT "CandidatoBarreira_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "Candidato"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidatoBarreira" ADD CONSTRAINT "CandidatoBarreira_barreiraId_fkey" FOREIGN KEY ("barreiraId") REFERENCES "Barreira"("id") ON DELETE CASCADE ON UPDATE CASCADE;
