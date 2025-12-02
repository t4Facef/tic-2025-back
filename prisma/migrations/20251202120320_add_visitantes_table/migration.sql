-- CreateTable
CREATE TABLE "Visitante" (
    "id" SERIAL NOT NULL,
    "ip" TEXT,
    "userAgent" TEXT,
    "origem" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Visitante_pkey" PRIMARY KEY ("id")
);
