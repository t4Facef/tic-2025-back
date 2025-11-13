import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function createDefaultAdmin() {
  const adminExists = await prisma.administrador.findUnique({
    where: { nome: 'admin@tic2025.com' }
  });
  
  if (!adminExists) {
    const hash = await bcrypt.hash('admin123', 10);
    const admin = await prisma.administrador.create({
      data: {
        nome: 'admin@tic2025.com',
        senha: hash
      }
    });
    console.log('✅ Admin padrão criado:', admin);
  } else {
    console.log('⚠️ Admin padrão já existe');
  }
  
  // Listar todos os admins
  const allAdmins = await prisma.administrador.findMany({
    select: { id: true, nome: true, createdAt: true }
  });
  
  console.log('\n📋 Todos os administradores:');
  allAdmins.forEach(admin => {
    console.log(`- ID: ${admin.id}, Email: ${admin.nome}, Criado: ${admin.createdAt}`);
  });
  
  await prisma.$disconnect();
}

createDefaultAdmin().catch(console.error);