import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function testDatabase() {
  try {
    console.log("Testando conexão com o banco...");
    
    // Teste de conexão simples
    await prisma.$connect();
    console.log("✅ Conexão estabelecida!");
    
    // Listar todas as tabelas
    const result = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `;
    console.log("📋 Tabelas no banco:", result);
    
    // Verificar especificamente a tabela Administrador
    const adminTableInfo = await prisma.$queryRaw`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'Administrador' 
      AND table_schema = 'public'
      ORDER BY ordinal_position;
    `;
    console.log("🔍 Estrutura da tabela Administrador:", adminTableInfo);

  } catch (error) {
    console.error("❌ Erro ao testar banco:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();