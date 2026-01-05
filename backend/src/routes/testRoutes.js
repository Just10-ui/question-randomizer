import { Router } from 'express';
import { viewTest, addTest } from '../controller/testController.js';

const testRoutes = Router();

testRoutes.get('/', viewTest);
testRoutes.post('/add', addTest);

export default testRoutes;