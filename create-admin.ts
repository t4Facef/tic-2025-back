import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function createDefaultAdmin() {
  const adminExists = await prisma.administrador.findUnique({
    where: { email: 'admin@tic2025.com' }
  });
  
  if (!adminExists) {
    const hash = await bcrypt.hash('admin123', 10);
    const admin = await prisma.administrador.create({
      data: {
        email: 'admin@tic2025.com',
        senha: hash
      }
    });
    console.log('✅ Admin padrão criado:', admin);
  } else {
    console.log('⚠️ Admin padrão já existe');
  }
  
  // Criar admin adicional para Luciano se não existir
  const adminLucianoExists = await prisma.administrador.findUnique({
    where: { email: 'lmazaraojr@gmail.com' }
  });
  
  if (!adminLucianoExists) {
    const hashLuciano = await bcrypt.hash('1', 10);
    const adminLuciano = await prisma.administrador.create({
      data: {
        email: 'lmazaraojr@gmail.com',
        senha: hashLuciano
      }
    });
    console.log('✅ Admin Luciano criado:', adminLuciano);
  } else {
    console.log('⚠️ Admin Luciano já existe');
  }
  
  // Listar todos os admins
  const allAdmins = await prisma.administrador.findMany({
    select: { id: true, email: true, createdAt: true }
  });
  
  console.log('\n📋 Todos os administradores:');
  allAdmins.forEach(admin => {
    console.log(`- ID: ${admin.id}, Email: ${admin.nome}, Criado: ${admin.createdAt}`);
  });
  
  await prisma.$disconnect();
}

createDefaultAdmin().catch(console.error);