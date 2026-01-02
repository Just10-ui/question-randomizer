import { Router } from 'express';
import { parseJson } from '../middleware/middleware.js';
import { addTest, viewTest } from '../controller/testController.js';

const testRouter = Router();

testRouter.get('/', parseJson, viewTest);
testRouter.post('/add', parseJson, addTest);

export default testRouter;