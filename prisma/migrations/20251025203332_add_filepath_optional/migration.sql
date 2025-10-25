-- AlterTable
ALTER TABLE "Arquivo" ADD COLUMN     "filePath" TEXT,
ALTER COLUMN "data" DROP NOT NULL;
