import { PrismaClient } from '@prisma/client';

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  globalThis.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

// Connection health check
let isConnected = false;
const checkConnection = async () => {
  if (!isConnected) {
    try {
      await prisma.$connect();
      isConnected = true;
      console.log('📊 Database connected successfully');
    } catch (error) {
      console.error('❌ Database connection failed:', error);
      isConnected = false;
    }
  }
};

// Inicializar conexão
checkConnection();

// Graceful shutdown
process.on('beforeExit', async () => {
  if (isConnected) {
    await prisma.$disconnect();
    isConnected = false;
    console.log('📊 Database disconnected');
  }
});

process.on('SIGINT', async () => {
  if (isConnected) {
    await prisma.$disconnect();
    isConnected = false;
    console.log('📊 Database disconnected');
  }
  process.exit(0);
});

process.on('SIGTERM', async () => {
  if (isConnected) {
    await prisma.$disconnect();
    isConnected = false;
    console.log('📊 Database disconnected');
  }
  process.exit(0);
});