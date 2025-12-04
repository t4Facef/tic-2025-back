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

// Middleware para reconectar automaticamente em caso de conexão fechada
prisma.$use(async (params, next) => {
  try {
    return await next(params);
  } catch (error: any) {
    if (error.code === 'P1001' || error.message?.includes('connection') || error.message?.includes('Closed')) {
      console.log('🔄 Tentando reconectar ao banco...');
      try {
        await prisma.$connect();
        return await next(params);
      } catch (reconnectError) {
        console.error('❌ Falha na reconexão:', reconnectError);
        throw error;
      }
    }
    throw error;
  }
});

// Connection health check com retry
let isConnected = false;
let connectionRetries = 0;
const MAX_CONNECTION_RETRIES = 3;

const checkConnection = async (): Promise<void> => {
  if (connectionRetries >= MAX_CONNECTION_RETRIES) {
    console.log('⚠️ Máximo de tentativas de conexão atingido');
    return;
  }

  try {
    if (!isConnected) {
      await prisma.$connect();
      // Teste simples de query para verificar se realmente está conectado
      await prisma.$executeRaw`SELECT 1`;
      isConnected = true;
      connectionRetries = 0;
      console.log('📊 Database connected successfully');
    }
  } catch (error: any) {
    isConnected = false;
    connectionRetries++;
    console.error(`❌ Database connection failed (tentativa ${connectionRetries}):`, error.message);
    
    // Retry após delay exponencial
    if (connectionRetries < MAX_CONNECTION_RETRIES) {
      const delay = Math.min(1000 * Math.pow(2, connectionRetries - 1), 5000);
      setTimeout(() => checkConnection(), delay);
    }
  }
};

// Inicializar conexão
checkConnection();

// Verificação periódica de saúde da conexão (a cada 30 segundos)
setInterval(async () => {
  if (isConnected) {
    try {
      await prisma.$executeRaw`SELECT 1`;
    } catch (error) {
      console.log('🔄 Conexão perdida, tentando reconectar...');
      isConnected = false;
      checkConnection();
    }
  }
}, 30000);

// Graceful shutdown
const disconnect = async () => {
  if (isConnected) {
    try {
      await prisma.$disconnect();
      isConnected = false;
      console.log('📊 Database disconnected');
    } catch (error) {
      console.error('❌ Erro ao desconectar:', error);
    }
  }
};

process.on('beforeExit', disconnect);
process.on('SIGINT', async () => {
  await disconnect();
  process.exit(0);
});
process.on('SIGTERM', async () => {
  await disconnect();
  process.exit(0);
});