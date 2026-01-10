import { Router } from 'express';
import { viewTest, addTest, editTest, deleteTest, getTest } from '../controller/testController.js';

const testRoutes = Router();

testRoutes.get('/', viewTest);
testRoutes.get('/:testId', getTest);
testRoutes.post('/add', addTest);
testRoutes.put('/:testId', editTest);
testRoutes.delete('/:testId', deleteTest);

export default testRoutes;