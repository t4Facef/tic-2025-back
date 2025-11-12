import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const vagasSemSetor = await prisma.vagas.findMany({
    where: { setor: null },
    select: { id: true, empresaId: true }
  });

  console.log(`Encontradas ${vagasSemSetor.length} vagas sem setor.`);

  for (const vaga of vagasSemSetor) {
    const empresa = await prisma.empresa.findUnique({ where: { id: vaga.empresaId } });
    const setor = empresa?.area || null;
    await prisma.vagas.update({ where: { id: vaga.id }, data: { setor } });
    console.log(`Vaga ${vaga.id} atualizada com setor='${setor}'`);
  }

  console.log('Correção de setor finalizada.');
}

main()
  .catch((e) => {
    console.error('Erro ao executar fixSetor:', e instanceof Error ? e.message : e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
