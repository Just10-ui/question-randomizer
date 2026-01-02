import { Router } from 'express';
import { parseJson } from '../middleware/middleware.js';
import { addQuestion, deleteQuestion, editQuestion, viewQuestion } from '../controller/questionController.js';

const questionRoutes = Router();

questionRoutes.get('/', parseJson, viewQuestion);
questionRoutes.post('/add', parseJson, addQuestion);
questionRoutes.put('/:questionId', parseJson, editQuestion);
questionRoutes.delete('/:questionId', parseJson, deleteQuestion);

export default questionRoutes;