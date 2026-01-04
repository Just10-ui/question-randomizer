import { Router } from 'express';
import { crossOrig, parseJson } from '../middleware/middleware.js';
import { addQuestion, deleteQuestion, editQuestion, viewQuestion } from '../controller/questionController.js';

const questionRoutes = Router();

questionRoutes.get('/', parseJson, crossOrig, viewQuestion);
questionRoutes.post('/add', parseJson, crossOrig, addQuestion);
questionRoutes.put('/:questionId', parseJson, crossOrig, editQuestion);
questionRoutes.delete('/:questionId', parseJson, crossOrig, deleteQuestion);

export default questionRoutes;