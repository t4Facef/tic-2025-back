import { Router } from 'express';
import { registrarVisitante, obterEstatisticasVisitantes } from '../controllers/visitantes.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// Rota pública para registrar visitante (sem auth)
router.post('/registrar', registrarVisitante);

// Rota protegida para admin ver estatísticas
router.get('/estatisticas', authenticateToken, obterEstatisticasVisitantes);

export default router;