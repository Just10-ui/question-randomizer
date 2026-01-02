import { Router } from 'express';
import testRoutes from './testRoutes.js';
import questionRoutes from '../routes/questionRoutes.js';

const router = Router();

router.use('/test', testRoutes);
router.use('/questions', questionRoutes);

export default router;