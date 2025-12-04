import { prisma } from './prisma';

// Wrapper para queries que pode lidar com reconexões automáticas
export const withRetry = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: any;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;
      
      // Códigos de erro que indicam problemas de conexão
      const isConnectionError = 
        error.code === 'P1001' || // Can't reach database server
        error.code === 'P1008' || // Operations timed out
        error.code === 'P1017' || // Server has closed the connection
        error.message?.includes('connection') ||
        error.message?.includes('Closed') ||
        error.message?.includes('timeout');
      
      if (isConnectionError && attempt < maxRetries) {
        console.log(`🔄 Tentativa ${attempt} falhou, tentando novamente em ${delay}ms...`);
        
        // Tentar reconectar
        try {
          await prisma.$connect();
        } catch (reconnectError) {
          console.log('⚠️ Falha na reconexão, continuando...');
        }
        
        // Aguardar antes da próxima tentativa
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      } else {
        throw error;
      }
    }
  }
  
  throw lastError;
};

// Helper para executar queries críticas com retry automático
export const safeQuery = {
  // Para operações de leitura
  findMany: async <T>(operation: () => Promise<T[]>) => 
    withRetry(operation),
  
  findFirst: async <T>(operation: () => Promise<T | null>) => 
    withRetry(operation),
  
  findUnique: async <T>(operation: () => Promise<T | null>) => 
    withRetry(operation),
  
  // Para operações de escrita (mais críticas)
  create: async <T>(operation: () => Promise<T>) => 
    withRetry(operation, 2, 500),
  
  update: async <T>(operation: () => Promise<T>) => 
    withRetry(operation, 2, 500),
  
  delete: async <T>(operation: () => Promise<T>) => 
    withRetry(operation, 2, 500),
};

// Função para verificar saúde da conexão
export const healthCheck = async (): Promise<boolean> => {
  try {
    await prisma.$executeRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error('❌ Health check failed:', error);
    return false;
  }
};