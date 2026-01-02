import { Router } from 'express';
import { parseJson } from '../middleware/middleware.js';
import { addTest, deleteTest, editTest, viewTest } from '../controller/testController.js';

const testRouter = Router();

testRouter.get('/', parseJson, viewTest);
testRouter.post('/add', parseJson, addTest);
testRouter.put('/:testId', parseJson, editTest);
testRouter.delete('/:testId', parseJson, deleteTest);

export default testRouter;