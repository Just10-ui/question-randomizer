import { Router } from 'express';
import testRoutes from './testRoutes.js';

const router = Router();

router.use('/test', testRoutes);

export default router;