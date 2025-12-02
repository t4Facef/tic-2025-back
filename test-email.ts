import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testEmailCheck() {
  const emails = ['admin@tic2025.com', 'lmazaraojr@gmail.com', 'inexistente@teste.com'];
  
  for (const email of emails) {
    try {
      console.log(`\n🧪 Testando email: ${email}`);
      
      // Teste direto da lógica
      const admin = await prisma.administrador.findUnique({ where: { email: email } });
      console.log('- Admin encontrado:', admin ? `ID: ${admin.id}` : 'Não');
      
      const candidato = await prisma.candidato.findUnique({ where: { email } });
      console.log('- Candidato encontrado:', candidato ? `ID: ${candidato.id}` : 'Não');
      
      const empresa = await prisma.empresa.findUnique({ where: { email } });
      console.log('- Empresa encontrada:', empresa ? `ID: ${empresa.id}` : 'Não');
      
      const exists = !!(admin || candidato || empresa);
      console.log('✅ Resultado final:', exists);
      
    } catch (error) {
      console.error('❌ Erro ao testar email:', error);
    }
  }
  
  await prisma.$disconnect();
}

testEmailCheck().catch(console.error);