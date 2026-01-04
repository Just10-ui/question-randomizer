import { Router } from 'express';
import { crossOrig, parseJson } from '../middleware/middleware.js';
import { addTest, deleteTest, editTest, viewTest } from '../controller/testController.js';

const testRouter = Router();

testRouter.get('/', parseJson, crossOrig, viewTest);
testRouter.post('/add', parseJson, crossOrig, addTest);
testRouter.put('/:testId', parseJson, crossOrig, editTest);
testRouter.delete('/:testId', parseJson, crossOrig, deleteTest);

export default testRouter;