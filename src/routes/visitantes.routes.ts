import { Router } from 'express';
import { VisitantesController } from '../controllers/visitantes.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// Rota pública para registrar visitante (sem auth)
router.post('/registrar', VisitantesController.registrarVisitante);

// Rota protegida para admin ver estatísticas
router.get('/estatisticas', authenticateToken, VisitantesController.obterEstatisticasVisitantes);

export default router;