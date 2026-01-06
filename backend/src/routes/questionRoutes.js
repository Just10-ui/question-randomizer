import { Router } from 'express';
import { addQuestion, deleteQuestion, editQuestion, shuffleQuestion, viewQuestion } from '../controller/questionController.js';

const questionRoutes = Router();

questionRoutes.get('/:testId', viewQuestion);
questionRoutes.get('/:testId/shuffle', shuffleQuestion);
questionRoutes.post('/add/:testId', addQuestion);
questionRoutes.put('/:questionId', editQuestion);
questionRoutes.delete('/delete/:questionId', deleteQuestion);

export default questionRoutes;