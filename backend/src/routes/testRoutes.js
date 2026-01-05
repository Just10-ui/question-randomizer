import { Router } from 'express';
import { viewTest, addTest, editTest, deleteTest } from '../controller/testController.js';

const testRoutes = Router();

testRoutes.get('/', viewTest);
testRoutes.post('/add', addTest);
testRoutes.put('/:testId', editTest);
testRoutes.delete('/:testId', deleteTest);

export default testRoutes;